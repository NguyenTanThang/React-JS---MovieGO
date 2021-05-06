import React, { Component } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

class ImageList extends Component {

    renderImageItems = () => {
        const {imageList} = this.props;

        return imageList.map(imageItem => {
            return <div className="image-item">
                <a target="_blank" href={imageItem.imageURL}>
                    <img className="img-fluid" src={imageItem.imageURL} alt={imageItem.tags[0]} />
                </a>
            </div>
        })
    }

    render() {
        return (
            <div className="image-list">
                <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry gutter="20px">
                        {this.renderImageItems()}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        )
    }
}

export default ImageList;
