import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Chip
} from "@material-ui/core";

import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";

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
  }
});

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: convertFromRaw(JSON.parse(this.props.article.text))
    };
  }
  handleClick = data => () => {
    alert(data);
  };

  componentDidMount() {
    console.log(this.state.editorState);
  }

  render() {
    const { classes, article, auth } = this.props;
    // Skill List
    const tags = article.tags.map((tag, index) => (
      <Chip
        key={index}
        label={tag}
        className={classes.chip}
        onClick={this.handleClick(tag)}
      />
    ));

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.nameArticle}>
            {article.title}
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              {/* <Typography className={classes.textArticle}>
                {textDisplay}
              </Typography> */}

              <Editor editorState={this.state.editorState} readOnly />
            </CardContent>
          </Card>
          {tags}
        </CardContent>
      </Card>
    );
  }
}

ArticleItem.PropTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(ArticleItem));
