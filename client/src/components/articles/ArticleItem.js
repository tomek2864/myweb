import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import Moment from "react-moment";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Chip,
  Paper
} from "@material-ui/core";

import { stateFromHTML } from "draft-js-import-html";
//import { unstable_Box as Box } from "@material-ui/core/Box";

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
  cardBackground: {
    maxWidth: 1000,
    marginBottom: 25,
    marginTop: 25,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#4f6832"
  }
});

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //editorState: convertFromRaw(this.props.article.text)
    };
  }
  handleClick = data => () => {
    alert(data);
  };

  componentDidMount() {
    console.log(this.props.article.text);
    //const editorState = convertFromRaw(this.props.article.text);
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
      <Card className={classes.cardBackground}>
        <CardContent>
          <Card className={classes.cardText}>
            <Typography className={classes.nameArticle}>
              {article.title}
            </Typography>
          </Card>
          {tags}
        </CardContent>
        <CardContent>
          <Card className={classes.cardText}>
            <Typography textAlign="justify" className={classes.textArticle}>
              <div textalign="justify" m={1}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.props.article.text
                  }}
                />
              </div>
            </Typography>
          </Card>
          {article.name}{" "}
          {<Moment format="HH:mm DD/MM/YYYY">{article.date}</Moment>}
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
