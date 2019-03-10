import React, { Component } from "react";
import { Paper, Tabs, Tab } from "@material-ui/core/";

class Footer extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(value);
  };

  render() {
    return (
      <Paper>
        {/* <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs> */}
        Footer
      </Paper>
    );
  }
}

export default Footer;
