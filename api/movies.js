export default async function handler(req, res) {
  try {
    const { s, i } = req.query || {}; // get query params

    // Make sure at least one query param is present
    if ((!s || !s.trim()) && (!i || !i.trim())) {
      return res.status(400).json({ error: "Missing query parameter ?s= or ?i=" });
    }

    // Build the OMDB API URL
    let url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}`;
    if (s) url += `&s=${encodeURIComponent(s.trim())}`;
    if (i) url += `&i=${encodeURIComponent(i.trim())}`;

    // Fetch from OMDB
    const response = await fetch(url);
    const data = await response.json();

    // Return the data back to frontend
    return res.status(200).json(data);

  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
