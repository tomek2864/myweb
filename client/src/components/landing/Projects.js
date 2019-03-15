import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import industry from "../../img/industry.jpg";
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
    backgroundColor: "#123321"
  },
  hover: {
    scale: 1,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)",
    backgroundColor: "#123321"
  }
});

const BoxOther = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "#fff"
  },
  hover: {
    scale: 0.95,
    boxShadow: "0px 5px 10px rgba(0,0,0,0)"
    //backgroundColor: "#123123",
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
    height: 300
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
    padding: "0px 25px",
    textAlign: "justify",
    [theme.breakpoints.down("lg")]: {
      fontSize: 12
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 20
    }
  }
});

const tileData = [
  {
    img: industry,
    tag: "JavaScript",
    title: "JavaScript",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "Automatyka przemysłowa",
    title: "Automatyka przemysłowa",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "Elektronika",
    title: "Elektronika",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "Systemy wbudowane",
    title: "Systemy wbudowane",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "C/C++",
    title: "C/C++",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "Roboty",
    title: "Roboty",
    author: "author",
    cols: 1
  },
  {
    img: industry,
    tag: "React",
    title: "Industry",
    author: "author",
    cols: 1
  }
];

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
                      Lorem Ipsum jest tekstem stosowanym jako przykładowy
                      wypełniacz w przemyśle poligraficznym. Został po raz
                      pierwszy użyty w XV w. przez nieznanego drukarza do
                      wypełnienia tekstem próbnej książki.{" "}
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
                      Lorem Ipsum jest tekstem stosowanym jako przykładowy
                      wypełniacz w przemyśle poligraficznym. Został po raz
                      pierwszy użyty w XV w. przez nieznanego drukarza do
                      wypełnienia tekstem próbnej książki.{" "}
                    </div>
                  </Grow>
                </>
              </BoxAutomation>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={0} wrap="nowrap">
          <Grid item xs>
            <div onMouseMove={this.onMoveInWeb} onMouseOut={this.onMoveOutWeb}>
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
                      Lorem Ipsum jest tekstem stosowanym jako przykładowy
                      wypełniacz w przemyśle poligraficznym. Został po raz
                      pierwszy użyty w XV w. przez nieznanego drukarza do
                      wypełnienia tekstem próbnej książki.{" "}
                    </div>
                  </Grow>
                </>
              </BoxWeb>
            </div>
          </Grid>
          <Grid item xs={6} wrap="nowrap">
            <div
              onMouseMove={this.onMoveInEmbedded}
              onMouseOut={this.onMoveOutEmbedded}
            >
              <BoxEmbedded className={classes.box}>
                <>
                  <div className={classes.typoTitle}>Systemy wbudowane</div>
                  <Grow
                    in={moveInEmbedded}
                    style={{
                      //transformOrigin: "0 0 0",
                      transition: { ease: "linear" }
                    }}
                    {...(moveInEmbedded ? { timeout: 1500 } : {})}
                  >
                    <div className={classes.typoInfo}>
                      Lorem Ipsum jest tekstem stosowanym jako przykładowy
                      wypełniacz w przemyśle poligraficznym. Został po raz
                      pierwszy użyty w XV w. przez nieznanego drukarza do
                      wypełnienia tekstem próbnej książki.{" "}
                    </div>
                  </Grow>
                </>
              </BoxEmbedded>
            </div>
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

export default withStyles(styles)(Projects);
