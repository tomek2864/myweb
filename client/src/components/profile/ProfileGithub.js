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
  card: {
    background: "#f2f2f2",
    maxWidth: 1000,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0px 0px 0px 0px",
    paddingBottom: "0px"
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
  }
});

class ProfileGithub extends Component {
  render() {
    const { classes } = this.props;
    const { profileGithub } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograhyTitle}>Nagłówek</Typography>
            <Grid className={classes.grid} item xs>
              <Typography className={classes.typograhyContent}>
                Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz
                w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w.
                przez nieznanego drukarza do wypełnienia tekstem próbnej
                książki. Pięć wieków później zaczął być używany przemyśle
                elektronicznym, pozostając praktycznie niezmienionym.
                Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy
                Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z
                zawierającym różne wersje Lorem Ipsum oprogramowaniem
                przeznaczonym do realizacji druków na komputerach osobistych,
                jak Aldus PageMaker
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileGithub);
