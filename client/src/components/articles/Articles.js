import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleForm from "./ArticlesForm";
import ArticlesFeed from "./ArticlesFeed";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, LinearProgress } from "@material-ui/core";
import { getArticle } from "../../actions/articleActions";

const styles = {
  card: {
    maxWidth: 1200,
    marginBottom: 70,
    marginTop: 90,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#EEE"
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
  componentDidMount() {
    this.props.getArticle();
  }

  render() {
    const { articles, loading } = this.props.article;
    let articleContent;

    if (articles === null || loading) {
      articleContent = <LinearProgress />;
    } else {
      articleContent = <ArticlesFeed articles={articles} />;
    }

    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <h1 style={{ textAlign: "center" }}>Utwórz nowy artykul</h1>
          <ArticleForm />
          {articleContent}
        </CardContent>
      </Card>
    );
  }
}

Articles.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getArticle }
)(withStyles(styles)(Articles));
