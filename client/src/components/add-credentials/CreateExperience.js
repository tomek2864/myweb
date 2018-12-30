import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
  FormHelperText,
  Button
} from "@material-ui/core";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";

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

class CreateExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
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
                  Zarzadzanie doświadczeniem zawodowym
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
                  Uzupełnij poniższe informacje, dotyczące Twojego doświadczenia
                  zawodowego
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
                  name="company"
                  label="* Nazwa firmy"
                  placeholder="Nazwa firmy"
                  className={classes.textField}
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Podaj nazwę firmy.
                </FormHelperText>
                {errors.handle && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="company-error"
                  >
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="title"
                  label="Stanowisko"
                  placeholder="Jakie stanowisko?"
                  className={classes.textField}
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Nazwa stanowiska pełnionego w firmie.
                </FormHelperText>
                {errors.handle && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="title-error"
                  >
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="location"
                  label="Lokalizacja"
                  placeholder="Miejsce pracy"
                  className={classes.textField}
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Miejscowość gdzie znajduje się firma.
                </FormHelperText>
                {errors.handle && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="location-error"
                  >
                    {errors.location}
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

CreateExperience.propTypes = {
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
    { CreateExperience }
  )(withStyles(styles)(CreateExperience))
);
