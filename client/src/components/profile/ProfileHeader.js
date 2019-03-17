import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
  Paper
} from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
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
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
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
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "center"
    }
  }
});

class ProfileHeader extends Component {
  state = {
    open: false
  };

  render() {
    const { classes } = this.props;
    const { profile } = this.props;

    return (
      <div className={classes.root}>
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

                <CardContent className={classes.contentCard}>
                  <Typography className={classes.typograhyTitle}>
                    Media
                  </Typography>
                  <Typography variant="subtitle2">
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Otworz profil na LinkedIn"
                    >
                      <Button
                        className={classes.buttonSocial}
                        target="_blank"
                        href={profile.website}
                      >
                        LinkedIn
                      </Button>
                    </Tooltip>
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Otworz profil na Github"
                    >
                      <Button
                        className={classes.buttonSocial}
                        target="_blank"
                        href={profile.githubusername}
                      >
                        Github
                      </Button>
                    </Tooltip>
                    <CopyToClipboard text={profile.email}>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={"Nacisnij aby skopiowac email: " + profile.email}
                      >
                        <Button
                          className={classes.buttonSocial}
                          target="_blank"
                        >
                          Email
                        </Button>
                      </Tooltip>
                    </CopyToClipboard>
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
