import React, { Component } from 'react';
import GenreItemBrowse from "./GenreItemBrowse";

class GenreListBrowse extends Component {

    renderGenreBrowseItems = () => {
        const {genreList} = this.props;

        return genreList.map(genreItem => {
            return <GenreItemBrowse genreItem={genreItem}/>
        })
    }

    render() {
        return (
            <div className="browse-genres-list">
                
                    {this.renderGenreBrowseItems()}

            </div>
        )
    }
}

export default GenreListBrowse;
