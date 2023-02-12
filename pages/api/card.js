export default async (req, res) => {
    const q = req.query.q;

    const wikipediaResult = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`)
    .then((response) => response.json())

    const isWikipedia = wikipediaResult && wikipediaResult.title !== 'Not found.';

    if(isWikipedia) {
        res.status(200).json({
            image : wikipediaResult?.thumbnail?.source || null,
            title: wikipediaResult.title,
            description: wikipediaResult.description,
            content: wikipediaResult.extract_html,
            type: "wiki"
        });

        return;
    }

    res.status(404).json({
        message: "Not found!"
    })

}