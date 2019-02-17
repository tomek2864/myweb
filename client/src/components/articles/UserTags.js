import React, { Component } from "react";
import PropTypes from "prop-types";
import { getArticlesByTagUserHandle } from "../../actions/articleActions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
const styles = theme => ({
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
  },
  chip: {
    margin: theme.spacing.unit / 2,
    color: "#ff795e",
    backgroundColor: "#242249",
    borderColor: "#242249",
    border: "2px solid",
    padding: "1px 8px",
    fontSize: 16
  },
  textArticle: {
    margin: theme.spacing.unit / 2,
    fontSize: 16,
    padding: "2px 8px",
    width: "auto",
    display: "flex"
  },
  nameArticle: {
    margin: theme.spacing.unit / 2,
    fontSize: 22,
    padding: "2px 8px",
    width: "auto",
    display: "flex"
  },
  cardText: {
    maxWidth: 1000,
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "justify"
  },
  cardNav: {
    maxWidth: 1000,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#4f6832"
  },
  textNav: {
    fontSize: 28,
    color: "#2a2a5a",
    textAlign: "center"
  }
});

class UserTags extends Component {
  handleClick = data => () => {
    alert(data);
  };

  componentDidMount() {
    console.log(this.props.match.params.tag);
    this.props.getArticlesByTagUserHandle(
      this.props.match.params.handle,
      this.props.match.params.tag
    );
  }

  render() {
    const { classes, article, auth } = this.props;

    return (
      <Card className={classes.cardNav}>
        <CardContent>
          <Typography className={classes.textNav}>
            Projekty z kategorii: {this.props.match.params.tag}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

UserTags.propTypes = {
  getArticlesByTagUserHandle: PropTypes.func.isRequired
};

export default connect(
  null,
  { getArticlesByTagUserHandle }
)(withStyles(styles)(UserTags));
