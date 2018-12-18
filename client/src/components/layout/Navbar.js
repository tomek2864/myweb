import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Badge,
  MenuItem,
  Menu,
  Button,
  Paper
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "#242249"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "block",
    marginLeft: 20,
    fontSize: 20,
    [theme.breakpoints.up("md")]: {
      fontSize: 35
    }
    /*[theme.breakpoints.up("sm")]: {
      display: "block"
    }*/
  },
  buttonNav: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 19,
    padding: "6px 12px",
    border: "1px solid",
    backgroundColor: "#242249",
    borderColor: "#242249",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#242249",
      borderColor: "#c1ff75"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#13190c",
      borderColor: "#c1ff75"
    },
    "&:focus": {
      boxShadow: "none",
      color: "#ff795e"
    }
  },

  menuButtons: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block"
    }
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  paper: {
    textAlign: "center",
    backgroundColor: "#242249"
  }
});

class Navbar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileMoreAnchorE2: null
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.handleMobileMenuClose();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMobileMenuNavbarOpen = event => {
    this.setState({ mobileMoreAnchorE2: event.currentTarget });
  };

  handleMobileMenuNavbarClose = () => {
    this.setState({ mobileMoreAnchorE2: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, mobileMoreAnchorE2 } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMobileMenuNavbarOpen = Boolean(mobileMoreAnchorE2);

    const { isAuthenticated, user } = this.props.auth;

    //Menu przyciski zwykle
    const authLinksButtons = (
      <div>
        <Button
          className={classes.buttonNav}
          component={Link}
          to="/dashboard"
          color="inherit"
        >
          Dashboard
        </Button>
      </div>
    );
    const guestLinksButtons = (
      <div>
        <Button
          className={classes.buttonNav}
          component={Link}
          to="/login"
          color="inherit"
        >
          Login
        </Button>
        <Button
          className={classes.buttonNav}
          component={Link}
          to="/register"
          color="inherit"
        >
          Rejestracja
        </Button>
      </div>
    );

    //Menu przyciski chowane dla wersji mobilnej
    const authLinkButtonsMobile = (
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={isMobileMenuNavbarOpen}
        onClose={this.handleMobileMenuNavbarClose}
      >
        <MenuItem>
          <Link to="/contact">Kontakt</Link>
        </MenuItem>
      </Menu>
    );
    const guestLinksButtonsMobile = (
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={isMobileMenuNavbarOpen}
        onClose={this.handleMobileMenuNavbarClose}
      >
        <MenuItem>
          <Link to="/login">Logowanie</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">Rejestracja</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/contact">Kontakt</Link>
        </MenuItem>
      </Menu>
    );

    const authLinksIconButton = (
      <div>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    );

    const guestLinksIconButtons = <div />;

    const authLinksIconButtonMobile = (
      <IconButton
        aria-haspopup="true"
        onClick={this.handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    );

    const guestLinksIconButtonsMobile = <div />;

    const authLinkControlMobile = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <p>Dashboard</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.onLogoutClick.bind(this)}>Wyloguj</MenuItem>
      </Menu>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.onLogoutClick.bind(this)}>Wyloguj</MenuItem>
      </Menu>
    );

    const renderMobileMenu = isAuthenticated ? authLinkControlMobile : false;

    const renderMobileNavbarMenu = isAuthenticated
      ? authLinkButtonsMobile
      : guestLinksButtonsMobile;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Open drawer"
                onClick={this.handleMobileMenuNavbarOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Grid className={classes.sectionDesktop} item xs={2}>
              <Paper className={classes.paper} />
            </Grid>
            <Typography
              component={Link}
              to="/"
              className={classes.title}
              color="inherit"
              noWrap
            >
              Tomasz Sobczak
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Toolbar>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="stretch"
                  >
                    {isAuthenticated ? authLinksButtons : guestLinksButtons}
                    <Button className={classes.buttonNav} color="inherit">
                      Kontakt
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
              {isAuthenticated ? authLinksIconButton : guestLinksIconButtons}
            </div>
            <div className={classes.sectionMobile}>
              {isAuthenticated
                ? authLinksIconButtonMobile
                : guestLinksIconButtonsMobile}
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {renderMobileNavbarMenu}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(withStyles(styles)(Navbar));
