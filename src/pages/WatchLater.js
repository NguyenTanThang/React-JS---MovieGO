import React, { useEffect, useState } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {getWatchLaterByCustomerID} from "../requests";
import {paginate} from "../utils";
import { authenticationService } from '../_services';

function WatchLater() {

    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [pageObject, setPageObject] = useState({})

    useEffect(() => {
        const currentUser = authenticationService.currentUserValue;

        const movies = getWatchLaterByCustomerID(currentUser._id);

        const pageObjectLocal = paginate(movies.length, currentPage, 15, 6);
        let currentMovieData = movies.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

        setPageObject(prevPageObject => {
            return {
                ...prevPageObject,
                ...pageObjectLocal
            }
        })
        setMovies(currentMovieData);
    }, [currentPage]);

    const changePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className='watch-later-page search-page'>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{marginBottom: "20px"}}></div>
            <MovieList movieList={movies}/>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{paddingBottom: "20px"}}></div>
        </div>
    )
}

/*
class WatchLater extends Component {

    state = {
        currentPage: 1,
        movies: []
    }

    async componentDidMount() {
        const currentUser = authenticationService.currentUserValue;

        const movies = await getWatchLaterByCustomerID(currentUser._id);

        this.setState({
            movies
        })
    }

    changePageNumber = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        })
    }

    render() {
        const {changePageNumber} = this;
        const {currentPage, movies} = this.state;

        const pageObject = paginate(movies.length, currentPage, 15, 6);
        let currentMovieData = movies.slice(pageObject.startIndex, pageObject.endIndex + 1);

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
*/

export default WatchLater;
