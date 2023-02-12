export default async (req, res) => {
  const q = req.query.q;
  const page = req.query.page;

  const start = (page - 1) * 10 + 1;

  const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CX}&q=${q}&start=${start}&searchType​=Image`);

  const responseJson = await response.json();
  const responseItems = responseJson.items;

  // const responseItems = [
  //   {
  //     "kind": "customsearch#result",
  //     "title": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlTitle": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "link": "https://infoooze.js.org/images/logo-main.png",
  //     "displayLink": "infoooze.js.org",
  //     "snippet": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlSnippet": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "mime": "image/png",
  //     "fileFormat": "image/png",
  //     "image": {
  //       "contextLink": "http://infoooze.js.org/",
  //       "height": 179,
  //       "width": 384,
  //       "byteSize": 14222,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmeELd8ZJv4wPe4u8curYDE_wvAUIzQXjnMP3stHREvlfwfLbWlLBjkg&s",
  //       "thumbnailHeight": 57,
  //       "thumbnailWidth": 123
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "How to install Infoooze tool in termux - YouTube",
  //     "htmlTitle": "How to install <b>Infoooze</b> tool in termux - YouTube",
  //     "link": "https://i.ytimg.com/vi/87sKnpXa2iI/maxresdefault.jpg",
  //     "displayLink": "www.youtube.com",
  //     "snippet": "How to install Infoooze tool in termux - YouTube",
  //     "htmlSnippet": "How to install <b>Infoooze</b> tool in termux - YouTube",
  //     "mime": "image/jpeg",
  //     "fileFormat": "image/jpeg",
  //     "image": {
  //       "contextLink": "https://www.youtube.com/watch?v=87sKnpXa2iI",
  //       "height": 720,
  //       "width": 1280,
  //       "byteSize": 111353,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyJDVKfjOTT9fiz2_6wvlkH6Od7OdWkyodJK5snwzV0hTIkyHouVH1mE&s",
  //       "thumbnailHeight": 84,
  //       "thumbnailWidth": 150
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlTitle": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "link": "https://infoooze.js.org/images/screenshot5.png",
  //     "displayLink": "infoooze.js.org",
  //     "snippet": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlSnippet": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "mime": "image/png",
  //     "fileFormat": "image/png",
  //     "image": {
  //       "contextLink": "http://infoooze.js.org/",
  //       "height": 680,
  //       "width": 665,
  //       "byteSize": 54491,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeZgIrn6yueEiqTBMN6x16qs_iZvxpX5QQkkTOay933jSMDLxcuFexF4q9&s",
  //       "thumbnailHeight": 139,
  //       "thumbnailWidth": 136
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "infoooze · GitHub Topics · GitHub",
  //     "htmlTitle": "<b>infoooze</b> · GitHub Topics · GitHub",
  //     "link": "https://repository-images.githubusercontent.com/463084097/50287415-d2bf-4ab8-86e9-1fd39a53af2b",
  //     "displayLink": "github.com",
  //     "snippet": "infoooze · GitHub Topics · GitHub",
  //     "htmlSnippet": "<b>infoooze</b> · GitHub Topics · GitHub",
  //     "mime": "image/",
  //     "fileFormat": "image/",
  //     "image": {
  //       "contextLink": "https://github.com/topics/infoooze",
  //       "height": 433,
  //       "width": 643,
  //       "byteSize": 88290,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfaJzjjqRDR1cOgyG1KSuvyB3PYPHwhWKY1ee04x5Cp5iDWrqFb01exHA&s",
  //       "thumbnailHeight": 92,
  //       "thumbnailWidth": 137
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlTitle": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "link": "https://infoooze.js.org/images/screenshot1.png",
  //     "displayLink": "infoooze.js.org",
  //     "snippet": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlSnippet": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "mime": "image/png",
  //     "fileFormat": "image/png",
  //     "image": {
  //       "contextLink": "http://infoooze.js.org/",
  //       "height": 584,
  //       "width": 737,
  //       "byteSize": 41279,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5MmxKskr4p04kWgET_CiI4OX3LYchh-yISJPYWuIjs-ITwDm2idqOQQ&s",
  //       "thumbnailHeight": 112,
  //       "thumbnailWidth": 141
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlTitle": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "link": "https://reporoster.com/stars/dark/devXprite/infoooze",
  //     "displayLink": "infoooze.js.org",
  //     "snippet": "Infoooze | Infoooze is an Information collection tool (OSINT) in ...",
  //     "htmlSnippet": "<b>Infoooze</b> | <b>Infoooze</b> is an Information collection tool (OSINT) in ...",
  //     "mime": "image/",
  //     "fileFormat": "image/",
  //     "image": {
  //       "contextLink": "http://infoooze.js.org/",
  //       "height": 131,
  //       "width": 634,
  //       "byteSize": 299296,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShztvumMgX8_sTJLOiZsXAY0YedkUaSniCebHZgWN7LodD7RhbLaCKKg&s",
  //       "thumbnailHeight": 28,
  //       "thumbnailWidth": 137
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "GitHub - devXprite/infoooze: A OSINT tool which helps you to ...",
  //     "htmlTitle": "GitHub - devXprite/<b>infoooze</b>: A OSINT tool which helps you to ...",
  //     "link": "https://camo.githubusercontent.com/7a1f08585753d9dc8e950eead9da4f05b011885753bd73f1078c6c882b49e658/68747470733a2f2f7265706f726f737465722e636f6d2f666f726b732f6461726b2f6465765870726974652f696e666f6f6f7a65",
  //     "displayLink": "github.com",
  //     "snippet": "GitHub - devXprite/infoooze: A OSINT tool which helps you to ...",
  //     "htmlSnippet": "GitHub - devXprite/<b>infoooze</b>: A OSINT tool which helps you to ...",
  //     "mime": "image/",
  //     "fileFormat": "image/",
  //     "image": {
  //       "contextLink": "https://github.com/devXprite/infoooze",
  //       "height": 131,
  //       "width": 807,
  //       "byteSize": 888874,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbD0IWXIXZq9aWvWSYSff3QVXznbXS05kfgEyVjWEZCPBINtHnWk3Yw&s",
  //       "thumbnailHeight": 23,
  //       "thumbnailWidth": 143
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "How to install Infoooze tool in TERMUX? // open source ...",
  //     "htmlTitle": "How to install <b>Infoooze</b> tool in TERMUX? // open source ...",
  //     "link": "https://i.ytimg.com/vi/mltVsK1ZNFU/maxresdefault.jpg",
  //     "displayLink": "www.youtube.com",
  //     "snippet": "How to install Infoooze tool in TERMUX? // open source ...",
  //     "htmlSnippet": "How to install <b>Infoooze</b> tool in TERMUX? // open source ...",
  //     "mime": "image/jpeg",
  //     "fileFormat": "image/jpeg",
  //     "image": {
  //       "contextLink": "https://www.youtube.com/watch?v=mltVsK1ZNFU",
  //       "height": 720,
  //       "width": 1280,
  //       "byteSize": 107300,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqJEGNyYrS1ZQCPoA0sUJ5NacADzO554qzrjuDjLgCpssxLKY850G8_I&s",
  //       "thumbnailHeight": 84,
  //       "thumbnailWidth": 150
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "How to Install Infooze Tool in Termux - THATSHACKER",
  //     "htmlTitle": "How to Install Infooze Tool in Termux - THATSHACKER",
  //     "link": "https://i0.wp.com/blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhqCMcw4SHAO91_FmXMhlIW4BwtAgjuX9lXifk8ysOWSLR1Qxlfwx9MlR1LawtLnuOLQjA-JKI9WkrNKR8JesdUNCnZs0avzDdJluEjIhUzNyRI3WWZmLXcDzImbx1KKB2oQ9y0ykSfJ2RHWZPUNq71nTrH_jL0P5zEtaRHfyHbkOK2PZXdZyMhxLYz/s2896/PicsArt_03-29-12.55.39.jpg?ssl=1",
  //     "displayLink": "thatshacker.com",
  //     "snippet": "How to Install Infooze Tool in Termux - THATSHACKER",
  //     "htmlSnippet": "How to Install Infooze Tool in Termux - THATSHACKER",
  //     "mime": "image/jpeg",
  //     "fileFormat": "image/jpeg",
  //     "image": {
  //       "contextLink": "https://thatshacker.com/how-to-install-infooze-tool-in-termux/",
  //       "height": 1629,
  //       "width": 2896,
  //       "byteSize": 480806,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysZ13FZupGWvvRVRRNFNucI7Ktlyykwypg-oSaDrvkm6PEiSV9cwhRw&s",
  //       "thumbnailHeight": 84,
  //       "thumbnailWidth": 150
  //     }
  //   },
  //   {
  //     "kind": "customsearch#result",
  //     "title": "Infoooze - IEMLabs Blog",
  //     "htmlTitle": "<b>Infoooze</b> - IEMLabs Blog",
  //     "link": "https://iemlabs.com/blogs/wp-content/uploads/sites/4/2022/03/Infoooze.png",
  //     "displayLink": "iemlabs.com",
  //     "snippet": "Infoooze - IEMLabs Blog",
  //     "htmlSnippet": "<b>Infoooze</b> - IEMLabs Blog",
  //     "mime": "image/png",
  //     "fileFormat": "image/png",
  //     "image": {
  //       "contextLink": "https://iemlabs.com/blogs/infoooze/",
  //       "height": 675,
  //       "width": 1200,
  //       "byteSize": 52888,
  //       "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBCOs5zhSGtLn3NFdNMXyAaQDxNeenlV3ZtoEEbWMAjaeGCY14ClMmMA&s",
  //       "thumbnailHeight": 84,
  //       "thumbnailWidth": 150
  //     }
  //   }
  // ]

  const items = responseItems.map(item => {
    return {
      thumbnail: item.image.thumbnailLink,
      link: item.link,
      snippet: item.snippet,
      htmlSnippet: item.htmlSnippet,
      htmlTitle: item.htmlTitle,
      title: item.title
    }
  })

  setTimeout(() => {
    res.status(200).json(items)
  }, 30000);
}
