export default async (req, res) => {
    const q = req.query.q;

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


    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer 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");

    // var raw = JSON.stringify({
    //     "model": "text-davinci-003",
    //     "prompt": "Write a Intresting fact for this query:\n Rahul gandhi \n\n",
    //     "temperature": 0.7,
    //     "max_tokens": 256,
    //     "top_p": 1,
    //     "frequency_penalty": 0,
    //     "presence_penalty": 0
    //   });
      
    //   var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //   };

    const openAIResult = await fetch("https://api.openai.com/v1/completions", { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": `Write a answer for this query:\n ${q} \n\n`,
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

        console.log(openAIResult);

    if (openAIResult) {
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

}