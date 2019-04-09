import React from "react";
import Button from "@material-ui/core/Button";

class BlockStyleButton extends React.Component {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    /* let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    } */

    return <Button onClick={this.onToggle}>{this.props.label}</Button>;
  }
}

export default BlockStyleButton;
