import { google } from "googleapis";
import { Redis } from "@upstash/redis";
import base64url from "base64url";

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
    const data = await fetchData(auth, process.env.SHEET_ID, "Assets!A2:H");
    console.log("handler");

    // Cache the data in Redis
    await client.set("asset_cache", JSON.stringify(data), { ex: 300 });

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function getGoogleAuth() {
  const credentialsJson = base64url.decode(
    process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64
  );
  const credentials = JSON.parse(credentialsJson);

  const auth = await google.auth.getClient({
    credentials,
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
      Asset_Recommendation,
      Asset_ID
    ] = row;
    return {
      Mcap,
      Asset,
      Symbol,
      Price,
      Rating,
      Asset_Review,
      Asset_Recommendation,
      Asset_ID
    };
  });

  return data;
}
