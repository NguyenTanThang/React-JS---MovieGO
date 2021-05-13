import React from 'react';
import GenreItemBrowse from "./GenreItemBrowse";

function GenreListBrowse({genreList}) {

    console.log(genreList);

    const renderGenreBrowseItems = () => {
        return genreList.map(genreItem => {
            return <GenreItemBrowse genreItem={genreItem}/>
        })
    }

    return (
        <div className="browse-genres-list">
            {renderGenreBrowseItems()}
        </div>
    )
}

/*
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
*/

export default GenreListBrowse;
