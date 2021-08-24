import React from "react";
import  "./Form.scss";

type  Props = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

class Form extends React.Component<Props> {
  render() {
    return (
      <form>
        <div>
          <label>Breeds search:</label>
          <input
            type="search"
            onChange={this.props.handleChange}
          />
        </div>
      </form>
    );
  }
}

export default Form;



