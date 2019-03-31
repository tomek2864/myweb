import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
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
import { getArticleByID } from "../../actions/articleActions";
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
  cardGallery: {
    maxWidth: 800,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 14
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  contentCard: {
    maxWidth: 800,
    alignItems: "center"
  },
  textArticle: {
    textAlign: "justify",
    fontSize: 16
  },
  titleArticle: {
    textAlign: "center",
    fontSize: 28
  },
  tagsArticle: {
    fontSize: 16
  },
  chip: {
    margin: theme.spacing.unit / 2,
    color: "#EEE",
    backgroundColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
    border: "2px solid",
    padding: "1px 8px",
    fontSize: 16,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main
    }
  }
});

class Article extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getArticleByID(this.props.match.params.id);
    }
  }

  openTagSite = tag => () => {
    this.props.history.push(
      `/articles/${this.props.match.params.handle}/${tag}`
    );
  };

  render() {
    const { article, loading } = this.props.article;
    const { classes } = this.props;
    let articleContent, articleTags;

    if (article.tags === undefined || article === null || loading) {
      articleContent = <LinearProgress />;
      articleTags = <LinearProgress />;
    } else {
      articleContent = (
        <div>
          <Card className={classes.cardGallery}>
            <ImageGallery items={article.photoLinks} />
          </Card>
          <Card className={classes.cardGallery} />
        </div>
      );
      articleTags = (
        <div>
          {article.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              className={classes.chip}
              onClick={this.openTagSite(tag)}
            />
          ))}
        </div>
      );
    }

    return (
      <div>
        <Card className={classes.card}>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.titleArticle}>
                  {article.title}
                </Typography>
                <Typography className={classes.textArticle}>
                  <div textalign="justify" m={1}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: article.text
                      }}
                    />
                  </div>
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                {articleContent}
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                {article.ytLinks !== undefined ? (
                  <YouTube id={article.ytLinks[0].yt} />
                ) : null}
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.tagsArticle}>
                  {articleTags}
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
        </Card>
      </div>
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
