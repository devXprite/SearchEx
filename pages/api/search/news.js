export default async (req, res) => {
    const q = req.query.q;
    const page = Number(req.query.page) || 1;

    console.log(`Calling News API: q=${q}, start=${page}`);

    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&apiKey=${process.env.NEWS_API_KEY}&page=${page}`);

    const repsonseJson = await response.json();

    const articles = repsonseJson.articles.map((item,i ) => {
        return {
            title: item.title,
            description: item.description,
            thumbnail: item.urlToImage,
            publishedBy: item.source.name,
            publishedAt: item.publishedAt,
            url: item.url,
        };
    });

    res.status(200).json(articles);
}