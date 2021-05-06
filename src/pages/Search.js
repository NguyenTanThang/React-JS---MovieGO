import React, { Component } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {paginate} from "../utils";
import SearchEngine from "../components/partials/SearchEngine";
import {movieData} from "../data";

class Search extends Component {

    state = {
        searchObject: {},
        currentPage: 1
    }

    setSearchObject = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {
                searchName: "",
                orderBy: "AtoZ",
                sortGenres: []
            }
        })
    }

    changePageNumber = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    render() {
        const {changePageNumber} = this;
        const {currentPage} = this.state;

        const pageObject = paginate(movieData.length, currentPage, 5, 6);
        let currentMovieData = movieData.slice(pageObject.startIndex, pageObject.endIndex + 1);

        return (
            <div className='search-page'>
                <SearchEngine/>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{marginBottom: "20px"}}></div>
                <MovieList movieList={currentMovieData}/>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{paddingBottom: "20px"}}></div>
            </div>
        )
    }
}

export default Search;
