import { google } from "googleapis";
import { Redis } from "@upstash/redis";

const client = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_TOKEN
});

export default async function handler(req, res) {
  try {
    // Check Redis for cached data
    let cache: string = await client.get("asset_cache");
    if (cache) {
      console.log("Using cached data from Redis");

      res.status(200).json({ cache });
      return;
    }

    const auth = await getGoogleAuth();
    const data = await fetchData(auth, process.env.SHEET_ID, "Assets!A2:G");
    console.log("handler");

    // Cache the data in Redis
    await client.set("asset_cache", JSON.stringify(data), { ex: 300 });

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getGoogleAuth() {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  });
  return auth;
}

async function fetchData(auth, sheetId, range) {
  console.log("Fetching data from Google Sheets");

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range
  });

  const data = response.data.values.map(row => {
    const [
      Mcap,
      Asset,
      Symbol,
      Price,
      Rating,
      Asset_Review,
      Asset_Recommendation
    ] = row;
    return {
      Mcap,
      Asset,
      Symbol,
      Price,
      Rating,
      Asset_Review,
      Asset_Recommendation
    };
  });

  return data;
}
