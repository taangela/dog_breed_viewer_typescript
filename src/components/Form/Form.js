import React from "react";
import styles from "./Form.scss";

class Form extends React.Component {
  render() {
    return (
      <form className ={styles}>
        <div>
          <label>Breeds search:</label>
          <input
            type="search"
            value={this.props.inputText}
            onChange={this.props.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Form;


