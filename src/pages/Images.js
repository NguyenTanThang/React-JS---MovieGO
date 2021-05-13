import React, { useState, useEffect, useContext } from 'react';
import ImageList from "../components/images/ImageList";
import Pagination from "../components/partials/Pagination";
import {getImageTagsList} from "../data";
import {Select} from "antd";
import {paginate} from "../utils";
/*
import {getAllImages} from "../actions/imageActions";
import {connect} from "react-redux";
*/
import {ImageContext} from '../reducers/hookReducers/ImageStore';
import {GET_ALL_IMAGES} from '../reducers/hookReducers/types';
import {getAllImagesAxios} from '../requests';

const { Option } = Select;

function Images() {

    const [imageState, imageDispatch] = useContext(ImageContext);

    const [tags, setTagsLocal] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageObject, setPageObject] = useState({});
    const [masterImages, setMasterImages] = useState([]);

    useEffect(() => {
        (async () => {
            let images = await getAllImagesAxios();

            let currentImageData = images;
            const pageObjectLocal = paginate(currentImageData.length, currentPage, 6, 6);
            currentImageData = currentImageData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
            setMasterImages(images);
            imageDispatch({type: GET_ALL_IMAGES, payload: {
                images: currentImageData
            }})
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let images = masterImages;

            let currentImageData = tags.length > 0 ? images.filter(currentImageDataItem => {
                let result = false;
                for (let i = 0; i < tags.length; i++) {
                    const tag = tags[i];
                    if (currentImageDataItem.tags.includes(tag)) {
                        result = true;
                        break;
                    }
                }
                return result;
            }) : images;

            const pageObjectLocal = paginate(currentImageData.length, currentPage, 6, 6);
            currentImageData = currentImageData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
    
            imageDispatch({type: GET_ALL_IMAGES, payload: {
                images: currentImageData
            }})
        })();
     }, [currentPage, tags]);

    const setTags = (tags) => {
        setTagsLocal(tags);
        setCurrentPage(1);
    }

    const clearTags = () => {
        setTagsLocal([]);
        setCurrentPage(1);
    }

    const changePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const renderTagOptions = () => {
        const {images} = imageState;
        const tags = getImageTagsList(images);

        return tags.map(tag => {
            return(
                <Option key={tag}>{tag}</Option>
            )
        })
    }

    const handleTagChange = (value) => {
        const {images} = imageState;
        const tags = getImageTagsList(images);

        if (value.length === 0) {
            return setTags(value)
        }
        const newValue = value[value.length - 1];
        let isOccurred = false;

        tags.forEach(tag => {
            if (newValue === tag) {
                isOccurred = true;
            }
        })

        if (isOccurred) {
            setTags(value)
        }
    }

    return (
        <div className='image-page'>
            <div className="image-search">
                <div className="container-fluid">
                    <Select mode="tags" style={{ 
                        width: '100%',
                         }} placeholder="Tags" onChange={handleTagChange} value={tags}>
                        {renderTagOptions()}
                    </Select>
                </div>
            </div>

            <div style={{marginBottom: "20px"}}></div>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{marginBottom: "20px"}}></div>
            <div className="container-fluid">
                <ImageList imageList={imageState.images}/>
            </div>
            <div style={{marginBottom: "20px"}}></div>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
            <div style={{paddingBottom: "20px"}}></div>
        </div>
    )
}

/*
class Search extends Component {

    state = {
        tags: [],
        currentPage: 1
    }

    componentDidMount() {
        this.props.getAllImages();
    }

    setTags = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    clearTags = () => {
        this.setState({
            tags: [],
            currentPage: 1
        })
    }

    changePageNumber = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }

    renderTagOptions = () => {
        const {images} = this.props;
        const tags = getImageTagsList(images);

        return tags.map(tag => {
            return(
                <Option key={tag}>{tag}</Option>
            )
        })
    }

    handleTagChange = (value) => {
        const {images} = this.props;
        const tags = getImageTagsList(images);

        if (value.length === 0) {
            return this.setState({
                tags: value
            })
        }
        const newValue = value[value.length - 1];
        let isOccurred = false;

        tags.forEach(tag => {
            if (newValue === tag) {
                isOccurred = true;
            }
        })

        if (isOccurred) {
            this.setState({
                tags: value
            })
        }
    }

    render() {
        const {changePageNumber, renderTagOptions, handleTagChange} = this;
        const {currentPage, tags} = this.state;
        const {images} = this.props;

        let currentImageData = tags.length > 0 ? images.filter(currentImageDataItem => {
            let result = false;
            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];
                if (currentImageDataItem.tags.includes(tag)) {
                    result = true;
                    break;
                }
            }
            return result;
        }) : images;
        const pageObject = paginate(currentImageData.length, currentPage, 6, 6);
        currentImageData = currentImageData.slice(pageObject.startIndex, pageObject.endIndex + 1);

        return (
            <div className='image-page'>
                <div className="image-search">
                    <div className="container-fluid">
                        <Select mode="tags" style={{ 
                            width: '100%',
                             }} placeholder="Tags" onChange={handleTagChange} value={tags}>
                            {renderTagOptions()}
                        </Select>
                    </div>
                </div>

                <div style={{marginBottom: "20px"}}></div>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{marginBottom: "20px"}}></div>
                <div className="container-fluid">
                    <ImageList imageList={currentImageData}/>
                </div>
                <div style={{marginBottom: "20px"}}></div>
                <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber}/>
                <div style={{paddingBottom: "20px"}}></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllImages: () => {
            dispatch(getAllImages())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.imageReducer.images,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
*/
export default Images;