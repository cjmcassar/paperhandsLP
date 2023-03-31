import { google } from "googleapis";

export default async function handler(req, res) {
	const auth = await getGoogleAuth();
	const data = await fetchData(auth, process.env.SHEET_ID, "Storage!A2:D");
	res.status(200).json({ data });
}

async function getGoogleAuth() {
	const auth = await google.auth.getClient({
		scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
	});
	return auth;
}

async function fetchData(auth, sheetId, range) {
	const sheets = google.sheets({ version: "v4", auth });
	const response = await sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range,
	});
	const data = response.data.values.map((row) => {
		const [Storage_Method, Storage_Type, Rating] = row;
		return {
			Storage_Method,
			Storage_Type,
			Rating,
		};
	});

	return data;
}
