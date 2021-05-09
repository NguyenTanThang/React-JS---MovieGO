import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {movieData} from "../data";
import {getMovieByIDAxios} from "../requests";
import {numberWithCommas, getRandomInArray, parseDateMoment} from "../utils";
import MovieList from "../components/movies/MovieList";
import RateMovieModal from "../components/movies/RateMovieModal";
import { Space } from 'antd';
import {connect} from "react-redux";
import {getAllMovies} from "../actions/movieActions";

class MovieDetails extends Component {

    state = {
        movieItem: "",
        randomMovies: []
    }

    async componentDidMount() {
        console.log(this.props);
        this.props.getAllMovies();
        const {movieID} = this.props.match.params;
        console.log(this.props);
        const {movies} = this.props;

        const randomMovies = getRandomInArray(movies, 6);
        const movieItem = await getMovieByIDAxios(movieID);

        this.setState({
            movieItem,
            randomMovies
        })
    }

    renderGenreList = () => {
        const {movieItem} = this.state;
        const {genres} = movieItem;
        let genreContent = <></>;

        if (!genres || genres.length === 0) {
            return genreContent;
        }
        
        genreContent = genres.map(genreItem => {
            return <Link to="/search" className=" search-genre-item genre-box-item">
                {genreItem}
            </Link>
        })

        return <Space size={[16, 16]} wrap>
            {genreContent}
        </Space>
    }

    renderActorList = () => {
        const {movieItem} = this.state;

        const {IMDBOject} = movieItem;

        let {Actors} = IMDBOject;

        Actors = Actors.split(", ");

        return Actors.map(Actor => {
            return (
                <Link to="/">
                    {Actor}
                </Link>
            )
        })
    }

    renderDirectorList = () => {
        const {movieItem} = this.state;

        const {IMDBOject} = movieItem;

        let {Director} = IMDBOject;

        Director = Director.split(", ");

        return Director.map(directorItem => {
            return (
                <Link to="/">
                    {directorItem}
                </Link>
            )
        })
    }

    renderProductionList = () => {
        const {movieItem} = this.state;

        const {IMDBOject} = movieItem;

        let {Production} = IMDBOject;

        Production = Production.split(", ");

        return Production.map(production => {
            return (
                <Link to="/">
                    {production}
                </Link>
            )
        })
    }

    render() {
        const {renderGenreList, renderActorList, renderDirectorList, renderProductionList} = this;
        const {movieItem, randomMovies} = this.state;

        if (!movieItem) {
            return (
                <div className="movie-details-page"></div>
            )
        }

        const {name, created_date, imageURL, view, rating, streamTapeCode, IMDBOject} = movieItem;

        let {Awards, Plot, Released, imdbRating, imdbVotes, BoxOffice} = IMDBOject;

        return (
            <div className="movie-details-page">
                <div className="container-fluid">
                    <div className="row">

                    <div className="movie-details-main">

                        <div className="movie-details-main__video">
                            <iframe id="video-frame" src={streamTapeCode ? `https://streamtape.com/e/${streamTapeCode}/` : `https://streamtape.com/e/Y10JVZQ4Wruv4lD/`} width="100%" height="500" allowFullScreen allowtransparency={true.toString()} allow="autoplay" scrolling="no" frameBorder="0" title={name}></iframe>
                            <div className="title">
                                <h4>{name}</h4>
                            </div>
                            <div className="title_rating">
                                    <Space>
                                        <span class="material-icons">
                                            star_rate
                                        </span>
                                        <p>{Number.parseFloat(rating).toFixed(1)}/5</p>
                                    </Space>
                                </div>
                            <p>{numberWithCommas(view)} views</p>

                            <div className="movie-details-main-video__utils">
                                <Space>
                                    <RateMovieModal/>
                                    <div className="util-btn like-btn">
                                        <div className="icon">
                                            <span class="material-icons">
                                                favorite
                                            </span>
                                        </div>
                                        <p>Add to Watch Later</p>
                                    </div>
                            </Space>
                            </div>
                        </div>

                        <div className="movie-details-main__description">
                            <div className="movie-details-main-description__poster">
                                <img src={imageURL} alt={name} className="img-fluid"/>
                            </div>

                            <div className="movie-details-main-description__details">

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>Actors</h5>
                                            <p className=" movie-description-details-list">
                                                {renderActorList()}
                                            </p>
                                        </li>
                                        
                                        <li>
                                            <h5>Directors</h5>
                                            <p className="movie-description-details-list">
                                                    {renderDirectorList()}
                                            </p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>IMDB Rating</h5>
                                            <p><span className="text-color-primary">{imdbRating}</span>/10 ({imdbVotes} votes)</p>
                                        </li>
                                        <li>
                                            <h5>Box Office</h5>
                                            <p>{BoxOffice}</p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>Release Date</h5>
                                            <p>{Released}</p>
                                        </li>
                                        <li>
                                            <h5>Uploaded Date</h5>
                                            <p>{parseDateMoment(created_date)}</p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        
                                        <li>
                                            <h5>Production</h5>
                                            <p className="movie-description-details-list">
                                                {renderProductionList()}
                                            </p>
                                        </li>
                                        <li>
                                            <h5>Awards</h5>
                                            <p>{Awards}</p>
                                        </li>
                                    </div>
                                </ul>

                            </div>
                        </div>

                        <div className="movie-details-main__info">
                            <div className="movie-details-main-info__genre-box-list">
                                {renderGenreList()}
                            </div>

                            <div className="movie-details-main-info__plot">
                                <p>
                                    {Plot}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="movie-details-side">
                        <h4>Watch more...</h4>
                        <MovieList movieList={randomMovies}/>
                    </div>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);