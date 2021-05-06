import React, { Component } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {paginate} from "../utils";
import {movieData} from "../data";

class WatchLater extends Component {

    state = {
        currentPage: 1
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
            <div className='watch-later-page search-page'>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{marginBottom: "20px"}}></div>
                <MovieList movieList={currentMovieData}/>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{paddingBottom: "20px"}}></div>
            </div>
        )
    }
}

export default WatchLater;
