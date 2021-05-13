import React, {Component, useState, useContext, useEffect} from "react";
import { Modal } from 'antd';
import {
  isObjectEmpty
} from "../../utils";
import {
  authenticationService
} from "../../_services";
import {
  getReviewByCustomerIDAndMovieIDAxios,
  addRating,
  editRating
} from "../../requests/reviewRequests";
import {message} from "antd";
import {withRouter} from "react-router-dom";
import {
  getReviewsByMovieID,
  addReview,
  editReview
} from "../../actions/reviewActions";
import {connect} from "react-redux";

import {ReviewContext} from '../../reducers/hookReducers/ReviewStore';
import {ADD_REVIEW, EDIT_REVIEW, GET_REVIEWS_BY_MOVIES_ID} from '../../reducers/hookReducers/types';
import {getReviewByMovieIDAxios} from '../../requests';

function RateMovieModal(props) {

  const [reviewState, reviewDispatch] = useContext(ReviewContext);

  const [visible, setVisible] = useState(false);
  const [grading, setGrading] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [reviewID, setReviewID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState(props.value ? props.value : false);

  useEffect(() => {
    (async () => {
      let {movieID} = props;
      const currentUser = authenticationService.currentUserValue;
  
      if (!currentUser) {
        return;
      }
  
      const customerID = currentUser._id;
  
      const review = await getReviewByCustomerIDAndMovieIDAxios(movieID, customerID);
  
      const loggedIn = true;
  
      if (!review) {
        setLoggedIn(loggedIn);
      } else {
        if (review || !isObjectEmpty(review)) {
          setGrading(review.rate);
          setIsRated(true);
          setReviewID(review._id);
          setLoggedIn(loggedIn);
          setLoading(false);
        }
      }
    })();
  }, [])

  const showModal = () => {
    if (!loggedIn && !loading) {
      props.history.push("/sign-in");
      message.error("You can rate after logging in");
      setVisible(false);
    }

    setVisible(true);
  };

  const changeGrading = (grading) => {
    setGrading(grading);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const {movieID} = props;
    const currentUser = authenticationService.currentUserValue;
    if (grading === 0) {
      return message.error("Please select a grade for the film");
    }
    if (!currentUser) {
      return;
    }
    const customerID = currentUser._id;

    if (isRated) {
      const updatedRating = await editRating(reviewID, {movieID, grading, customerID});

      reviewDispatch({
        type: EDIT_REVIEW,
        payload: {
          review: updatedRating
        }
      })

      setVisible(false);
      setIsRated(true);

    } else {
      const newRating = await addRating({movieID, grading, customerID});

      reviewDispatch({
        type: ADD_REVIEW,
        payload: {
          review: newRating
        }
      })

      setVisible(false);
      setIsRated(true);
      setReviewID(newRating._id);
    }

    const rates = await getReviewByMovieIDAxios(movieID);
    reviewDispatch({
      type: GET_REVIEWS_BY_MOVIES_ID,
      payload: {
        rates
      }
    });

  }

  const handleCancel = e => {
    setVisible(false);
  };

  const renderStarWidget = () => {
    const starInputs = () => {
      let ans = [];
      for (let index = 1; index <= 5; index++) {
        if (index === grading && isRated) {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`} checked/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        } else {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`}/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        }
      }
      return ans.reverse();
    }

    return (
      <div className="star-widget-container">
        <div className="star-widget">
          {starInputs()}
          <div>
            <header></header>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="util-btn rate-btn" onClick={showModal}>
          <div className="icon">
              <span class="material-icons">
                  star_rate
              </span>
          </div>
          <p>Rate Now</p>
      </div>
      <Modal
        title="Rate the Movie"
        visible={visible}
        onOk={null}
        onCancel={handleCancel}
        okButtonProps={{style: {display: "none"}}}
      >
        <form onSubmit={onSubmit}>
          {renderStarWidget()}
          <div style={{marginBottom: "20px", marginTop: "20px"}}></div>
          <button type="submit" className="btn btn-block btn-primary">RATE</button>
        </form>
      </Modal>
    </>
  );
}


/*
class RateMovieModal extends Component {

  state = { 
    visible: false, 
    grading: 0, 
    isRated: false, 
    reviewID: "" ,
    loggedIn: "",
    loading: true,
    value: this.props.value ? this.props.value : false
  };

  async componentDidMount() {
    let {movieID} = this.props;
    const currentUser = authenticationService.currentUserValue;

    if (!currentUser) {
      return;
    }

    const customerID = currentUser._id;

    const review = await getReviewByCustomerIDAndMovieIDAxios(movieID, customerID);

    const loggedIn = true;

    if (!review) {
      this.setState({
        loggedIn
      })
    } else {
      if (review || !isObjectEmpty(review)) {
        this.setState({
          grading: review.rate,
          isRated: true,
          reviewID: review._id,
          loggedIn,
          loading: false
        })
      }
    }
  }

  showModal = () => {
    const {loggedIn, loading} = this.state;

    if (!loggedIn && !loading) {
      this.props.history.push("/sign-in");
      message.error("You can rate after logging in");
      return this.setState({
        visible: false,
      });
    }

    this.setState({
      visible: true,
    });
  };

  changeGrading = (grading) => {
    this.setState({
        grading
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {movieID} = this.props;
    const {grading, isRated, reviewID} = this.state;
    const currentUser = authenticationService.currentUserValue;
    if (grading === 0) {
      return message.error("Please select a grade for the film");
    }
    if (!currentUser) {
      return;
    }
    const customerID = currentUser._id;
    if (isRated) {
      const updatedRating = await editRating(reviewID, {movieID, grading, customerID});
      this.props.editReview(updatedRating);
      this.props.getReviewsByMovieID(movieID);
      this.setState({
        visible: false,
        isRated: true,
      })
    } else {
      const newRating = await addRating({movieID, grading, customerID});
      this.props.addReview(newRating);
      this.props.getReviewsByMovieID(movieID);
      this.setState({
        visible: false,
        isRated: true,
        reviewID: newRating._id
      })
    }
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  renderStarWidget = () => {
    const {changeGrading} = this;
    const {grading, isRated} = this.state;

    const starInputs = () => {
      let ans = [];
      for (let index = 1; index <= 5; index++) {
        if (index === grading && isRated) {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`} checked/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        } else {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`}/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        }
      }
      return ans.reverse();
    }

    return (
      <div className="star-widget-container">
        <div className="star-widget">
          {starInputs()}
          <div>
            <header></header>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {onSubmit, renderStarWidget, showModal} = this;
    const {isRated} = this.state;

    return (
      <>
        <div className="util-btn rate-btn" onClick={showModal}>
            <div className="icon">
                <span class="material-icons">
                    star_rate
                </span>
            </div>
            <p>Rate Now</p>
        </div>
        <Modal
          title="Rate the Movie"
          visible={this.state.visible}
          onOk={null}
          onCancel={this.handleCancel}
          okButtonProps={{style: {display: "none"}}}
        >
          <form onSubmit={onSubmit}>
            {renderStarWidget()}
            <div style={{marginBottom: "20px", marginTop: "20px"}}></div>
            <button type="submit" className="btn btn-block btn-primary">RATE</button>
            {//
            <div className="form-group">
                <label htmlFor="grading">Grading: {grading}/10</label>
                <input name="grading" id="grading" type="range" className="grading-slider" onChange={changeGrading} min="0" max="10" value={grading}/>
                <button type="submit" className="section__btn">{isRated ? "RE-RATE" : "RATE"}</button>
            </div>
            //}
          </form>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getReviewsByMovieID: (movieID) => {
          dispatch(getReviewsByMovieID(movieID))
      },
      addReview: (newReview) => {
          dispatch(addReview(newReview))
      },
      editReview: (updatedReview) => {
          dispatch(editReview(updatedReview))
      }
  }
}

const mapStateToProps = (state) => {
  return {
      reviews: state.reviewReducer.reviews
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RateMovieModal));
*/

export default withRouter(RateMovieModal);