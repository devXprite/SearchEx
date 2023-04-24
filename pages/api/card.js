export default async (req, res) => {
    const q = req.query.q;

    console.log(`Calling Cards API: q=${q}`);

    try {

        const wikipediaResult = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${q}`)
            .then((response) => response.json())

        const isWikipedia = wikipediaResult && wikipediaResult?.description != "Topics referred to by the same term" && wikipediaResult.title !== 'Not found.';

        if (isWikipedia) {
            res.status(200).json({
                image: wikipediaResult?.thumbnail?.source || null,
                title: wikipediaResult.title,
                description: wikipediaResult.description,
                content: wikipediaResult.extract_html,
                type: "wiki"
            });

            return;
        }

        const openAIResult = await fetch("https://api.openai.com/v1/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": `Write a answer for this query if any answer not available then return na. Query:\n ${q}\n Answer: \n`,
                "temperature": 0.7,
                "max_tokens": 256,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
            }),
            redirect: 'follow'
        })
            .then((response) => response.json())
            .catch((error) => false);

        if (openAIResult?.choices?.length > 0) {

            if (openAIResult.choices[0].text.toLowerCase() === "na") {
                res.status(404).json({
                    message: "Not found!"
                })
                return;
            }

            res.status(200).json({
                image: null,
                title: q,
                content: openAIResult.choices[0].text.replace(/(?:\r\n|\r|\n)/g, '<br>'),
                description: null,
                type: "ai"
            });
            return;
        }

        res.status(404).json({
            message: "Not found!"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}