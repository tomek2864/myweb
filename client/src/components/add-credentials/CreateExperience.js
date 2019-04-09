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
  FormControlLabel,
  FormHelperText,
  Button
} from "@material-ui/core";

import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { addExperience } from "../../actions/profileActions";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import { DatePicker } from "material-ui-pickers";

import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleToolbar, {
  getBlockStyle
} from "../blockStylesRichFieldText/BlockStyleToolbar";

import { mediaBlockRenderer } from "../blockStylesRichFieldText/entities/mediaBlockRenderer";

import { stateToHTML } from "draft-js-export-html";

const styles = theme => ({
  layout: {
    maxWidth: 1200,
    marginBottom: 25,
    marginTop: 70,
    /* marginLeft: "auto",
    marginRight: "auto", */
    display: "block", // Fix IE11.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(1800 + theme.spacing.unit * 3 * 2)]: {
      width: 1800
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
  },
  paperEditor: {
    minHeight: "400px",
    width: "auto",
    margin: theme.spacing.unit
  },
  editors: {
    padding: 25
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class CreateExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      company: "",
      title: "",
      location: "",
      from: "2017-01-01T00:00:00.000Z",
      to: "2018-01-01T00:00:00.000Z",
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

  handleDateChangeFrom = date => {
    this.setState({ from: date });
  };

  toggleBlockType = blockType => {
    this.onChangeEditor(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChangeEditor(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = event => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "BOLD")
    );
  };

  onItalicClick = () => {
    this.onChangeEditor(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  toggleBlockType = blockType => {
    this.onChangeEditor(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  handleDateChangeTo = date => {
    this.setState({ to: date });
  };

  onChangeEditor = editorState => {
    this.setState({ editorState });
  };

  focus = () => this.refs.editor.focus();

  onSubmit = e => {
    e.preventDefault();
    if (this.state.current === true) {
      const expData = {
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.from,
        to: "",
        current: this.state.current,
        description: stateToHTML(this.state.editorState.getCurrentContent())
      };
      this.props.addExperience(expData, this.props.history);
    } else {
      const expData = {
        company: this.state.company,
        title: this.state.title,
        location: this.state.location,
        from: this.state.from,
        to: this.state.to,
        current: this.state.current,
        description: stateToHTML(this.state.editorState.getCurrentContent())
      };
      this.props.addExperience(expData, this.props.history);
    }
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
                {/* <TextField
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
                /> */}

                <MuiPickersUtilsProvider
                  className={classes.dateField}
                  utils={DateFnsUtils}
                >
                  <DatePicker
                    keyboard
                    label="Data rozpoczęcia"
                    format="dd/MM/yyyy"
                    placeholder="10/10/2018"
                    // handle clearing outside => pass plain array if you are not controlling value outside
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
                    // handle clearing outside => pass plain array if you are not controlling value outside
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

                {/* <TextField
                  id="to"
                  label="Data zakończenia"
                  type="date"
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
                /> */}

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
            {/* <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <TextField
                  name="description"
                  label="Opis stanowiska"
                  placeholder="Opis"
                  multiline
                  rowsMax="8"
                  className={classes.textField}
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <FormHelperText className={classes.helpText}>
                  Opis stanowiska pracy.
                </FormHelperText>
                {errors.description && (
                  <FormHelperText
                    className={classes.helpTextError}
                    id="description-error"
                  >
                    {errors.description}
                  </FormHelperText>
                )}
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid> */}

            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <div className="editorContainer">
                  <div className="toolbar">
                    <BlockStyleToolbar
                      editorState={this.state.editorState}
                      onToggle={this.toggleBlockType}
                    />
                    <Button onClick={this.onUnderlineClick}>U</Button>
                    <Button onClick={this.onBoldClick}>
                      <b>B</b>
                    </Button>
                    <Button onClick={this.onItalicClick}>
                      <em>I</em>
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid className={classes.grid} item xs />
            </Grid>

            <Grid container>
              <Grid className={classes.grid} item xs />
              <Grid className={classes.grid} item xs={8}>
                <Paper className={classes.paperEditor}>
                  <div>
                    <Editor
                      className={classes.editors}
                      name="description"
                      blockRendererFn={mediaBlockRenderer}
                      blockStyleFn={getBlockStyle}
                      editorState={this.state.editorState}
                      handleKeyCommand={this.handleKeyCommand}
                      onChange={this.onChangeEditor}
                      plugins={this.plugins}
                      ref="editor"
                      value={this.state.text}
                      rowsMax="30"
                      error={errors.text}
                      spellCheck
                    />
                  </div>
                </Paper>
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
