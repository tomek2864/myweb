import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleItem from "./ArticleItem";

class ArticlesFeed extends Component {
  render() {
    const { articles } = this.props;

    return articles.map(article => (
      <ArticleItem key={article._id} article={article} />
    ));
  }
}

ArticlesFeed.PropTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesFeed;
