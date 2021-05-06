import React, { Component } from 'react';
import { Modal, Button, Switch, Space } from 'antd';
import {genreData, sortByDetails} from "../../data";

class GenreModal extends React.Component {
    state = {
      loading: false,
      visible: false,
    };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    handleChangeBoardMatches = (checked) => {
        const {setSearchObject} = this.props;
        setSearchObject({
            boardMatches: checked
        })
    }

    renderGenreSearchItems = () => {
        const {searchObject, setSearchObject} = this.props;
        const {sortGenres} = searchObject;

        return genreData.map(genreDataItem => {
            if (sortGenres.includes(genreDataItem.name)) {
                return <li className="search-genre-item active" onClick={() => {
                    setSearchObject({
                        sortGenres: sortGenres.filter(genreItem => {
                            return genreItem !== genreDataItem.name;
                        })
                    })
                }}>
                    {genreDataItem.name}
                </li>
            }
            return <li className="search-genre-item" onClick={() => {
                setSearchObject({
                    sortGenres: [...sortGenres, genreDataItem.name]
                })
            }}>
                {genreDataItem.name}
            </li>
        })
    }
  
    render() {
      const { visible, loading } = this.state;
      const {handleChangeBoardMatches, renderGenreSearchItems} = this;
      const {searchObject} = this.props;
    const {boardMatches} = searchObject;

      return (
        <>
          <div className="search-util__item" onClick={this.showModal}>
            <div className="icon">
                <span class="material-icons">
                    style
                </span>
            </div>
            <p>Genres</p>
          </div>
          <Modal
            visible={visible}
            title="Genres"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Apply
              </Button>,
            ]}
            width={800}
          >
            <div className="modal-section flex">
                <div className="left">
                    <h4>Broad Matches</h4>
                    <p>More results, but less accurate. Videos will match if they contain any selected tag rather than all selected tags.</p>
                </div>
                <div className="right">
                    <Switch onChange={handleChangeBoardMatches}/>
                </div>
            </div>

            <div className="modal-section">
                <div className="top">
                    <h4>Include Tags</h4>
                    {boardMatches ? (<p>Find videos that has any selected tags below:</p>) : (<p>Find videos that has all selected tags below:</p>)}
                </div>
                <div className="bottom">
                    <Space size={[8, 16]} wrap>
                        {renderGenreSearchItems()}
                    </Space>
                </div>
            </div>
          </Modal>
        </>
      );
    }
}

class SortModal extends React.Component {
    state = {
      loading: false,
      visible: false,
    };
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = () => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    renderSortSearchItems = () => {
        const {searchObject, setSearchObject} = this.props;
        const {orderBy} = searchObject;

        return sortByDetails.map(genreDataItem => {
            if (orderBy === genreDataItem.key) {
                return <li className="search-genre-item active" onClick={() => {
                    setSearchObject({
                        orderBy: genreDataItem.key
                    })
                }}>
                    {genreDataItem.name}
                </li>
            }
            return <li className="search-genre-item" onClick={() => {
                setSearchObject({
                    orderBy: genreDataItem.key
                })
            }}>
                {genreDataItem.name}
            </li>
        })
    }
  
    render() {
        
      const { visible, loading } = this.state;
        const {renderSortSearchItems} = this;
      
      return (
        <>
          <div className="search-util__item" onClick={this.showModal}>
            <div className="icon">
                <span class="material-icons">
                    sort
                </span>
            </div>
            <p>Sort By</p>
          </div>
          <Modal
            visible={visible}
            title="Sort By"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Apply
              </Button>,
            ]}
          >
            <div className="modal-section">
                <div className="top">
                    <h4>Sort By</h4>
                    <p>The movies will be sorted by the selected order (you can only sort by 1 criteria at a time):</p>
                </div>
                <div className="bottom">
                    <Space size={[8, 16]} wrap>
                        {renderSortSearchItems()}
                    </Space>
                </div>
            </div>
          </Modal>
        </>
      );
    }
}

class SearchEngine extends Component {

    state = {
        searchObject: {
            searchName: "",
            orderBy: "AtoZ",
            sortGenres: [],
            boardMatches: false
        },
    }

    setSearchObject = (searchObject) => {
        this.setState({
            searchObject: {
                ...this.state.searchObject,
                ...searchObject
            }
        })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {
                searchName: "",
                orderBy: "AtoZ",
                sortGenres: [],
                boardMatches: false
            }
        })
    }

    render() {
        const {searchObject} = this.state;
        const {clearSearchObject, setSearchObject} = this;

        return (
            <div className="search-engine">
                <div className="search-engine__search-bar">
                    <div className="container-fluid">
                        <input type="text" placeholder="Search..." className="form-control" onChange={(e) => {
                            setSearchObject({searchName: e.target.value})
                        }} value={searchObject.searchName}/>
                    </div>
                </div>
                <div className="search-engine__utils-list">
                    <div className="container-fluid">
                        <ul>
                            <li>
                                <GenreModal searchObject={searchObject} setSearchObject={setSearchObject}/>
                            </li>
                            <li>
                                <SortModal searchObject={searchObject} setSearchObject={setSearchObject}/>
                            </li>
                            <li>
                                <div className="search-util__item" onClick={clearSearchObject}>
                                    <div className="icon">
                                        <span class="material-icons">
                                            restart_alt
                                        </span>
                                    </div>
                                    <p>Reset All</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchEngine;