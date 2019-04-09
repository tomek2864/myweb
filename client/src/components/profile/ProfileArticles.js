import React, { Component } from "react";
import {
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
  Chip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

const styles = theme => ({
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
    textAlign: "justify",
    fontSize: 16,
    fontFamily: ["Merriweather Sans", "sans-serif"].join(",")
  },
  grid: {
    alignContent: "stretch",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  paperS: {
    maxHeight: 500,
    width: 280
  },
  chip: {
    margin: theme.spacing.unit / 2,
    color: "#EEE",
    backgroundColor: theme.palette.primary.light,
    border: "2px solid",
    padding: "1px 8px",
    fontSize: 16,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    }
  },
  textSummary: {
    fontSize: 16,
    padding: 10,
    textAlign: "justify"
  },
  textTitle: {
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  },
  buttonTag: {
    width: 280,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    }
  }
});

class ProfileArticles extends Component {
  openTagSite = tag => () => {
    this.props.history.push(
      `/articles/${this.props.match.params.handle}/${tag}`
    );
  };

  render() {
    const { classes } = this.props;
    const { articles } = this.props;
    //const tags = ;
    return (
      <div>
        <Typography className={classes.typograhyTitle}>
          Opisy wykonanych projektów
        </Typography>
        <Grid container>
          <Grid className={classes.grid} item xs />
          <CardContent className={classes.contentCard}>
            <Grid item xs={12}>
              <Grid
                container
                className={classes.demo}
                justify="center"
                spacing={Number(32)}
                display="flex"
                flexWrap="wrap"
              >
                {articles.map(value => (
                  <Grid key={value} item>
                    <Paper className={classes.paperS}>
                      {" "}
                      <Typography className={classes.textTitle}>
                        {value.title}
                      </Typography>
                      <Typography className={classes.textSummary}>
                        {value.summary}
                      </Typography>
                      <div>
                        {value.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            className={classes.chip}
                            onClick={this.openTagSite(tag)}
                          />
                        ))}
                      </div>
                    </Paper>
                    <Button
                      className={classes.buttonTag}
                      component={Link}
                      type="submit"
                      variant="contained"
                      color="primary"
                      to={`/article/${value._id}`}
                    >
                      Zobacz całość
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <Grid className={classes.grid} item xs />
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ProfileArticles));
