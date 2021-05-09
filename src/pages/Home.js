import React, { Component } from 'react';
import {movieData} from "../data";
import {movieHeaderList} from "../helpers";
import MovieList from "../components/movies/MovieListSlider";
import {connect} from "react-redux";
import {getAllMovies} from "../actions/movieActions";

class Home extends Component {

    componentDidMount() {
        this.props.getAllMovies();
    }

    renderMovieListSliders = () => {
        const {movies} = this.props;

        let content = [];

        for (let index = 0; index < 4; index++) {
            content.push(
                <div className="home-movie-slider">
                    <MovieList movieList={movies} headerDetails={movieHeaderList[index]}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => {
            dispatch(getAllMovies())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);