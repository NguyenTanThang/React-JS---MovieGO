import React from 'react';
import MovieItem from "./MovieItem";

function MovieList({movieList}) {

    const renderMovieItems = () => {
        return movieList.map(movieItem => {
            return <MovieItem key={movieItem._id} movieItem={movieItem}/>
        })
    }

    return (
        <div className="container-fluid">
            <div className="movie-list">
                {renderMovieItems()}
            </div>
        </div>
    )
}

/*
class MovieList extends Component {

    renderMovieItems = () => {
        const {movieList} = this.props;

        return movieList.map(movieItem => {
            return <MovieItem key={movieItem._id} movieItem={movieItem}/>
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
*/

export default MovieList;
