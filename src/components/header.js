import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from "@material-ui/icons/GetApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "block",
  //   },
  // },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  // const [{user}] = useStateValue();
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const signIn = () => {
    // auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((e) => alert(e.message));
  };
  const signOut = () => {
    auth
      .signOut()
      .then((result) => {
        return (
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
          }),
          localStorage.setItem("user", null)
        );
      })
      .catch((e) => alert(e.message));
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/profile">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={signOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        {user ? (
          <Link to="/profile">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar alt="User" src={user.photoURL} />
                <p style={{paddingLeft:5}}>Profile</p>
              </IconButton>
              </Link>
            ) : (
              <button onClick={signIn} className="sign_header">
                Sign In
              </button>
            )}
        
      </MenuItem>

      <MenuItem onClick={signOut}>
        <IconButton aria-label="show 11 new notifications" color="inherit">  
            <NotificationsIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
 { /*        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
 </IconButton>*/}
 <Link to="/" style={{color:"#fff"}}>
          <Typography style={{minWidth:85}} className={classes.title} variant="h6" noWrap>
            Apna QB
          </Typography>
          </Link>
      {/*    <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            </div>*/}
          <div className={classes.grow} />
          <div className={classes.sectionD}>
          <div style={{display:"flex", justifyContent:'space-between'}}>

          <NavLink to="/" exact  activeClassName="activeRoute">
          <IconButton style={{padding:0, paddingTop:5, paddingRight:5, paddingLeft:5}} aria-label="show 4 new mails" color="inherit" >
          <div className="CenterIcon">
          <HomeIcon className="IconInside" fontSize='inherit' />
          <p>Home</p>
          </div>
          </IconButton>
          </NavLink>

          <NavLink to="/search" activeClassName="activeRoute">
          <IconButton style={{padding:0, paddingTop:5, paddingRight:5, paddingLeft:5}} aria-label="show 4 new mails" color="inherit"   >
          <div className="CenterIcon">
          <GetAppIcon className="IconInside" fontSize='inherit' />
          <p>Download</p>
          </div>
          </IconButton>
          </NavLink>

          <NavLink to="/upload" activeClassName="activeRoute">
          <IconButton style={{padding:0, paddingTop:5, paddingRight:5, paddingLeft:5}} aria-label="show 4 new mails" color="inherit" >
          <div className="CenterIcon">
          <PublishIcon className="IconInside" fontSize='inherit' />
          <p>Upload</p>
          </div>
          </IconButton></NavLink>

     
       {/*   <IconButton aria-label="show 4 new mails" color="inherit">
          <GetAppIcon className="CenterIcon" fontSize='inherit'/>
            </IconButton>*/}
          </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {user ?
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>:null}
            {user ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src={user.photoURL} />
              </IconButton>
            ) : (
              <button onClick={signIn} className="sign_header">
                Sign In
              </button>
            )}
          </div>
          <div className={classes.sectionMobile}>
          {user ? (
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            ) : (
              <button onClick={signIn} className="sign_header">
                Sign In
              </button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
