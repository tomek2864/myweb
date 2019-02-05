import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    background: "#f2f2f2",
    maxWidth: 1000,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px",
    textAlign: "justify"
  },
  cardContent: {
    color: "#242249",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px"
  },
  typograhyTitle: {
    padding: "5px 5px",
    fontSize: 22
  },
  typograhyContent: {
    padding: "5px 5px",
    fontSize: 14,
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  grid: {
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
});

class ProfileHeader extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Typography className={classes.typograhyTitle}>O mnie</Typography>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograhyContent}>
              <div>{profile.bio}</div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileHeader);
