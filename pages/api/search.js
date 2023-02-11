export default async (req, res) => {
    const q = req.query.q;
    const page = Number(req.query.page)

    const start = (page - 1) * 10 + 1;

    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}`);

    const responseJson = await response.json();
    const responseItems = responseJson.items;
    
    const items = responseItems.map((item) => ({
        title: item.title,
        htmlTitle: item.htmlTitle,
        link: item.link,
        displayLink: item.displayLink,
        formattedUrl: item.formattedUrl,
        htmlFormattedUrl: item.htmlFormattedUrl,
        snippet: item.snippet,
        htmlSnippet: item.htmlSnippet,
        favicon: item.pagemap?.cse_image?.[0]?.src
    }));

    res.status(200).json(items);
}