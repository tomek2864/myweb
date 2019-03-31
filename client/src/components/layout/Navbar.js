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
import MoreIcon from "@material-ui/icons/MoreVert";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import LinkButton from "../common/LinkButton";

import { HashLink as Link } from "react-router-hash-link";

const styles = theme => ({
  nav: {
    width: "100%",
    backgroundColor: "#fff"
  },
  root: {
    flexGrow: 1
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
    color: "#000",
    marginLeft: 20,
    fontSize: 25,

    [theme.breakpoints.up("lg")]: {
      fontSize: 35
    },
    fontFamily: ["Ubuntu", "sans-serif"].join(",")
    /*[theme.breakpoints.up("sm")]: {
      display: "block"
    }*/
  },
  buttonNav: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 22,
    marginRight: 10,
    marginTop: 20,
    padding: "5px 12px",
    color: "#000",
    fontFamily: ["Scope One", "serif"].join(","),
    "&:hover": {
      color: theme.palette.secondary.main
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.secondary.main
    },
    "&:focus": {
      boxShadow: "none",
      color: theme.palette.secondary.main
    }
  },
  buttonNavMobile: {
    textAlign: "center",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    margin: "auto",
    color: "#000",
    fontFamily: ["Scope One", "serif"].join(","),
    "&:hover": {
      color: theme.palette.secondary.main
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.secondary.main
    },
    "&:focus": {
      boxShadow: "none",
      color: theme.palette.secondary.main
    }
  },

  menuButtons: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block"
    }
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none"
    },
    color: "#000"
  },
  buttonMenuMobile: {
    color: "#242249"
  },

  paper: {
    textAlign: "center",
    backgroundColor: "#242249"
  },
  menuItem: {
    color: "#242249"
  },
  show: {
    transform: "translate(0,0)",
    transition: "transform .5s"
  },
  hide: {
    transform: "translate(0, -140px)",
    transition: "transform .5s"
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      mobileMoreAnchorE2: null,
      isVisible: null,
      hashSite: this.props.location.hash
    };

    this.lastScroll = null;
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  componentWillUnmount(prevProps) {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const lastScroll = window.scrollY;

    if (lastScroll === this.state.lastScroll) {
      return;
    }

    const isVisible =
      this.lastScroll !== null ? lastScroll < this.lastScroll : null;

    if (isVisible !== this.state.isVisible) {
      this.setState(prevState => ({
        ...prevState,
        isVisible
      }));
    }

    this.lastScroll = lastScroll;
  }

  getScrollClassName() {
    if (this.state.isVisible === null) {
      return "";
    }
    return this.state.isVisible
      ? this.props.classes.show
      : this.props.classes.hide;
  }

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

  openDashboard = () => {
    this.handleMobileMenuClose();
    this.props.history.push(`/dashboard`);
  };

  openAddArticle = () => {
    this.handleMobileMenuClose();
    this.props.history.push(`/add-articles`);
  };

  refresh = hash => {
    //window.scrollTo(500, 0);
    //window.location.reload();
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
          to="/add-articles"
          color="inherit"
        >
          Dodaj artykuł
        </Button>
        <Button
          className={classes.buttonNav}
          component={Link}
          to="/dashboard"
          color="inherit"
        >
          Zarządzanie profilem
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
        <MenuItem className={classes.menuItem}>
          <Link to="/profile/tomek">O mnie</Link>
        </MenuItem>
      </Menu>
    );
    const guestLinksButtonsMobile = (
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        anchorReference="none"
        open={isMobileMenuNavbarOpen}
        onClose={this.handleMobileMenuNavbarClose}
      >
        <MenuItem className={classes.menuItem}>
          <Button
            component={Link}
            className={classes.buttonNavMobile}
            to="/profile/tomek"
          >
            O mnie
          </Button>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Button
            component={Link}
            className={classes.buttonNavMobile}
            to="/#projects"
            scroll={el => el.scrollIntoView({ behavior: "smooth" })}
          >
            Projekty
          </Button>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Button
            component={Link}
            className={classes.buttonNavMobile}
            to="/#contact"
            scroll={el => el.scrollIntoView({ behavior: "smooth" })}
          >
            Kontakt
          </Button>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Button
            component={Link}
            className={classes.buttonNavMobile}
            color="inherit"
            to="/login"
          >
            <AccountCircle />
          </Button>
        </MenuItem>
      </Menu>
    );

    const authLinksIconButton = (
      <div>
        <IconButton
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="#000"
        >
          <i class="fas fa-user-cog" />
        </IconButton>
      </div>
    );

    const guestLinksIconButtons = <div />;

    const authLinksIconButtonMobile = (
      <IconButton
        aria-haspopup="true"
        onClick={this.handleMobileMenuOpen}
        color="#000"
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
        <MenuItem onClick={this.openAddArticle}>Dodaj artykuł</MenuItem>
        <MenuItem onClick={this.openDashboard}>Mój profil</MenuItem>
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
        <MenuItem onClick={this.openAddArticle}>Dodaj artykuł</MenuItem>
        <MenuItem onClick={this.openDashboard}>Mój profil</MenuItem>
        <MenuItem onClick={this.onLogoutClick.bind(this)}>Wyloguj</MenuItem>
      </Menu>
    );

    const renderMobileMenu = isAuthenticated ? authLinkControlMobile : false;

    const renderMobileNavbarMenu = guestLinksButtonsMobile;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={`${classes.nav} ${this.getScrollClassName()}`}
        >
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Open drawer"
                onClick={this.handleMobileMenuNavbarOpen}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Grid className={classes.sectionDesktop} item xs={1}>
              <Paper className={classes.paper} />
            </Grid>
            <Link
              style={{ textDecoration: "none" }}
              to="/#hello"
              scroll={el => el.scrollIntoView({ behavior: "smooth" })}
            >
              <Typography className={classes.title} color="inherit">
                Portfolio | Tomasz Sobczak
              </Typography>
            </Link>
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
                    {/* {isAuthenticated ? authLinksButtons : guestLinksButtons} */}
                    <Button
                      component={Link}
                      className={classes.buttonNav}
                      color="inherit"
                      to="/profile/tomek"
                    >
                      O mnie
                    </Button>
                    <Button
                      component={Link}
                      className={classes.buttonNav}
                      color="inherit"
                      to="/#projects"
                      scroll={el => el.scrollIntoView({ behavior: "smooth" })}
                      style={{ color: "#000" }}
                    >
                      Projekty
                    </Button>
                    <Button
                      component={Link}
                      className={classes.buttonNav}
                      color="inherit"
                      to="/#contact"
                      scroll={el => el.scrollIntoView({ behavior: "smooth" })}
                      style={{ color: "#000" }}
                    >
                      Kontakt
                    </Button>

                    <div className={classes.buttonNav}>
                      {" "}
                      {isAuthenticated ? (
                        authLinksIconButton
                      ) : (
                        <Button component={Link} color="inherit" to="/login">
                          <AccountCircle />
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Toolbar>
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

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile }
  )(withStyles(styles)(Navbar))
);
