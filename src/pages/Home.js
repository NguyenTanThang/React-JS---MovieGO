import React, { Component } from 'react';
import {movieData} from "../data";
import {movieHeaderList} from "../helpers";
import MovieList from "../components/movies/MovieListSlider";

class Home extends Component {

    renderMovieListSliders = () => {
        let content = [];

        for (let index = 0; index < 4; index++) {
            content.push(
                <div className="home-movie-slider">
                    <MovieList movieList={movieData} headerDetails={movieHeaderList[index]}/>
                </div>
            )
        }

        return content;
    }
    
    render() {
        return (
            <div className="home-page">
                <div className="banner">
                    <div className="banner-content">
                        <h1>
                            Watch <span className="text-color-primary">Free</span> HD Movies
                        </h1>
                        <h2>
                            Enjoy your <span className="text-color-primary">unlimited</span> movies collection. We are the definitive source for the best curated 720p / 1080p HD movies, viewable by mobile phone and tablet, for free.
                        </h2>
                    </div>
                </div>
                {this.renderMovieListSliders()}
            </div>
        )
    }
}

export default Home;
