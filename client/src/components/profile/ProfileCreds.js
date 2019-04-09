import React, { Component } from "react";
import {
  CardContent,
  Typography,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";

const styles = theme => ({
  root: {
    width: "100%"
  },
  contentCard: {
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  typograhyTitle: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  },
  typograhyContent: {
    padding: "5px 5px",
    fontSize: 14,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(","),
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  textDescription: {}
});

class ProfileCreds extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <ExpansionPanel
        key={exp._id}
        expanded={expanded === exp.company}
        onChange={this.handleChange(exp.company)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{exp.company}</Typography>
          <Typography className={classes.secondaryHeading}>
            {exp.title}
          </Typography>
          <Typography className={classes.thirdHeading}>
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              "Aktualnie"
            ) : (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            )}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography textAlign="justify" className={classes.textDescription}>
            <div
              dangerouslySetInnerHTML={{
                __html: exp.description
              }}
            />
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    const eduItems = education.map(edu => (
      <ExpansionPanel
        key={edu._id}
        expanded={expanded === edu.school}
        onChange={this.handleChange(edu.school)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{edu.school}</Typography>
          <Typography className={classes.secondaryHeading}>
            {edu.fieldofstudy}
          </Typography>
          <Typography className={classes.thirdHeading}>
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
            {edu.to === null ? (
              "Aktualnie"
            ) : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            noWrap
            textAlign="justify"
            className={classes.textDescription}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: edu.description
              }}
            />
            {"Ocena końcowa: "}
            {edu.degree}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    return (
      <Grid container>
        <Grid className={classes.grid} item xs />
        <Grid className={classes.grid} item xs={11}>
          <CardContent className={classes.contentCard}>
            <Typography className={classes.typograhyTitle}>
              Doświadczenie
            </Typography>
            {expItems.length > 0 ? expItems : <p>Brak doświadczenia</p>}
          </CardContent>
          <CardContent className={classes.contentCard}>
            <Typography className={classes.typograhyTitle}>Edukcja</Typography>
            {eduItems.length > 0 ? eduItems : <p>Brak edukacji</p>}
          </CardContent>
        </Grid>
        <Grid className={classes.grid} item xs />
      </Grid>
    );
  }
}

export default withStyles(styles)(ProfileCreds);
