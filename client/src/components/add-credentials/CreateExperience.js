import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  FormControl,
  Checkbox,
  TextField,
  Grid,
  FormControlLabel,
  OutlinedInput,
  MenuItem,
  FormHelperText,
  Button
} from "@material-ui/core";

import { DatePicker } from "material-ui-pickers";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { addExperience } from "../../actions/profileActions";

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
  dateField: {
    width: "auto",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  checkChange = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
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
                {errors.company && (
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
                {errors.title && (
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
                {errors.location && (
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
                <DatePicker
                  id="from"
                  margin="normal"
                  label="Date picker"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                <TextField
                  id="from"
                  label="Data rozpoczęcia"
                  type="date"
                  defaultValue="2010-01-01"
                  className={classes.dateField}
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                />

                <TextField
                  id="to"
                  label="Data zakończenia"
                  type="date"
                  defaultValue="2010-01-01"
                  className={classes.dateField}
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  disabled={this.state.disabled ? "disabled" : ""}
                  InputLabelProps={{
                    shrink: true
                  }}
                />

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

CreateExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
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
    { addExperience }
  )(withStyles(styles)(CreateExperience))
);
