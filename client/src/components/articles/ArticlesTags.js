import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";
import {
  Chip,
  Paper,
  TextField,
  Typography,
  NoSsr,
  MenuItem
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const suggestions = [
  { label: "Agile" },
  { label: "Amazon" },
  { label: "APIs" },
  { label: "Applications" },
  { label: "Architecture" },
  { label: "Autocad" },
  { label: "Azure" },
  { label: "Big Data" },
  { label: "C" },
  { label: "Cloud Applications" },
  { label: "Communication" },
  { label: "Configuration" },
  { label: "Database" },
  { label: "Data Mining" },
  { label: "Data Science" },
  { label: "Design" },
  { label: "Design Tools" },
  { label: "Development" },
  { label: "Front End Design" },
  { label: "Google Analytics" },
  { label: "Hardware" },
  { label: "Help Desk" },
  { label: "HTML" },
  { label: "Identify User Needs" },
  { label: "Implementation" },
  { label: "Information Architecture" },
  { label: "Internet" },
  { label: "IT Optimization" },
  { label: "IT Security" },
  { label: "IT Solutions" },
  { label: "IT Support" },
  { label: "Leadership" },
  { label: "Linux" },
  { label: "Management" },
  { label: "Microsoft Office" },
  { label: "Mobile Applications" },
  { label: "Motivation" },
  { label: "Networks" },
  { label: "Network Operations" },
  { label: "Node.js" },
  { label: "Operating Systems" },
  { label: "PHP" },
  { label: "Programming" },
  { label: "Problem Solving" },
  { label: "Product Design" },
  { label: "Product Management" },
  { label: "Responsive Design" },
  { label: "Search Engine Optimization (SEO)" },
  { label: "Security" },
  { label: "Servers" },
  { label: "Software" },
  { label: "Software Development" },
  { label: "Software Engineering" },
  { label: "UI / UX" },
  { label: "Virtualization" },
  { label: "Web Applications" },
  { label: "Web Development" },
  { label: "Web Technologies" },
  { label: "Embeeded systems" },
  { label: "Automation technology" },
  { label: "Beckhoff" },
  { label: "SCADA" },
  { label: "InduSoft" },
  { label: "Electronics" },
  { label: "Electrics" },
  { label: "Automotive" },
  { label: "Robots" },
  { label: "KUKA" },
  { label: "Industry" },
  { label: "Qt" },
  { label: "JavaScript" },
  { label: "React" },
  { label: "VisualStudio Code" },
  { label: "C++" },
  { label: "Raspberry Pi" },
  { label: "Windows" },
  { label: "Expo" },
  { label: "Motion" },
  { label: "STM32" },
  { label: "Eclipse" },
  { label: "ARM" },
  { label: "Armbian" },
  { label: "University" },
  { label: "Green Energy" },
  { label: "Express" },
  { label: "C#" },
  { label: "OOP" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  card: {
    background: "#f2f2f2",
    maxWidth: 1000,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px"
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

//https://codesandbox.io/s/1q869myzz4
const ArticlesTags = ({ value }) => {
  const selectStyles = {
    input: base => ({
      ...base,
      color: "#f2f2f2",
      "& input": {
        font: "inherit"
      }
    })
  };
  return (
    <div>
      <NoSsr>
        <Select
          textFieldProps={{
            label: "Kategoria artykułu",
            InputLabelProps: {
              shrink: true
            }
          }}
          styles={selectStyles}
          options={suggestions}
          components={components}
          value={value}
          onChange={this.handleChange("multi")}
          placeholder="Wybierz przynajmniej jedną kategorię artykułu"
          isMulti
        />
      </NoSsr>
    </div>
  );
};

ArticlesTags.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired
};

export default withStyles(styles)(ArticlesTags);
