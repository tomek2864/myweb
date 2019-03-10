import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import industry from "../../img/industry.jpg";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  GridList,
  GridListTile,
  CardMedia,
  CardActionArea
} from "@material-ui/core";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: 450
  },
  subheader: {
    width: "100%"
  },
  media: {
    height: 140
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
  render() {
    const { classes } = this.props;
    const { articles } = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {tileData.map(tile => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardContent>
                    <img scr={tile.img} />
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography component="p">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired
};

export default withStyles(styles)(Projects);
