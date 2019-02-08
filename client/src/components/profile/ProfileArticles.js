import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Paper,
  ButtonBase,
  Chip
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

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
    height: 200,
    width: 280
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
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
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typograhyTitle}>
              Opisy wykonanych projektów
            </Typography>
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
                      {value.title}
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
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ProfileArticles.propTypes = {
  articles: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ProfileArticles));
