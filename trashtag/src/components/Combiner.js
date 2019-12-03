import React from "react";

class Combiner extends React.Component {
  render() {
    return (
      <div className="combiner">
        <img className="square" src={this.props.before} />
        <img className="square" src={this.props.after} />
      </div>
    );
  }
}

export default Combiner;