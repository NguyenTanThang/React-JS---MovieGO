import React, { Component } from 'react';
import MovieList from "../components/movies/MovieList";
import {getAllMoviesRecAxios} from "../requests";

class WatchLater extends Component {

    state = {
        recSections: ""
    }

    async componentDidMount() {
        const recSections = await getAllMoviesRecAxios();
        this.setState({
            recSections
        })
    }

    render() {
        const {recSections} = this.state;
        const {variation} = this.props.match.params;
        let movieListContent = <></>;

        if (!recSections) {
            return (
                <div className='watch-later-page search-page'>
                    <div className="browse-genres">
                        {movieListContent}
                    </div>
                </div>
            )
        }

        if (variation === "trending") {
            movieListContent = (
                <div>
                    <div className="section-header" style={{
                            marginLeft: "25px"
                        }}>
                        <div className="left">
                            <h2>TRENDING</h2>
                        </div>
                    </div>

                    <MovieList movieList={recSections[0]}/>
                </div>
            )
        }

        if (variation === "random") {
            movieListContent = (
                <div>
                    <div className="section-header" style={{
                            marginLeft: "25px"
                        }}>
                        <div className="left">
                            <h2>RANDOM</h2>
                        </div>
                    </div>

                    <MovieList movieList={recSections[3]}/>
                </div>
            )
        }

        return (
            <div className='watch-later-page search-page'>
                <div className="browse-genres">
                    {movieListContent}
                </div>
            </div>
        )
    }
}

export default WatchLater;
