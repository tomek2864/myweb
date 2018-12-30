import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { loginUser } from "../../actions/authActions";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Typography,
  Paper,
  FormHelperText
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const styles = theme => ({
  checkbox: {
    "&$checked": {
      color: "#242249"
    }
  },
  checked: {},
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(420 + theme.spacing.unit * 3 * 2)]: {
      width: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#242249"
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 19,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#242249",
    borderColor: "#242249",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#242249",
      borderColor: "#c1ff75"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#13190c",
      borderColor: "#c1ff75"
    },
    "&:focus": {
      boxShadow: "none",
      color: "#ff795e"
    }
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#242249"
    }
  },
  cssFocused: {},
  cssUnderline: {
    borderBottom: "2px solid white",
    "&:after": {
      borderBottomColor: "#242249"
    }
  },
  cssUnderlineErrorState: {
    "&:after": {
      borderBottomColor: "#ff0000"
    }
  },
  formHelperText: {
    color: "#ff0000"
  }
});

//Migracja do typography, od wersji v4.0.0 i będzie juz starej wersji
//https://material-ui.com/style/typography/#migration-to-typography-v2
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper} onSubmit={this.onSubmit}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Logowanie</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" fullWidth>
                <InputLabel
                  classes={{
                    root: classes.cssLabel
                    //focused: classes.cssFocused
                  }}
                  htmlFor="email"
                >
                  Adres email
                </InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  autoFocus
                  className={classNames(classes.cssUnderline, {
                    [classes.cssUnderlineErrorState]: errors.email
                  })}
                />
                {errors.email && (
                  <FormHelperText
                    className={classes.formHelperText}
                    id="email-error"
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel
                  classes={{
                    root: classes.cssLabel
                    //focused: classes.cssFocused
                  }}
                  htmlFor="password"
                >
                  Hasło
                </InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  autoComplete="current-password"
                  className={classNames(classes.cssUnderline, {
                    [classes.cssUnderlineErrorState]: errors.password
                  })}
                />
                {errors.password && (
                  <FormHelperText
                    className={classes.formHelperText}
                    id="password-error"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checked
                    }}
                    value="remember"
                    color="primary"
                  />
                }
                label="Zapamiętaj hasło"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Zaloguj
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
