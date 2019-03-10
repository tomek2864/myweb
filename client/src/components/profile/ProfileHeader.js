import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Link,
  Button
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  contentCard: {
    //alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  typograhyTitle: {
    textAlign: "center",
    fontSize: 28
  },
  textAboutMe: {
    textAlign: "justify",
    fontSize: 16
  },
  grid: {
    display: "flex"
  },
  textSkills: {
    textAlign: "justify"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  },
  pages: {
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "flex-end",
    display: "flex"
  },
  buttonSocial: {
    display: "inline",
    fontSize: 20
  }
});

class ProfileHeader extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;
    return (
      <div>
        <Grid container>
          <Grid className={classes.grid} item xs />
          <Grid className={classes.grid} item xs={11}>
            <Grid className={classes.grid} item xs={8}>
              <CardContent className={classes.contentCard}>
                <Typography className={classes.typograhyTitle}>
                  {profile.user.name}
                </Typography>

                <Typography className={classes.textAboutMe}>
                  <div>{profile.bio}</div>
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.grid} item xs />
            <Grid className={classes.grid} item xs={4}>
              <Grid container direction="column" alignItems="flex-end">
                <CardContent className={classes.contentCard}>
                  <Typography className={classes.typograhyTitle}>
                    Umiejętności
                  </Typography>
                  <div>
                    {profile.skills.map((skill, index) => (
                      <div>
                        <Typography variant="h6" className={classes.textSkills}>
                          {skill.main === "" ? "" : skill.main}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className={classes.textSkills}
                        >
                          {skill.skills === "" ? "" : skill.skills}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardContent>
                  <Typography variant="subtitle2">
                    <Button
                      className={classes.buttonSocial}
                      target="_blank"
                      href={profile.website}
                    >
                      LinkedIn
                    </Button>
                    <Button
                      className={classes.buttonSocial}
                      target="_blank"
                      href={profile.githubusername}
                    >
                      Github
                    </Button>
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.grid} item xs />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileHeader);
