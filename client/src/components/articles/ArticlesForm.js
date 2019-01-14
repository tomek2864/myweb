import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addArticle } from "../../actions/articleActions";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  FormHelperText
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    width: "auto",
    display: "flex",
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  },
  helpText: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  },
  helpTextError: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex",
    color: "#ff0000"
  },
  submit: {
    margin: theme.spacing.unit,
    width: "auto",
    display: "flex"
  }
});

class ArticlesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tags: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;
    const newArticle = {
      text: this.state.text,
      name: user.name
    };

    this.props.addArticle(newArticle);
    this.setState({ text: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state; // ES6
    return (
      <div>
        <Grid container>
          <Grid className={classes.grid} item xs />
          <Grid className={classes.grid} item xs={8}>
            <TextField
              name="text"
              label="Utwórz artykuł"
              placeholder="Opis"
              multiline
              rowsMax="8"
              className={classes.textField}
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <FormHelperText className={classes.helpText}>
              Treść artykułu.
            </FormHelperText>
            {errors.text && (
              <FormHelperText className={classes.helpTextError} id="text-error">
                {errors.text}
              </FormHelperText>
            )}
          </Grid>
          <Grid className={classes.grid} item xs />
        </Grid>
        <Grid container>
          <Grid className={classes.grid} item xs />
          <Grid className={classes.grid} item xs={8}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Dodaj
            </Button>
          </Grid>
          <Grid className={classes.grid} item xs />
        </Grid>
      </div>
    );
  }
}

//https://material-ui.com/demos/autocomplete/

ArticlesForm.propTypes = {
  addArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addArticle }
)(withStyles(styles)(ArticlesForm));
