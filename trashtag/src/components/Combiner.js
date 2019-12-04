import React from "react";

class Combiner extends React.Component {
  render() {
    return (
      <div className="combiner">
        <img className="square" src={this.props.before.src}
          alt={this.props.after.alt} />
        <img className="square" src={this.props.after.src}
          alt={this.props.after.alt} />
      </div>
    );
  }
}

export default Combiner;