import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button } from "@material-ui/core";
import Moment from "react-moment";
import { delExperience } from "../../actions/profileActions";

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

class Experience extends Component {
  onDeleteClick(id) {
    this.props.delExperience(id, this.props.history);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <TableRow key={exp._id}>
        <TableCell>{exp.company}</TableCell>
        <TableCell>{exp.title}</TableCell>
        <TableCell>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Aktualnie"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onDeleteClick.bind(this, exp._id)}
          >
            Usuń
          </Button>
        </TableCell>
      </TableRow>
    ));
    return (
      <div>
        <Typography variant="h6">Doświadczenie</Typography>
        <TableHead>
          <TableRow>
            <TableCell>Firma</TableCell>
            <TableCell>Tytuł</TableCell>
            <TableCell>Okres pracy</TableCell>
            <TableCell />
          </TableRow>
          {experience}
        </TableHead>
      </div>
    );
  }
}

Experience.propTypes = {
  delExperience: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { delExperience }
  )(withStyles(styles)(Experience))
);
