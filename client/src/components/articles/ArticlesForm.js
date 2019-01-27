import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addArticle } from "../../actions/articleActions";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Button,
  Input,
  InputLabel,
  Select,
  Grid,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";

const chooseTags = [
  "Agile",
  "Amazon",
  "APIs",
  "Applications",
  "Architecture",
  "Autocad",
  "Azure",
  "Big Data",
  "C",
  "Cloud Applications",
  "Communication",
  "Configuration",
  "Database",
  "Data Mining",
  "Data Science",
  "Design",
  "Design Tools",
  "Development",
  "Front End Design",
  "Google Analytics",
  "Hardware",
  "Help Desk",
  "HTML",
  "Identify User Needs",
  "Implementation",
  "Information Architecture",
  "Internet",
  "IT Optimization",
  "IT Security",
  "IT Solutions",
  "IT Support",
  "Leadership",
  "Linux",
  "Management",
  "Microsoft Office",
  "Mobile Applications",
  "Motivation",
  "Networks",
  "Network Operations",
  "Node.js",
  "Operating Systems",
  "PHP",
  "Programming",
  "Problem Solving",
  "Product Design",
  "Product Management",
  "Responsive Design",
  "Search Engine Optimization (SEO)",
  "Security",
  "Servers",
  "Software",
  "Software Development",
  "Software Engineering",
  "UI / UX",
  "Virtualization",
  "Web Applications",
  "Web Development",
  "Web Technologies",
  "Embeeded systems",
  "Automation technology",
  "Beckhoff",
  "SCADA",
  "InduSoft",
  "Electronics",
  "Electrics",
  "Automotive",
  "Robots",
  "KUKA",
  "Industry",
  "Qt",
  "JavaScript",
  "React",
  "VisualStudio Code",
  "C++",
  "Raspberry Pi",
  "Windows",
  "Expo",
  "Motion",
  "STM32",
  "Eclipse",
  "ARM",
  "Armbian",
  "University",
  "Green Energy",
  "Express",
  "C#",
  "OOP"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

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

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class ArticlesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      tags: [],
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
      title: this.state.title,
      text: this.state.text,
      name: user.name,
      tags: this.state.tags.toString()
    };
    this.props.addArticle(newArticle);
    // this.setState({ text: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeTag = event => {
    this.setState({ tags: event.target.value });
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
              name="title"
              label="Tytuł artykułu"
              placeholder="Tytuł"
              className={classes.textField}
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
              margin="normal"
              variant="outlined"
              fullWidth
            />
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
              name="text"
              label="Treść artykułu"
              placeholder="Opis"
              multiline
              rowsMax="30"
              className={classes.textField}
              value={this.state.text}
              onChange={this.onChange}
              error={errors.text}
              margin="normal"
              variant="outlined"
              fullWidth
            />
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
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
              <Select
                multiple
                value={this.state.tags}
                onChange={this.onChangeTag}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(", ")}
                MenuProps={MenuProps}
                error={errors.tags}
              >
                {chooseTags.map(tag => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={this.state.tags.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
              {errors.tags && (
                <FormHelperText
                  className={classes.helpTextError}
                  id="tags-error"
                >
                  {errors.tags}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>{" "}
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
