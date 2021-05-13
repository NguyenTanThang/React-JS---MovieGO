import React, { Component, useState, useEffect } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {paginate, sortMoviesAndSeries, extractQueryString} from "../utils";
import SearchEngine from "../components/partials/SearchEngine";
/*
import {movieData} from "../data";
import {connect} from "react-redux";
import {getAllMovies} from "../actions/movieActions";
import {getAllGenres} from "../actions/genreActions";
*/
import {getAllMoviesAxios, getAllGenresAxios} from "../requests";

function Search(props) {

    const [searchObject, setSearchObjectNA] = useState({
        searchName: "",
        orderBy: "AtoZ",
        sortGenres: [],
        boardMatches: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [masterMovies, setMasterMovies] = useState([]);
    const [pageObject, setPageObject] = useState({});
    const searchQuery = extractQueryString(props);

    const changePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const setSearchObject = (searchObject) => {
        setSearchObjectNA(prevSearchObject => {
            return {
                ...prevSearchObject,
                ...searchObject
            }
        })
        setCurrentPage(1);
    }

    const clearSearchObject = () => {
        setSearchObjectNA({
            searchName: "",
            orderBy: "AtoZ",
            sortGenres: [],
            boardMatches: false
        })
        setCurrentPage(1);
    }

    useEffect(() => {
        (async () => {
            let genresLocal = await getAllGenresAxios();
            let masterMoviesLocal = await getAllMoviesAxios();
            let searchObjectMockup = searchObject;

            const {t, g, s} = searchQuery;

            if (t) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    searchName: t
                }
            }

            if (g) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    sortGenres: [g]
                }
            }

            if (s) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    orderBy: s
                }
            }

            let currentMovieData = masterMoviesLocal;
            currentMovieData = sortMoviesAndSeries(currentMovieData, searchObjectMockup);
            const pageObjectLocal = paginate(currentMovieData.length, currentPage, 15, 6);
            currentMovieData = currentMovieData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
            setMovies(currentMovieData);
            setMasterMovies(masterMoviesLocal);
            setGenres(genresLocal);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            let moviesLocal = masterMovies;

            let currentMovieData = sortMoviesAndSeries(moviesLocal, searchObject);
    
            const pageObjectLocal = paginate(currentMovieData.length, currentPage, 15, 6);
            currentMovieData = currentMovieData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);
    
            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
            setMovies(currentMovieData);
        })()
    }, [currentPage, searchObject]);

    return (
        <div className='search-page'>
            <SearchEngine searchQuery={searchQuery} setSearchObject={setSearchObject} clearSearchObject={clearSearchObject} searchObject={searchObject} genres={genres}/>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{marginBottom: "20px"}}></div>
            <MovieList movieList={movies}/>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{paddingBottom: "20px"}}></div>
        </div>
    )
}

/*
class Search extends Component {

    state = {
        searchObject: {
            searchName: "",
            orderBy: "AtoZ",
            sortGenres: [],
            boardMatches: false
        },
        currentPage: 1
    }

    componentDidMount = () => {
        this.props.getAllMovies();
        this.props.getAllGenres();
    }

    setSearchObject = (searchObject) => {
        this.setState({
            searchObject: {
            ...this.state.searchObject,
            ...searchObject
        },
        currentPage: 1
    })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {
                searchName: "",
                orderBy: "AtoZ",
                sortGenres: [],
                boardMatches: false
            },
            currentPage: 1
        })
    }

    changePageNumber = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    render() {
        const {changePageNumber, setSearchObject, clearSearchObject} = this;
        const {currentPage, searchObject} = this.state;
        const {movies, genres} = this.props;
        const searchQuery = extractQueryString(this.props);

        let currentMovieData = sortMoviesAndSeries(movies, searchObject);
        console.log("currentMovieData");
        console.log(currentMovieData);

        const pageObject = paginate(currentMovieData.length, currentPage, 15, 6);
        currentMovieData = currentMovieData.slice(pageObject.startIndex, pageObject.endIndex + 1);

        return (
            <div className='search-page'>
                <SearchEngine searchQuery={searchQuery} setSearchObject={setSearchObject} clearSearchObject={clearSearchObject} searchObject={searchObject} genres={genres}/>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{marginBottom: "20px"}}></div>
                <MovieList movieList={currentMovieData}/>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{paddingBottom: "20px"}}></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => {
            dispatch(getAllMovies())
        },
        getAllGenres: () => {
            dispatch(getAllGenres())
        },
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies,
        genres: state.genreReducer.genres,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
*/
export default Search;