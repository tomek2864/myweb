import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  LinearProgress,
  Grid
} from "@material-ui/core";
import { getArticleByID } from "../../actions/articleActions";
import ImageGallery from "react-image-gallery";
import YouTube from "react-youtube";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
const styles = {
  card: {
    maxWidth: 1400,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#968ffc"
  },
  cardGallery: {
    maxWidth: 600,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff"
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

class Article extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getArticleByID(this.props.match.params.id);
    }
  }

  render() {
    const { article, loading } = this.props.article;
    const { classes } = this.props;
    let articleContent;

    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 0
      }
    };

    if (article === null || loading) {
      articleContent = <LinearProgress />;
    } else {
      articleContent = (
        <div>
          <Card className={classes.cardGallery}>
            <ImageGallery items={article.photoLinks} />
          </Card>
          <Card className={classes.cardGallery} />
        </div>
      );
    }

    return (
      <Card className={classes.card}>
        {article.title}
        <CardContent>
          {articleContent}
          {article.ytLinks !== undefined ? (
            <YouTube videoId={article.ytLinks[0].yt} opts={opts} />
          ) : null}
        </CardContent>
      </Card>
    );
  }
}

Article.propTypes = {
  getArticleByID: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticleByID }
)(withStyles(styles)(Article));
