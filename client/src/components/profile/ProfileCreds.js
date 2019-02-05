import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";

const styles = theme => ({
  root: {
    width: "100%"
  },
  card: {
    background: "#f2f2f2",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px",
    textAlign: "justify"
  },
  cardContent: {
    color: "#242249",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px"
  },
  typograhyTitle: {
    padding: "5px 5px",
    fontSize: 22
  },
  typograhyContent: {
    padding: "5px 5px",
    fontSize: 14,
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  grid: {
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
    const { profileCreds } = this.props;
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
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograhyTitle}>
              Edukcja i doświadczenie zawodowe
            </Typography>
            {expItems.length > 0 ? expItems : <p>Brak doświadczenia</p>}
            <Grid className={classes.grid} />
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograhyTitle}>
              Edukcja i doświadczenie zawodowe
            </Typography>
            {eduItems.length > 0 ? eduItems : <p>Brak edukacji</p>}
            <Grid className={classes.grid} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileCreds);
