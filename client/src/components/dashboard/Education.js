import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography, Button } from "@material-ui/core";
import Moment from "react-moment";
import { delEducation } from "../../actions/profileActions";
import { withStyles } from "@material-ui/core/styles";

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

class Education extends Component {
  onDeleteClick(id) {
    this.props.delEducation(id, this.props.history);
  }

  render() {
    const education = this.props.education.map(edu => (
      <TableRow key={edu._id}>
        <TableCell>{edu.school}</TableCell>
        <TableCell>{edu.fieldofstudy}</TableCell>
        <TableCell>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Aktualnie"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.onDeleteClick.bind(this, edu._id)}
          >
            Usuń
          </Button>
        </TableCell>
      </TableRow>
    ));
    return (
      <div>
        <Typography variant="h6">Edukacja</Typography>
        <TableHead>
          <TableRow>
            <TableCell>Szkoła</TableCell>
            <TableCell>Kierunek</TableCell>
            <TableCell>Okres nauki</TableCell>
            <TableCell />
          </TableRow>
          {education}
        </TableHead>
      </div>
    );
  }
}

Education.propTypes = {
  delEducation: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { delEducation }
  )(withStyles(styles)(Education))
);
