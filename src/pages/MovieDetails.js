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
import {getReviewsByMovieID} from "../actions/reviewActions";
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID, getAllMoviesAxios, addView} from "../requests";
import {isObjectEmpty} from '../utils';
import {authenticationService} from '../_services';

class MovieDetails extends Component {
    state = {
        movieItem: "",
        randomMovies: [],
        like: false,
        loggedIn: "",
        loading: true
    }

    async componentDidMount() {
        const {movieID} = this.props.match.params;
        this.props.getReviewsByMovieID(movieID);
        const movies = await getAllMoviesAxios();

        let liked = false;
        let loggedIn = false;
    
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            loggedIn = true;
            const customerID = currentUser._id;
            const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, movieID);
            await addView(customerID, movieID);

            if (!watchLaterItem || isObjectEmpty(watchLaterItem)) {
                liked = false;
            } else {
                liked = true;
            }
        }

        const randomMovies = getRandomInArray(movies, 6);
        const movieItem = await getMovieByIDAxios(movieID);

        this.setState({
            movieItem,
            randomMovies,
            liked,
            loggedIn,
            loading: false
        })
    }

    changeLikeStatus = async () => {
        const {movieItem} = this.state;
        const movieID = movieItem._id;
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            const customerID = currentUser._id;
            if (!this.state.liked === true) {
                await addWatchLater(customerID, movieID)
            } else {
                await deleteWatchLater(customerID, movieID)
            }
        }

        this.setState({
            liked: !this.state.liked
        })
    }

    calculateRating = () => {
        const {reviews, loading} = this.props;

        if (!loading && reviews) {
            if (reviews.length > 0) {
                let meanRating = 0;

                for (let i = 0; i < reviews.length; i++) {
                    const reviewItem = reviews[i];
                    console.log(reviews);
                    meanRating += reviewItem.rate;
                }
    
                if (reviews.length && reviews.length > 0) {
                    meanRating = meanRating / reviews.length;
                }
                return meanRating;
            }
        }

        return 0;
    }

    renderLikeButton = () => {
        const {loggedIn, liked, loading} = this.state;
        const {changeLikeStatus} = this;

        if (loading) {
            return (
                <></>
            )
        }

        if (loggedIn) {
            return (
            <div className="util-btn like-btn" onClick={changeLikeStatus}>
                 <div className="icon">
                     <span class="material-icons">
                         favorite
                     </span>
                 </div>
                 <p>{liked ? "Remove from Watch Later" : "Add to Watch Later"}</p>
             </div>
            )
        }
    }

    renderRatingButton = () => {
        const {loggedIn, loading} = this.state;

        if (loading) {
            return (
                <></>
            )
        }

        const {movieItem} = this.state;
        const movieID = movieItem._id;

        if (loggedIn) {
            return (
                <RateMovieModal movieID={movieID}/>
            )
        }
    }

    renderGenreList = () => {
        const {movieItem} = this.state;
        const {genres} = movieItem;
        let genreContent = <></>;

        if (!genres || genres.length === 0) {
            return genreContent;
        }
        
        genreContent = genres.map(genreItem => {
            return <Link to={`/search?g=${genreItem}`} className=" search-genre-item genre-box-item">
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
                <Link to={`/search?t=${Actor}`}>
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
                <Link to={`/search?t=${directorItem}`}>
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
        const {renderGenreList, renderActorList, renderDirectorList, renderProductionList, renderLikeButton, calculateRating, renderRatingButton} = this;
        const {movieItem, randomMovies, loggedIn} = this.state;

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
                                        <p>{calculateRating().toFixed(1)}/5</p>
                                    </Space>
                                </div>
                            <p>{numberWithCommas(view)} views</p>

                            {loggedIn ? (<div className="movie-details-main-video__utils">
                                <Space>
                                    {renderRatingButton()}
                                    {renderLikeButton()}
                                </Space>
                            </div>) : (<div style={{
                                marginBottom: "20px"
                            }}></div>)}
                            
                        </div>

                        <div className="movie-details-main__description">
                            <div className="movie-details-main-description__poster">
                                <img src={imageURL} alt={name} className="img-fluid"/>
                            </div>

                            <div className="movie-details-main-description__details">

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li style={{
                                            flex: "100%",
                                            maxWidth: "100%"
                                        }}>
                                            <h5>Actors</h5>
                                            <p className=" movie-description-details-list">
                                                {renderActorList()}
                                            </p>
                                        </li>
                                        
                                        {/*
                                        <li>
                                            <h5>Directors</h5>
                                            <p className="movie-description-details-list">
                                                    {renderDirectorList()}
                                            </p>
                                        </li>
                                        */}
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
                                        {/*
                                        
                                        <li>
                                            <h5>Production</h5>
                                            <p className="movie-description-details-list">
                                                {renderProductionList()}
                                            </p>
                                        </li>
                                        */}
                                        <li>
                                            <h5>Directors</h5>
                                            <p className="movie-description-details-list">
                                                    {renderDirectorList()}
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
        },
        getReviewsByMovieID: (movieID) => {
            dispatch(getReviewsByMovieID(movieID))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies,
        loading: state.loadingReducer.loading,
        reviews: state.reviewReducer.reviews,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);