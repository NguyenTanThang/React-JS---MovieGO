import React, { Component } from 'react';
import {browseSpecialData, genreData} from "../data";
import GenreListBrowse from "../components/genres/GenreListBrowse";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {getAllGenres} from "../actions/genreActions";

class Browse extends Component {

    componentDidMount() {
        this.props.getAllGenres();
    }
 
    renderBrowseSpecialSection = () => {
        return browseSpecialData.map(browseSpecialDataItem => {
            const {icon, title, subTitle, backgroundURL, linkTo} = browseSpecialDataItem;

            return (
                <Link to={linkTo} className="browse-special-item">
                    <div className="browse-special-item__image">
                        <img className="img-fluid" src={backgroundURL} alt={title}/>
                    </div>
                    <div className="browse-special-item__content">
                        <div className="icon">
                            {icon}
                        </div>
                        <h4>{title}</h4>
                        <p>{subTitle}</p>
                    </div>
                </Link>
            )
        })
    }

    render() {
        const {genres} = this.props;

        return (
            <div className="browse-page">
                <div className="browse-special-list">
                    <div className="container-fluid">
                        {this.renderBrowseSpecialSection()}
                    </div>
                </div>

                <div className="browse-genres">
                    <div className="container-fluid">
                        <div className="section-header">
                            <div className="left">
                                <h2>GENRES</h2>
                            </div>
                        </div>

                        <GenreListBrowse genreList={genres}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => {
            dispatch(getAllGenres())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genreReducer.genres,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
