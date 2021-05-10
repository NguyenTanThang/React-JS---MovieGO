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
      this.setState({ visible: false });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    handleChangeBoardMatches = (checked) => {
        const {setSearchObjectLocal} = this.props;
        setSearchObjectLocal({
            boardMatches: checked
        })
    }

    renderGenreSearchItems = () => {
        const {searchObjectLocal, setSearchObjectLocal, genres} = this.props;
        const {sortGenres} = searchObjectLocal;

        return genres.map(genreDataItem => {
            if (sortGenres.includes(genreDataItem.name)) {
                return <li className="search-genre-item active" onClick={() => {
                  setSearchObjectLocal({
                        sortGenres: sortGenres.filter(genreItem => {
                            return genreItem !== genreDataItem.name;
                        })
                    })
                }}>
                    {genreDataItem.name}
                </li>
            }
            return <li className="search-genre-item" onClick={() => {
              setSearchObjectLocal({
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
      const {searchObjectLocal} = this.props;
      const {boardMatches} = searchObjectLocal;

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
      this.setState({ visible: false });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    renderSortSearchItems = () => {
        const {searchObjectLocal, setSearchObjectLocal} = this.props;
        const {orderBy} = searchObjectLocal;

        return sortByDetails.map(genreDataItem => {
            if (orderBy === genreDataItem.key) {
                return <li className="search-genre-item active" onClick={() => {
                  setSearchObjectLocal({
                        orderBy: genreDataItem.key
                    })
                }}>
                    {genreDataItem.name}
                </li>
            }
            return <li className="search-genre-item" onClick={() => {
              setSearchObjectLocal({
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
      searchObjectLocal: {
          searchName: "",
          orderBy: "AtoZ",
          sortGenres: [],
          boardMatches: false
      }
  }

  componentDidMount() {
    const {setSearchObject, searchQuery} = this.props;
    const {t, g, s} = searchQuery;

      if (t) {
        this.setState({
          searchObjectLocal: {
            ...this.state.searchObjectLocal,
            searchName: t
          }
        })
        setSearchObject({
            ...this.state.searchObjectLocal,
            searchName: t
        })
    }

    if (g) {
        this.setState({
          searchObjectLocal: {
            ...this.state.searchObjectLocal,
            sortGenres: [g]
          }
        })
        setSearchObject({
            ...this.state.searchObjectLocal,
            sortGenres: [g]
        })
    }

      if (s) {
        this.setState({
          searchObjectLocal: {
            ...this.state.searchObjectLocal,
            orderBy: s
          }
        })
        setSearchObject({
            ...this.state.searchObjectLocal,
            orderBy: s
        })
    }
    
  }

    setSearchObjectLocal = (newSearchObject) => {
      const {setSearchObject} = this.props;

      this.setState({
        searchObjectLocal: {
          ...this.state.searchObjectLocal,
          ...newSearchObject
        }
      })
      setSearchObject({
          ...this.state.searchObjectLocal,
          ...newSearchObject
      })
  }

  clearSearchObjectLocal = () => {
    const {clearSearchObject} = this.props;

      this.setState({
        searchObjectLocal: {
              searchName: "",
              orderBy: "AtoZ",
              sortGenres: [],
              boardMatches: false
          }
      })
      clearSearchObject();
  }

    render() {
      const {setSearchObjectLocal, clearSearchObjectLocal} = this;
      const {searchObjectLocal} = this.state;
      const {genres} = this.props;

        return (
            <div className="search-engine">
                <div className="search-engine__search-bar">
                    <div className="container-fluid">
                        <input type="text" placeholder="Search..." className="form-control" onChange={(e) => {
                            setSearchObjectLocal({
                              searchName: e.target.value
                            })
                        }} value={searchObjectLocal.searchName}/>
                    </div>
                </div>
                <div className="search-engine__utils-list">
                    <div className="container-fluid">
                        <ul>
                            <li>
                                <GenreModal searchObjectLocal={searchObjectLocal} setSearchObjectLocal={setSearchObjectLocal} genres={genres}/>
                            </li>
                            <li>
                                <SortModal searchObjectLocal={searchObjectLocal} setSearchObjectLocal={setSearchObjectLocal}/>
                            </li>
                            <li>
                                <div className="search-util__item" onClick={clearSearchObjectLocal}>
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