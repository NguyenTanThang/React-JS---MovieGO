import React, { Component } from 'react';
import {browseSpecialData, genreData} from "../data";
import GenreListBrowse from "../components/genres/GenreListBrowse";
import { Link } from 'react-router-dom';

class Browse extends Component {

    renderBrowseSpecialSection = () => {
        return browseSpecialData.map(browseSpecialDataItem => {
            const {icon, title, subTitle, backgroundURL} = browseSpecialDataItem;

            return (
                <Link className="browse-special-item">
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

                        <GenreListBrowse genreList={genreData}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Browse;
