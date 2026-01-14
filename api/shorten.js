// api/shorten.js
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Vercel server talks to TinyURL (No CORS issues here!)
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) throw new Error('TinyURL API error');
    
    const shortUrl = await response.text();
    return res.status(200).json({ shortUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }
}
