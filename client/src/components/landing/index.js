import React, { Component } from "react";
import { Grid } from "@material-ui/core/";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const styles = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 }
};

class index extends Component {
  render() {
    return (
      <Grid container>
        <Grid item sm>
          <LeftPanel styles={styles} />
        </Grid>
        <Grid item sm>
          <RightPanel styles={styles} />
        </Grid>
      </Grid>
    );
  }
}

export default index;
