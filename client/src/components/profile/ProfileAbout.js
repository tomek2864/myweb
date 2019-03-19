import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  contentCard: {
    maxWidth: 800,
    alignItems: "center"
  },
  typograhyTitle: {
    padding: "5px 5px",
    fontSize: 22,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  },
  typograhyContent: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  },
  grid: {
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
});

class ProfileAbout extends Component {
  render() {
    const { classes } = this.props;
    const { profileAbout } = this.props;
    return (
      <div>
        <CardContent className={classes.contentCard}>
          <Typography className={classes.typograhyTitle}>O mnie</Typography>
          <Grid className={classes.grid} item xs>
            <Typography className={classes.typograhyContent}>
              Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
              przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
              przez nieznanego drukarza do wypełnienia tekstem próbnej książki.
              Pięć wieków później zaczął być używany przemyśle elektronicznym,
              pozostając praktycznie niezmienionym. Spopularyzował się w latach
              60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających
              fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje
              Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na
              komputerach osobistych, jak Aldus PageMaker
            </Typography>
          </Grid>
        </CardContent>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileAbout);
