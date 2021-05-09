import part1 from "./movieData1";

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const movieNameList = [
    "The Shawshank Redemption",
    "Pulp Fiction",
    "The Ugly Truth",
    "The Godfather",
    "The Godfather: Part II",
    "The Lord of the Rings: The Return of the King",
    "Se7en",
    "The Matrix",
    "Harry Potter and the Sorcerer's Stone",
    "Harry Potter and the Prisoner of Azkaban",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Half-Blood Prince",
    "How to Train Your Dragon: The Hidden World",
    "How to Train Your Dragon",
]

const imdbIDList = [
    "tt0111161",
    "tt0110912",
    "tt1142988",
    "tt0068646",
    "tt0071562",
    "tt0167260",
    "tt0114369",
    "tt0133093",
    "tt0241527",
    "tt0304141",
    "tt0295297",
    "tt0417741",
    "tt2386490",
    "tt0892769",
]

const imageURLList = [
    "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTM2MTM2OTUwNl5BMl5BanBnXkFtZTcwNTgwNTE0Mg@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjIwMDIwNjAyOF5BMl5BanBnXkFtZTgwNDE1MDc2NTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
]

const streamTapeCodeList = [
    "Y10JVZQ4Wruv4lD",
    "zxo1ZJJB7psY0WV",
    "w6DQd9AgdBHJKkP",
    "aPJJ0R30jRCO0K",
    "pjx36My8xMhr6Ye",
    "kvvjyzyYJ8fykg",
    "6RkmYLYPMdU9J8x",
    "eLkmeBrZb2fYVAP",
    "w6xxrqLrJ2ulry",
    "Xz1lakbyWKiD9w6",
    "qWaVl64JKvhzlLq",
    "x2kwGbaD0Afv1j",
    "eaeA2G98r9tYzZk",
]

const movieGenreList = [
    [
        "Drama"
    ],
    [
        "Crime",
        "Drama",
    ],
    [
        "Comedy",
        "Romance",
    ],
    [
        "Crime",
        "Drama",
    ],
    [
        "Crime",
        "Drama",
    ],
    [
        "Action",
        "Adventure",
        "Drama",
        "Fantasy",
    ],
    [
        "Crime",
        "Drama",
        "Thriller",
    ],
    [
        "Action",
        "Sci-fi",
    ],
    [
        "Adventure",
        "Family",
        "Fantasy",
    ],
    [
        "Adventure",
        "Family",
        "Fantasy",
    ],
    [
        "Adventure",
        "Family",
        "Fantasy",
    ],
    [
        "Adventure",
        "Family",
        "Fantasy",
        "Family",
    ],
    [
        "Animation",
        "Action",
        "Adventure",
    ],
    [
        "Animation",
        "Action",
        "Adventure",
        "Family",
    ],
]

let ans = [];

for (let i = 0; i < imdbIDList.length; i++) {
    const imdbIDItem = imdbIDList[i];
    const movieNameItem = movieNameList[i];
    const imageURLItem = imageURLList[i];
    const streamTapeCodeItem = streamTapeCodeList[i];
    const movieGenreItem = movieGenreList[i];

    const movieItem = {
        id: i,
        IMDB_ID: imdbIDItem,
        name: movieNameItem,
        imageURL: imageURLItem,
        streamTapeCode: streamTapeCodeItem,
        genres: movieGenreItem,
        created_date: randomDate(new Date(2021, 0, 1), new Date()),
        view: getRandomInt(1000, 300000),
        rating: getRandomInt(1, 5)
    };

    ans.push(movieItem);
}

export const movieData = ans