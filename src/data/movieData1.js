function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const movieNameList = [
    "Inglourious Basterds",
    "Inception",
    "Men in Black",
    "Men in Black 3",
    "Men in Black II",
    "Logan",
    "Interstellar",
    "Ocean's Twelve",
    "Ocean's Eleven",
    "Open Grave",
    "Pirates of the Caribbean: Dead Man's Chest",
    "Ratatouille",
    "Saw: The Final Chapter",
    "Saw",
]

const imdbIDList = [
    "tt0361748",
    "tt1375666",
    "tt0119654",
    "tt1409024",
    "tt0120912",
    "tt3315342",
    "tt0816692",
    "tt0349903",
    "tt0240772",
    "tt2071550",
    "tt0383574",
    "tt0382932",
    "tt1477076",
    "tt0387564",
]

const imageURLList = [
    "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BOTlhYTVkMDktYzIyNC00NzlkLTlmN2ItOGEyMWQ4OTA2NDdmXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTU2NTYxODcwMF5BMl5BanBnXkFtZTcwNDk1NDY0Nw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMmJmYzBjNTktMTJjZS00ZGRhLWE1Y2QtOWQxZGU0Y2RmMjkyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTc1MDM5MTI0Ml5BMl5BanBnXkFtZTgwOTMyODI1MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjI0NTEwNTgwNF5BMl5BanBnXkFtZTcwMDM5MTU5Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMzQ2ZTBhNmEtZDBmYi00ODU0LTgzZmQtNmMxM2M4NzM1ZjE4XkEyXkFqcGdeQXVyNjE5MjUyOTM@._V1_UX182_CR0,0,182,268_AL_.jpg",
]

const streamTapeCodeList = [
    "1O03AP7J3QFejqX",
    "PZaWVDbQ9Lc0OZb",
    "MX0gxWPZDGumWZ7",
    "9oqdzPvRRYHabjj",
    "vQ3GqdvJrYT4yKQ",
    "vlo29ZlQJ7CLwP",
    "3BpegL44YKfdoRb",
    "06B16wOgJvub9Ge",
    "MZ9KkgLjKpU69J",
    "g3RKVo2V7Ghql7B",
    "28gvgjvLoLszJW",
    "r246XQJXrDSkG7",
    "7wl6WKaV1OSVDX",
    "0ZvagaeV9jcb3Ql",
]

const movieGenreList = [
    [
        "Adventure",
        "Drama",
        "War"
    ],
    [
        "Action",
        "Adventure",
        "Sci-fi",
    ],
    [
        "Action",
        "Adventure",
        "Comedy",
    ],
    [
        "Action",
        "Adventure",
        "Comedy",
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
        "Crime",
        "Thriller",
    ],
    [
        "Crime",
        "Thriller",
    ],
    [
        "Horror",
        "Mystery",
        "Thriller",
    ],
    [
        "Action",
        "Adventure",
        "Fantasy",
    ],
    [
        "Animation",
        "Adventure",
        "Comedy",
    ],
    [
        "Horror",
        "Mystery",
        "Crime",
    ],
    [
        "Horror",
        "Mystery",
        "Thriller",
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

export default ans;