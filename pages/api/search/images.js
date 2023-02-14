export default async (req, res) => {
  const q = req.query.q;
  const page = Number(req.query.page) || 1;

  const start = (page - 1) * 10 + 1;

  console.log(`Calling Images API: q=${q}, , start=${page} start=${start}`);

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}&searchType=image`);

  const responseJson = await response.json();
  const responseItems = responseJson.items;

  const items = responseItems.map(item => {
    return {
      thumbnail: item.image?.thumbnailLink || item.link,
      link: item.link,
      snippet: item.snippet,
      htmlSnippet: item.htmlSnippet,
      htmlTitle: item.htmlTitle,
      title: item.title
    }
  })

    res.status(200).json(items)
}
