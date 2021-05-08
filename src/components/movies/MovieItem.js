import React, { Component } from 'react';
import {numberWithCommas, getDaysDiff} from "../../utils";
import { Link } from 'react-router-dom';

class MovieItem extends Component {
    render() {
        const {movieItem} = this.props;
        const {created_date, name, imageURL, view, rating, id} = movieItem;

        let newTag = <></>;

        console.log(getDaysDiff(created_date));

        if (getDaysDiff(created_date) <= 14 && getDaysDiff(created_date) >= 0) {
            newTag = (
                <div className="movie-item__new-tag">
                    NEW
                </div>
            );
        }

        return (
            <div className="movie-item">
                {newTag}
                <Link to={`/movie-details/${id}`}>
                    <div className="movie-item__poster">
                            <img src={imageURL} alt={name} className="img-fluid"/>
                    </div>
                </Link>
                <div className="movie-item__info">
                    <Link to={`/movie-details/${id}`}>
                        <h6>{name}</h6>
                    </Link>
                    <div className="movie-item-info__view">
                        <div className="icon">
                            <span className="material-icons material-icons-outlined">
                                visibility
                            </span>
                        </div>
                        <p>{numberWithCommas(view)}</p>
                    </div>
                </div>
                <div className="movie-item__rating">
                    <div className="icon">
                        <span className="material-icons material-icons-outlined">
                            star
                        </span>
                    </div>
                    <p>{Number.parseFloat(rating).toFixed(1)}</p>
                </div>
            </div>
        )
    }
}

export default MovieItem;
