import React, { Component } from 'react';
import MovieItem from "./MovieItemSlider";
import shortid from "shortid";

class MovieList extends Component {

    constructor(props) {
        super(props);

        this.movieListRef = React.createRef();
    }

    renderMovieItems = () => {
        const {movieList} = this.props;

        return movieList.map(movieItem => {
            return <MovieItem key={shortid()} movieItem={movieItem}/>
        })
    }

    renderListHeader = () => {
        const {headerDetails} = this.props;
        const {title, subTitle, locationURL, type} = headerDetails;

        let typeButton = (
            <li className="random-button">
                <a href={locationURL} className="btn btn-dark">
                    <span class="material-icons">
                        shuffle
                    </span>
                </a>
            </li>
        )

        if (type === "all") {
            typeButton = (<li className="type-button">
                <a href={locationURL} className="btn btn-dark">
                    ALL
                </a>
            </li>)
        }

        return (
            <div className="movie-list-header">
                <div className="left">
                    <h4>{title}</h4>
                    <p>{subTitle}</p>
                </div>
                <div className="right">
                    <ul>
                        {typeButton}
                        <li className="btn btn-dark" onClick={this.moveToLeft}>
                            <span class="material-icons">
                                keyboard_arrow_left
                            </span>
                        </li>
                        <li className="btn btn-dark" onClick={this.moveToRight}>
                            <span class="material-icons">
                                keyboard_arrow_right
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    moveToRight = () => {
        const node = this.movieListRef.current;
        node.scrollTo({
            top: 0,
            left: node.scrollLeft + 1000,
            behavior: 'smooth'
        });
    }

    moveToLeft = () => {
        const node = this.movieListRef.current;
        node.scrollTo({
            top: 0,
            left: node.scrollLeft - 1000,
            behavior: 'smooth'
        });
    }

    render() {
        const {renderMovieItems, renderListHeader} = this;

        return (
            <div className="container-fluid">
                {renderListHeader()}
                <div className="movie-list-slider" ref={this.movieListRef}>
                    {renderMovieItems()}
                </div>
            </div>
        )
    }
}

export default MovieList;