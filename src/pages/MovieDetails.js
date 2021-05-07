import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {movieData} from "../data";
import {numberWithCommas, getRandomInArray, parseDateMoment} from "../utils";
import MovieList from "../components/movies/MovieList";
import RateMovieModal from "../components/movies/RateMovieModal";
import { Space } from 'antd';

class MovieDetails extends Component {

    state = {
        movieItem: ""
    }

    componentDidMount() {
        const {movieID} = this.props.match.params;

        const movieItem = movieData.filter(movieDataItem => {
            return movieDataItem.id.toString() === movieID.toString();
        })[0];

        this.setState({
            movieItem
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

    render() {
        const {renderGenreList} = this;
        const {movieItem} = this.state;
        const randomMovies = getRandomInArray(movieData, 6);

        if (!movieItem) {
            return (
                <div className="movie-details-page"></div>
            )
        }

        const {name, created_date, imageURL, view, rating, streamTapeCode} = movieItem;

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
                                                    <Link to="/">
                                                        Tim Robbins
                                                    </Link>
                                                    <Link to="/">
                                                        Morgan Freeman
                                                    </Link>
                                                    <Link to="/">
                                                        Bob Gunton
                                                    </Link>
                                            </p>
                                        </li>
                                        
                                        <li>
                                            <h5>Directors</h5>
                                            <p className="movie-description-details-list">
                                                    <Link to="/">
                                                        Frank Darabont
                                                    </Link>
                                            </p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>IMDB Rating</h5>
                                            <p><span className="text-color-primary">9.3</span>/10 (2,381,013 votes)</p>
                                        </li>
                                        <li>
                                            <h5>Box Office</h5>
                                            <p>$28,699,976</p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>Release Date</h5>
                                            <p>14 Oct 1994</p>
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
                                                <Link to="/">
                                                    Columbia Pictures
                                                </Link> 
                                                <Link to="/">
                                                    Castle Rock Entertainment
                                                </Link>
                                            </p>
                                        </li>
                                        <li>
                                            <h5>Awards</h5>
                                            <p>Nominated for 7 Oscars. Another 21 wins & 36 nominations.</p>
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus aliquet leo ut convallis. Curabitur non elit nec nunc varius hendrerit. Cras venenatis sapien neque, vitae malesuada metus pharetra et. Integer at aliquam leo. Aliquam erat volutpat. Aliquam tempor tempor mauris, vel dictum sapien placerat nec. Aenean pulvinar at diam ac viverra.
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

export default MovieDetails;