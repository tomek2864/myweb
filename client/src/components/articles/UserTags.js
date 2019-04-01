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
import Moment from "react-moment";

const styles = theme => ({
  card: {
    maxWidth: 1200,
    marginBottom: 70,
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
  },
  textArticle: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  },
  summaryArticle: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: ["Work Sans", "sans-serif"].join(",")
  },
  titleArticle: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: ["Alegreya SC", "serif"].join(",")
  },
  tagsArticle: {
    fontSize: 16
  },
  textNav: {
    fontSize: 28,
    color: "#010101",
    textAlign: "center",
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  }
});

class UserTags extends Component {
  componentDidMount() {
    this.props.getArticlesByTagUserHandle(
      this.props.match.params.handle,
      this.props.match.params.tag
    );
  }

  openTagSite = tag => () => {
    this.props.history.push(
      `/articles/${this.props.match.params.handle}/${tag}`
    );
  };

  render() {
    const { classes } = this.props;
    const { articles, loading_art } = this.props.article;
    let articleContent;
    //console.log(articles);
    if (articles === null || loading_art) {
      articleContent = <LinearProgress />;
    } else {
      articleContent = articles.map(article => (
        <Card className={classes.card}>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.titleArticle}>
                  {article.title}
                </Typography>
                <Typography className={classes.summaryArticle}>
                  {article.summary}
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
                <div>
                  <Card className={classes.cardGallery}>
                    {article.photoLinks[0] != "" ? (
                      <ImageGallery items={article.photoLinks} />
                    ) : (
                      {}
                    )}
                  </Card>
                  <Card className={classes.cardGallery} />
                </div>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                {article.ytLinks !== undefined && article.ytLinks != "" ? (
                  <YouTube id={article.ytLinks[0].yt} />
                ) : (
                  {}
                )}
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.tagsArticle}>
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
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
          <Grid container>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={7}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.summaryArticle}>
                  {article.name}{" "}
                  {<Moment format="HH:mm DD/MM/YYYY">{article.date}</Moment>}
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
          </Grid>
        </Card>
      ));
    }

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.textNav}>
              Projekty z kategorii: {this.props.match.params.tag}
            </Typography>
          </CardContent>
        </Card>
        {articleContent}
      </div>
    );
  }
}

UserTags.propTypes = {
  getArticlesByTagUserHandle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticlesByTagUserHandle }
)(withStyles(styles)(UserTags));
