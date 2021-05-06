import React, { Component } from 'react';
import MovieItem from "./MovieItem";
import shortid from "shortid";

class MovieList extends Component {

    renderMovieItems = () => {
        const {movieList} = this.props;

        return movieList.map(movieItem => {
            return <MovieItem key={shortid()} movieItem={movieItem}/>
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="movie-list">
                    {this.renderMovieItems()}
                </div>
            </div>
        )
    }
}

export default MovieList;
