import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button } from "@material-ui/core";
import Moment from "react-moment";
import { deleteArticle } from "../../actions/articleActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Articles extends Component {
  onDeleteClick(id) {
    this.props.deleteArticle(id, this.props.history);
  }
  onEditClick(id) {
    this.props.getArticleByID(id, this.props.history);
  }
  render() {
    const article = this.props.article.map(art => (
      <TableRow key={art._id}>
        <TableCell>{art.title}</TableCell>
        <TableCell>
          <Moment format="HH:mm DD/MM/YYYY">{art.date}</Moment>
        </TableCell>
        <TableCell>
          {art.tags.map((tag, index) => (
            <div key={index}> {tag} </div>
          ))}
        </TableCell>
        <TableCell>
          <Button
            component={Link}
            type="submit"
            variant="contained"
            color="primary"
            to={`/edit-articles/${art._id}`}
            //onClick={this.onEditClick.bind(this, art._id)}
          >
            Edytuj
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onDeleteClick.bind(this, art._id)}
          >
            Usuń
          </Button>
        </TableCell>
      </TableRow>
    ));
    return (
      <div>
        <Typography variant="h6">Artykuły</Typography>
        <TableHead>
          <TableRow>
            <TableCell>Tytuł</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Tagi</TableCell>
            <TableCell />
          </TableRow>
          {article}
        </TableHead>
      </div>
    );
  }
}

Articles.propTypes = {
  deleteArticle: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { deleteArticle }
  )(withStyles(styles)(Articles))
);
