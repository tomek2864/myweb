import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  Checkbox,
  TextField,
  Grid,
  FormHelperText,
  FormControlLabel,
  Button
} from "@material-ui/core";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { addEducation } from "../../actions/profileActions";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(1800 + theme.spacing.unit * 3 * 2)]: {
      width: 1800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit, // pomiedzy kolejnymi Paper
    marginBottom: theme.spacing.unit,
    display: "block",
    //flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 3}px` //up left-right down
  },
  textField: {
    width: "auto",
    display: "flex",
    margin: theme.spacing.unit
  },
  headerText: {
    textAlign: "center"
  },
  requireText: {
    textAlign: "right",
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

class CreateEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "2017-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
      current: false,
      description: "",
      errors: {},
      dsibale: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChangeFrom = date => {
    this.setState({ from: date });
  };

  handleDateChangeTo = date => {
    this.setState({ to: date });
  };

  checkChange = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state; // ES6
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <Link to="/dashboard">Powrót</Link>
                <Typography
                  className={classes.headerText}
                  variant="h3"
                  gutterBottom
                >
                  Zarzadzanie edukacją
                </Typography>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <Typography
                  className={classes.headerText}
                  variant="h5"
                  gutterBottom
                >
                  Uzupełnij poniższe informacje, dotyczące Twojej edukacji.
                </Typography>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <Typography
                  className={classes.requireText}
                  variant="body2"
                  gutterBottom
                >
                  * dane są wymagane
                </Typography>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="school"
                  label="* Nazwa szkoły"
                  placeholder="Nazwa szkoły"
                  className={classes.textField}
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Podaj nazwę szkoły.
                </FormHelperText>
                {errors.school && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="school-error"
                  >
                    {errors.school}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="degree"
                  label="Ocena"
                  placeholder="Ocena końcowa"
                  className={classes.textField}
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Ocena z ukończenia szkoły.
                </FormHelperText>
                {errors.degree && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="degree-error"
                  >
                    {errors.degree}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="fieldofstudy"
                  label="Kierunek"
                  placeholder="Profil"
                  className={classes.textField}
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Podaj na co były ukierunkowane zajęcia w szkole.
                </FormHelperText>
                {errors.fieldofstudy && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="fieldofstudy-error"
                  >
                    {errors.fieldofstudy}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>

            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <MuiPickersUtilsProvider
                  className={classes.dateField}
                  utils={DateFnsUtils}
                >
                  <DatePicker
                    keyboard
                    label="Data rozpoczęcia"
                    format="dd/MM/yyyy"
                    placeholder="10/10/2018"
                    mask={value =>
                      value
                        ? [
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/
                          ]
                        : []
                    }
                    value={this.state.from}
                    onChange={this.handleDateChangeFrom}
                    disableOpenOnEnter
                    animateYearScrolling={false}
                    margin="normal"
                    variant="outlined"
                    error={errors.from}
                  />
                  <DatePicker
                    keyboard
                    label="Data zakończenia"
                    format="dd/MM/yyyy"
                    placeholder="10/10/2018"
                    mask={value =>
                      value
                        ? [
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            "/",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/
                          ]
                        : []
                    }
                    value={this.state.to}
                    onChange={this.handleDateChangeTo}
                    disableOpenOnEnter
                    animateYearScrolling={false}
                    disabled={this.state.disabled ? "disabled" : ""}
                    margin="normal"
                    variant="outlined"
                    error={errors.to}
                  />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="current"
                      label="Aktualnie zatrudniony"
                      checked={this.state.current}
                      onChange={this.checkChange}
                      value={this.state.current}
                      color="primary"
                    />
                  }
                  label="Aktualnie zatrudniony"
                />

                <FormHelperText className={classes.helpText}>
                  Określ okres pracy w pracy.
                </FormHelperText>
                {errors.from && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="from-error"
                  >
                    {errors.from}
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
                  Zapisz
                </Button>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

CreateEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { addEducation }
  )(withStyles(styles)(CreateEducation))
);
