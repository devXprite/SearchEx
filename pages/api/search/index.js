export default async (req, res) => {
    const q = req.query.q;
    const page = Number(req.query.page)

    const start = (page - 1) * 10 + 1;

  console.log(`Calling Search All API: q=${q}, start=${start}`);

    // setTimeout(async () => {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}`);

    const responseJson = await response.json();
    const responseItems = responseJson.items;
    
    const items = responseItems.map((item,i) => ({
        title: item.title,
        htmlTitle: item.htmlTitle,
        link: item.link,
        displayLink: item.displayLink,
        formattedUrl: item.formattedUrl,
        htmlFormattedUrl: item.htmlFormattedUrl,
        snippet: item.snippet,
        htmlSnippet: item.htmlSnippet,
        cse: (i == 0 && item.pagemap?.cse_thumbnail?.[0]?.src || null),
        favicon: `https://www.google.com/s2/favicons?domain=${item.link}&sz=${256}`
    }));


    
    res.status(200).json(items);
    // }, 3000);
}