import React, { Component } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {paginate, sortMoviesAndSeries} from "../utils";
import SearchEngine from "../components/partials/SearchEngine";
import {movieData} from "../data";
import {connect} from "react-redux";
import {getAllMovies} from "../actions/movieActions";
import {getAllGenres} from "../actions/genreActions";

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
        }
    })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {
                searchName: "",
                orderBy: "AtoZ",
                sortGenres: [],
                boardMatches: false
            }
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

        let currentMovieData = sortMoviesAndSeries(movies, searchObject);
        console.log("currentMovieData");
        console.log(currentMovieData);

        const pageObject = paginate(currentMovieData.length, currentPage, 5, 6);
        currentMovieData = currentMovieData.slice(pageObject.startIndex, pageObject.endIndex + 1);

        return (
            <div className='search-page'>
                <SearchEngine setSearchObject={setSearchObject} clearSearchObject={clearSearchObject} searchObject={searchObject} genres={genres}/>
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
