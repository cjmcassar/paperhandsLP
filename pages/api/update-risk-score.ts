import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import firebaseAdmin from "../../utils/firebaseAdmin";

interface Asset {
  Asset: string;
  Rating: string;
  // Add other properties as needed
}

interface UpdateRiskScoreRequestBody {
  asset: string;
  newRiskScore: string;
}

const client = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_TOKEN
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { asset, newRiskScore }: UpdateRiskScoreRequestBody = req.body;

      // Fetch the current asset data from Redis
      let cache = await client.get("cache");
      if (!cache) {
        res.status(404).json({ message: "No data found in cache" });
        return;
      }

      const assets: Asset[] = JSON.parse(cache as string);

      // Find the asset and update its risk score
      const updatedAssets = assets.map(item => {
        if (item.Asset === asset) {
          return { ...item, Rating: newRiskScore };
        }
        return item;
      });

      // Update the cache in Redis
      await client.set("cache", JSON.stringify(updatedAssets), { ex: 300 });

      // Find users who own the asset
      const userAssetsSnapshot = await firebaseAdmin
        .firestore()
        .collection("user_assets")
        .where("asset", "==", asset)
        .get();

      // Create a new notification for each user
      const notificationsBatch = firebaseAdmin.firestore().batch();
      const timestamp = new Date();

      userAssetsSnapshot.forEach(doc => {
        const notificationRef = firebaseAdmin
          .firestore()
          .collection("notifications")
          .doc();
        notificationsBatch.set(notificationRef, {
          userId: doc.data().userId,
          asset,
          newRiskScore,
          timestamp
        });
      });

      // Commit the batch
      await notificationsBatch.commit();

      res
        .status(200)
        .json({ message: "Risk score updated and notifications sent" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
