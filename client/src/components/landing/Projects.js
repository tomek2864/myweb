import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import arm from "../../img/loga/arm.png";
import armbian from "../../img/loga/armbian.png";
import atmel from "../../img/loga/atmel.png";
import beckhoff from "../../img/loga/beckhoff.png";
import eagle from "../../img/loga/eagle.png";
import es6 from "../../img/loga/es6.png";
import indusoft from "../../img/loga/indusoft.png";
import kuka from "../../img/loga/kuka.png";
import mongodb from "../../img/loga/mongodb.png";
import nodejs from "../../img/loga/nodejs.png";
import nxp from "../../img/loga/nxp.png";
import qt from "../../img/loga/qt.png";
import react from "../../img/loga/react.png";
import rpi from "../../img/loga/rpi.png";
import { withRouter, Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  GridList,
  GridListTile,
  CardMedia,
  CardActionArea,
  Slide,
  Grow,
  Paper
} from "@material-ui/core";
import posed from "react-pose";

const BoxElectronic = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#14cba8"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const BoxAutomation = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#37474f"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const BoxWeb = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#2196f3"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const BoxEmbedded = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#6d4c41"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const BoxRobotics = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#ff6f00"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const BoxOther = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#ff616f"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#f1f1f1"
  }
});

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  box: {
    width: "auto",
    cursor: "default",
    [theme.breakpoints.down("md")]: {
      height: 350
    },
    [theme.breakpoints.up("md")]: {
      height: 325
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  gridFull: {
    width: "100%"
  },
  grid: {
    display: "inline"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing.unit
  },
  typoTitle: {
    textAlign: "center",
    [theme.breakpoints.down("lg")]: {
      fontSize: 20,
      padding: "10px 5px 5px 0px"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 35,
      padding: "50px 10px 10px 0px"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
      padding: "10px 5px 5px 0px"
    }
  },
  typoInfo: {
    textAlign: "justify",
    [theme.breakpoints.down("lg")]: {
      fontSize: 13,
      padding: "0px 12px 0px 10px"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
      padding: "0px 35px 0px 25px"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
      padding: "0px 25px 0px 25px"
    }
  },
  imageInfo: {
    [theme.breakpoints.down("lg")]: {
      maxHeight: 0
    },
    [theme.breakpoints.up("lg")]: {
      padding: "25px 25px",
      maxHeight: 40
    }
  },
  imagePosition: {
    textAlign: "center"
  }
});

class Projects extends Component {
  state = {
    moveInElectronic: false,
    moveInAutomation: false,
    moveInWeb: false,
    moveInEmbedded: false,
    moveInRobotics: false,
    moveInOther: false
  };

  onMoveInElectronic = () => {
    this.setState(state => ({ moveInElectronic: true }));
  };
  onMoveOutElectronic = () => {
    this.setState(state => ({ moveInElectronic: false }));
  };

  onMoveInAutomation = () => {
    this.setState(state => ({ moveInAutomation: true }));
  };
  onMoveOutAutomation = () => {
    this.setState(state => ({ moveInAutomation: false }));
  };

  onMoveInWeb = () => {
    this.setState(state => ({ moveInWeb: true }));
  };
  onMoveOutWeb = () => {
    this.setState(state => ({ moveInWeb: false }));
  };

  onMoveInEmbedded = () => {
    this.setState(state => ({ moveInEmbedded: true }));
  };
  onMoveOutEmbedded = () => {
    this.setState(state => ({ moveInEmbedded: false }));
  };

  onMoveInRobotics = () => {
    this.setState(state => ({ moveInRobotics: true }));
  };

  onMoveOutRobotics = () => {
    this.setState(state => ({ moveInRobotics: false }));
  };

  onMoveInOther = () => {
    this.setState(state => ({ moveInOther: true }));
  };

  onMoveOutOther = () => {
    this.setState(state => ({ moveInOther: false }));
  };

  openTagSite = tag => () => {
    this.props.history.push(`/articles/tomek/${tag}`);
  };

  render() {
    const { classes } = this.props;
    const { articles } = this.props;
    const {
      moveInElectronic,
      moveInAutomation,
      moveInWeb,
      moveInEmbedded,
      moveInRobotics,
      moveInOther
    } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs wrap="nowrap">
            <Paper
              onMouseMove={this.onMoveInElectronic}
              onMouseOut={this.onMoveOutElectronic}
              onClick={this.openTagSite("electronic")}
            >
              <BoxElectronic className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Elektronika</div>
                  <Grow
                    in={moveInElectronic}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInElectronic ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Projektowanie ukladow elektronicznych z wykorzystaniem
                      mikrokontrolerow, rzadziej uklady czysto analogowe.
                      Schematy PCB dla plytek dwuwarstwowych, testowanie,
                      lutowanie. Posiadam tez doswiadczenie w odtwarzaniu
                      funkcjonalnosci istniejacych, czesto uszkodzonych
                      urzadzen.{" "}
                      <div className={classes.imagePosition}>
                        <img className={classes.imageInfo} src={eagle} />
                      </div>
                    </div>
                  </Grow>
                </>
              </BoxElectronic>
            </Paper>
          </Grid>
          <Grid item xs={6} wrap="nowrap">
            <Paper
              onMouseMove={this.onMoveInAutomation}
              onMouseOut={this.onMoveOutAutomation}
              onClick={this.openTagSite("automation")}
            >
              <BoxAutomation className={classes.box}>
                <>
                  <div className={classes.typoTitle}>
                    Automatyka Przemysłowa
                  </div>
                  <Grow
                    in={moveInAutomation}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInAutomation ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Wykonuje sterowana dla urzadzen przemyslowych oraz
                      projekty schematow elektrycznych. Dobor aparatury
                      elektrycznej, urzadzen wykonawczych, napedow, czujnikow.
                      <div className={classes.imagePosition}>
                        <img className={classes.imageInfo} src={beckhoff} />
                        <img className={classes.imageInfo} src={indusoft} />
                      </div>
                    </div>
                  </Grow>
                </>
              </BoxAutomation>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0} wrap="nowrap">
          <Grid item xs>
            <Paper
              onMouseMove={this.onMoveInWeb}
              onMouseOut={this.onMoveOutWeb}
              onClick={this.openTagSite("web")}
            >
              <BoxWeb className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Technologie Webowe</div>
                  <Grow
                    in={moveInWeb}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInWeb ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Wykonuje aplikacje internetowe z wykorzystaniem MERN Stack
                      - MongoDB, Express, React, Node.js. Aplikacje te pisane sa
                      w JavaScript z wykorzystaniem standardu ECMAScript 6.
                      Grafiki przygotowuje w Photoshopie.
                      <div className={classes.imagePosition}>
                        <img className={classes.imageInfo} src={es6} />
                        <img className={classes.imageInfo} src={mongodb} />
                        <img className={classes.imageInfo} src={react} />
                        <img className={classes.imageInfo} src={nodejs} />
                      </div>
                    </div>
                  </Grow>
                </>
              </BoxWeb>
            </Paper>
          </Grid>
          <Grid item xs={6} wrap="nowrap">
            <Paper
              onMouseMove={this.onMoveInEmbedded}
              onMouseOut={this.onMoveOutEmbedded}
              onClick={this.openTagSite("embedded")}
            >
              <BoxEmbedded className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Systemy Wbudowane</div>
                  <Grow
                    in={moveInEmbedded}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInEmbedded ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Sterowania, aplikacje oparte o mikroprocesory 8bit jak
                      Attiny, ATmega, ATXmega oraz 32bit ARM Cortex-M4. Z
                      wykorzystaniem RTOS procesory NPX ARM Cortex-A7, a takze
                      Raspberry Pi i klony np. Orange Pi takze z systemem
                      Armbian. Oprogramowanie w C/C++, biblioteka Qt, aplikacje
                      serwerowe z wykorzystaniem NodeJS.
                      <div className={classes.imagePosition}>
                        <img className={classes.imageInfo} src={atmel} />
                        <img className={classes.imageInfo} src={nxp} />
                        <img className={classes.imageInfo} src={rpi} />
                        <img className={classes.imageInfo} src={qt} />
                      </div>
                    </div>
                  </Grow>
                </>
              </BoxEmbedded>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0} wrap="nowrap">
          <Grid item xs>
            <Paper
              onMouseMove={this.onMoveInRobotics}
              onMouseOut={this.onMoveOutRobotics}
              onClick={this.openTagSite("robotics")}
            >
              <BoxRobotics className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Robotyka</div>
                  <Grow
                    in={moveInRobotics}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInRobotics ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Posiadam doswiadczenie w programowaniu robotow KUKA KRC1 i
                      KRC2, zdazaly sie tez wersje VKRC. Roboty ktore
                      programowalem wykonywaly algorytmy sterowania dla
                      rozladunku i zaladunku linii produkcyjnej dla przemyslu
                      meblarskiego. Pelnily one role slava, zarzadzanego przez
                      nadrzedny sterownik PLC.
                      <div className={classes.imagePosition}>
                        <img className={classes.imageInfo} src={kuka} />
                      </div>
                    </div>
                  </Grow>
                </>
              </BoxRobotics>
            </Paper>
          </Grid>
          <Grid item xs={6} wrap="nowrap">
            <Paper
              onMouseMove={this.onMoveInOther}
              onMouseOut={this.onMoveOutOther}
              onClick={this.openTagSite("other")}
            >
              <BoxOther className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Inne</div>
                  <Grow
                    in={moveInOther}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInOther ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Hobbistycznie interesuje sie tematami zwiazanymi z
                      technologiami, szczegolnie dotyczy to dziedzin
                      rozpoznawania obiektow, autonomicznych pojazdow
                      elektrycznych, zasilania i przesylu energii a takze
                      bezprzewodowej transmisji danych. Lubie majsterowanie,
                      wykonywanie przedmiotow z drewnia, tworzyw sztucznych i
                      obserwajce kosmosu ;){" "}
                    </div>
                  </Grow>
                </>
              </BoxOther>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Projects));
