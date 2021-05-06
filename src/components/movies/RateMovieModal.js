import React, {Component} from "react";
import { Modal } from 'antd';
import {message, Tooltip} from "antd";
import {withRouter} from "react-router-dom";

class RateMovieModal extends Component {
  state = { 
    visible: false, 
    grading: 0, 
    value: this.props.value ? this.props.value : false
  };

  showModal = () => {
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
          </form>
        </Modal>
      </>
    );
  }
}

export default withRouter(RateMovieModal);