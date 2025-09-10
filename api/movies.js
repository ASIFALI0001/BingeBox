export default async function handler(req, res) {
  try {
    const { s } = req.query || {}; // get query param
    if (!s || !s.trim()) {
      return res.status(400).json({ error: "Missing query parameter ?s=" });
    }

    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=${process.env.OMDB_KEY}`
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
