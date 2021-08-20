import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./Allmodals.scss";

const URL_START = "https://dog.ceo/api/breed/";
const URL_END = "/images/random/3";

class Allmodals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      subbreedURLs: [],
      showModal: false,
      errorMessage: false
    };
  }

  handleClick = (subbreed, breed) => {
    fetch(`${URL_START}${breed}/${subbreed}${URL_END}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (!Array.isArray(result.message)) {
            this.setState({
              errorMessage: true,
              showModal: true
            });
          } else {
            this.setState({
              subbreedURLs: result.message,
              errorMessage: false,
              showModal: true
            });
          }
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { subbreeds } = this.props;
    const { subbreedURLs, showModal, errorMessage, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (subbreeds.length === 0) {
      return (
        <Modal
          show={this.props.show}
          imageurls={this.props.imageurls}
          onHide={this.props.handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.breed}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.imageurls.map((img, index) => (
              <div key={index}>
                <img src={img} alt={"dog"} />
              </div>
            ))}
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <div>
          <Modal
            centered
            animation={false}
            show={this.props.show}
            onHide={this.props.handleClose}
            dialogClassName={"subbreedWrapper"}
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.breed} sub-breeds</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.subbreeds.map((subbreed) => (
                <Button
                  className={"custombtn"}
                  variant="outline-info"
                  onClick={() => this.handleClick(subbreed, this.props.breed)}
                  key={subbreed}
                >
                  {subbreed}
                </Button>
              ))}
            </Modal.Body>
          </Modal>
          <Modal
            centered
            show={showModal}
            subbreedurls={subbreedURLs}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title className={"errorMessageTitle"} />
            </Modal.Header>
            <Modal.Body>
              {errorMessage ? (
                <p className={"errorMessage"}>
                  Sorry, we don't have any photos of this sub-breed
                </p>
              ) : (
                subbreedURLs.map((img, index) => (
                  <div className={"imgWrapper"} key={index} >
                    <img src={img} alt={"dog"}/>
                  </div>
                ))
              )}
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  }
}

export default Allmodals;
