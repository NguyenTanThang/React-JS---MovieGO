export const imageData = [
    {
        tags: [
            "tom hanks",
            "forrest gump",
        ],
        imageURL: "https://www.gannett-cdn.com/presto/2019/07/02/USAT/cc5b2491-053a-408e-93a9-f28377918c65-XXX_FORREST-GUMP-MOV-jy-1933-.JPG?width=660&height=424&fit=crop&format=pjpg&auto=webp"
    },
    {
        tags: [
            "tom hanks",
            "forrest gump",
        ],
        imageURL: "https://static.hollywoodreporter.com/sites/default/files/2019/06/forrest_gump-photofest_still_2-h_2019-compressed.jpg"
    },
    {
        tags: [
            "benedict cumberbatch",
            "sherlock holmes",
        ],
        imageURL: "https://www.indiewire.com/wp-content/uploads/2012/05/sherlock1.jpg?w=680"
    },
    {
        tags: [
            "benedict cumberbatch",
            "sherlock holmes",
        ],
        imageURL: "https://images-na.ssl-images-amazon.com/images/I/61c6JwTvZtL._AC_SX425_.jpg"
    },
    {
        tags: [
            "brad pitt",
            "morgan freeman",
            "seven",
        ],
        imageURL: "https://i.pinimg.com/originals/b4/5f/72/b45f72ea281f017acd2348fbe6b63d09.jpg"
    },
    {
        tags: [
            "brad pitt",
            "seven",
        ],
        imageURL: "https://filmschoolrejects.com/wp-content/uploads/2018/08/Se7en-Brad-Pitt.jpg"
    },
    {
        tags: [
            "arnold schwarzenegger",
            "terminator",
        ],
        imageURL: "https://townsquare.media/site/442/files/2014/10/terminator-52-630x420.jpg?w=980&q=75"
    },
    {
        tags: [
            "arnold schwarzenegger",
            "terminator",
        ],
        imageURL: "https://townsquare.media/site/442/files/2014/03/terminator-51.jpg?w=980&q=75"
    },
    {
        tags: [
            "arnold schwarzenegger",
            "terminator",
        ],
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMNMwTB2mL_hircgElMkXIhuIB0YMZWZANRlD3NVDiNpB94h1-r2Oy-mhuzF1mQ2LPLYY&usqp=CAU"
    },
    {
        tags: [
            "tim robbins",
            "shawshank redemption",
            "morgan freeman",
        ],
        imageURL: "https://www.indiewire.com/wp-content/uploads/2019/10/shutterstock_editorial_770117ra.jpg"
    },
    {
        tags: [
            "tim robbins",
            "shawshank redemption",
            "morgan freeman",
        ],
        imageURL: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fshawshankred-2000.jpg"
    },
]

export const getImageTagsList = (imageDataXD) => {
    let ans = [];

    imageDataXD.forEach(imageDataItem => {
        imageDataItem.tags.forEach((tag) => {
            if (!ans.includes(tag)) {
                ans.push(tag);
            }
        })
    })

    return ans;
}