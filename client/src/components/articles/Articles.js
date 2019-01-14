import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "./ArticlesForm";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Paper
} from "@material-ui/core";

const styles = {
  card: {
    maxWidth: 1000,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto"
  }
};

class Articles extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <h1>Panel sterowania</h1>
          <ArticleForm />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Articles);
