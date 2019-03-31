import React, { Component } from "react";
import PropTypes from "prop-types";
import { getArticlesByTagUserHandle } from "../../actions/articleActions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Grid,
  Typography
} from "@material-ui/core";
import ImageGallery from "react-image-gallery";
import YouTube from "react-youtube-embed";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const styles = theme => ({
  card: {
    maxWidth: 1200,
    marginBottom: 25,
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#EEE"
  },
  title: {
    fontSize: 14,
    color: "#000"
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
    color: "#EEE",
    backgroundColor: "#323232",
    borderColor: "#323232",
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
  textNav: {
    fontSize: 28,
    color: "#010101",
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
    const { classes } = this.props;
    const { articles } = this.props;
    let articleContent;
    console.log(articles);
    if (articles === null) {
      articleContent = <LinearProgress />;
    } else {
      console.log(articles);
    }

    return (
      <Card className={classes.card}>
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
  getArticlesByTagUserHandle: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired
};

export default connect(
  null,
  { getArticlesByTagUserHandle }
)(withStyles(styles)(UserTags));
