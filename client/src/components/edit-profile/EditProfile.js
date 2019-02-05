import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

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

//Migracja do typography, od wersji v4.0.0 i będzie juz starej wersji
//https://material-ui.com/style/typography/#migration-to-typography-v2
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubusername: "",
      linkedin: "",
      errors: {},
      labelWidth: 0
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      /*profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";*/

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        githubusername: profile.githubusername,
        status: profile.status,
        bio: profile.bio,
        //linkedin: profile.linkedin,

        skills: skillsCSV //!
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <Typography
                  className={classes.headerText}
                  variant="h2"
                  gutterBottom
                >
                  Tworzenie profilu
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
                  Uzupełnij poniższe informacje, dotyczące Twojego profilu.
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
                  name="handle"
                  label="* Twoj handler"
                  placeholder="Handler"
                  className={classes.textField}
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Handler jest unikatową nazwą Twojego profilu, dzięki któremu
                  będzie można utworzyć wygodny adres URL.
                </FormHelperText>
                {errors.handle && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="handle-error"
                  >
                    {errors.handle}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  id="status"
                  fullWidth
                >
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-status"
                  >
                    * Wybierz swój status
                  </InputLabel>
                  <Select
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    error={errors.status}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="status"
                        id="outlined-status"
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>Brak</em>
                    </MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Etat">Zatrudniony na etacie</MenuItem>
                    <MenuItem value="Freelander">Freelander</MenuItem>
                    <MenuItem value="Bezrobotny">Bezrobotny</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText className={classes.helpText}>
                  Wybierz aktualny swój aktualny status zawodowy.
                </FormHelperText>
                {errors.status && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="status-error"
                  >
                    {errors.status}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="company"
                  id="company"
                  label="Firma w ktorej pracujesz"
                  placeholder="Firma"
                  className={classes.textField}
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Nazwa firmy w której jesteś aktualnie zatrudniony, albo firma
                  dla której aktualnie wykonujesz zlecenia.
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
                  name="website"
                  id="website"
                  label="Adres strony internetowej"
                  placeholder="Strona internetowa"
                  className={classes.textField}
                  value={this.state.website}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Jeśli posiadasz strone internetową możesz ją tutaj umieścić.
                </FormHelperText>
                {errors.website && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="website-error"
                  >
                    {errors.website}
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
                  id="location"
                  label="Twoja lokalizacja"
                  placeholder="Lokalizacja"
                  className={classes.textField}
                  value={this.state.location}
                  onChange={this.onChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Lokalizacja w której mieszkasz lub szukasz pracy.
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
                <TextField
                  name="skills"
                  id="skills"
                  label="Podaj swoje umiejętności"
                  placeholder="Umiejętności"
                  className={classes.textField}
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Wypisz jakie umiejętności posiadasz np. PHP, JS, CSS
                </FormHelperText>
                {errors.skills && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="skills-error"
                  >
                    {errors.skills}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="githubusername"
                  label="Adres profilu Github"
                  placeholder="Github"
                  className={classes.textField}
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Jeśli posiadasz konto na github, tutaj możesz podać adres do
                  swojego profilu.
                </FormHelperText>
                {errors.githubusername && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="githubusername-error"
                  >
                    {errors.githubusername}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>
            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="bio"
                  label="Twoja biografia"
                  placeholder="Biografia"
                  className={classes.textField}
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  multiline
                />
                <FormHelperText className={classes.helpText}>
                  Napisz pare zdań o sobie.
                </FormHelperText>
                {errors.bio && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="bio-error"
                  >
                    {errors.bio}
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
                  Zaloguj
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
    { createProfile, getCurrentProfile }
  )(withStyles(styles)(CreateProfile))
);

// export default connect(
//   mapStateToProps,
//   {}
// )(withStyles(styles)(CreateProfile));
