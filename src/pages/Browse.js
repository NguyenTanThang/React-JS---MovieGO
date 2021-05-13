import React, { useContext, useEffect } from 'react';
import {browseSpecialData} from "../data";
import GenreListBrowse from "../components/genres/GenreListBrowse";
import { Link } from 'react-router-dom';
/*
import {connect} from "react-redux";
import {getAllGenres} from "../actions/genreActions";
*/
import {GenreContext} from '../reducers/hookReducers/GenreStore';
import {GET_ALL_GENRES} from '../reducers/hookReducers/types';
import {getAllGenresAxios} from '../requests';

function Browse() {

    const [genreState, genreDispatch] = useContext(GenreContext);

    useEffect(() => {
        (async () => {
            const genres = await getAllGenresAxios();
            genreDispatch({type: GET_ALL_GENRES, payload: {
                genres
            }})
        })();
    }, []);

    const renderBrowseSpecialSection = () => {
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

    return (
        <div className="browse-page">
            <div className="browse-special-list">
                <div className="container-fluid">
                    {renderBrowseSpecialSection()}
                </div>
            </div>

            <div className="browse-genres">
                <div className="container-fluid">
                    <div className="section-header">
                        <div className="left">
                            <h2>GENRES</h2>
                        </div>
                    </div>

                    <GenreListBrowse genreList={genreState.genres}/>
                </div>
            </div>
        </div>
    )
}

/*
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
*/

export default Browse;
