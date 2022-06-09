import {
  AppBar,
  Button,
  Badge,
  Box,
  Divider,
  InputBase,
  IconButton,
  Paper,
  Theme,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  Skeleton,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
// import * as appPaths from "@temp/app/routes";
import React from "react";
import { useAlert } from "react-alert";
import { useAuth, useCart } from "@nautical/react";
import { useNavigate } from "react-router-dom";
import { DesignerData, MenuStyle } from "./gqlTypes/MenuStyle";
import { maybe } from "@utils/misc";
import { mainMenu } from "./queries";

// Material Icons
import "./scss/index.scss";
import DrawerCart from "./DrawerCart";
import DrawerLogin from "./DrawerLogin";
import DrawerMenu from "./DrawerMenu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Logout, ImportContacts } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      "& .MuiPaper-root": {
        border: `1px solid ${theme.palette.divider}`,
      },
    },
    search: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 25,
    },
  })
);

interface ITopNavProps {
  logo?: React.ReactNode;
}

const TopNav: React.FunctionComponent<ITopNavProps> = (props) => {
  const { logo } = props;

  const { user, signOut } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
  };
  const alert = useAlert();
  const classes = useStyles();
  const [term, setTerm] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const accountMenuOpen = Boolean(anchorEl);
  const [cartOpen, setCartOpen] = React.useState(false);

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCart = () => {
    setCartOpen(true);
  };

  // const handleLogin = () => {
  //   if (!user) {
  //     setLoginOpen(true);
  //   } else {

  //   }
  // }

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleSearch = () => {
    if (term.length > 2) {
      navigate("/search?q=" + term);
    } else {
      alert.show(
        {
          content: "Minimum of three letters required",
          title: "Search",
        },
        { type: "info", timeout: 3000 }
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  // @ts-ignore
  function defaultStyle(data: DesignerData): MenuStyle {
    let json: MenuStyle = {
      active: true,
      barColor: "#FFF",
      borderColor: "#999",
      hoverColor: "#26b2e3",
      textColor: "#000",
    };

    if (data !== null || data !== undefined) {
      const parsed: MenuStyle = JSON.parse(data.jsonContent);
      json = parsed;
    }

    return json;
  }

  const logoImage = logo ? logo : <Skeleton />; // <img src={logoImg} width={188} height={"auto"} style={{ marginTop: "4px", marginBottom: "4px" }} onClick={() => navigate('/')} alt="Logo" />;
  const { data } = useQuery(mainMenu);
  const menuItems = maybe(() => data.shop.navigation.main.items, []);
  return (
    <>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "#fff", minHeight: 72 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "space-between",
            minHeight: "72px !important",
            maxWidth: 1200,
            width: "100%",
          }}
        >
          <Button
            sx={{
              display: { xs: "flex", sm: "none" },
              borderRadius: "12px",
              marginLeft: "8px",
              minWidth: 32,
              padding: "8px",
            }}
            onClick={handleMenu}
            aria-label="Menu"
          >
            <MenuOpenIcon htmlColor="#777" />
          </Button>

          <Box sx={{ alignContent: "center", display: "flex", flexBasis: 200 }}>
            <Box sx={{ alignItems: "center", display: "flex" }}>
              {logoImage}
            </Box>
            <Button
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "12px",
                marginLeft: "8px",
                minWidth: 32,
                padding: "8px",
              }}
              onClick={handleMenu}
              aria-label="Menu"
            >
              <MenuOpenIcon htmlColor="#777" />
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Paper elevation={0} className={classes.search}>
              <IconButton sx={{ p: "10px" }} aria-label="Search">
                <SearchIcon htmlColor="#777" />
              </IconButton>
              <InputBase
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Products"
                inputProps={{ "aria-label": "search" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                onClick={() => handleSearch()}
                aria-label="Search"
              >
                <RocketLaunchIcon />
              </IconButton>
            </Paper>
          </Box>

          <Box
            sx={{ display: "flex", flexBasis: 200, justifyContent: "flex-end" }}
          >
            <IconButton
              color="inherit"
              aria-label="account"
              // size="small"
              // sx={{ ml: 2 }}
              aria-controls={accountMenuOpen ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={accountMenuOpen ? "true" : undefined}
              onClick={(event) => {
                if (user) {
                  if (accountMenuOpen) {
                    setAnchorEl(null);
                  } else {
                    setAnchorEl(event.currentTarget);
                  }
                } else {
                  setLoginOpen(!loginOpen);
                }
              }}
            >
              {user ? (
                <PersonIcon color="primary" />
              ) : (
                <PersonOutlineOutlinedIcon color="action" />
              )}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={accountMenuOpen}
                onClose={() => setAnchorEl(null)}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("account/")}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  My Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate("order-history/")}>
                  <ListItemIcon>
                    <HistoryIcon fontSize="small" />
                  </ListItemIcon>
                  Order History
                </MenuItem>
                <MenuItem onClick={() => navigate("wishlist/")}>
                  <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                  </ListItemIcon>
                  Wishlist
                </MenuItem>
                <MenuItem onClick={() => navigate("address-book/")}>
                  <ListItemIcon>
                    <ImportContacts fontSize="small" />
                  </ListItemIcon>
                  Address Book
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </IconButton>
            {/* </Hidden> */}
            <Badge badgeContent={cartItemsQuantity} color="secondary">
              <IconButton
                sx={{ backgroundColor: "#F3F5F9" }}
                onClick={() => handleCart()}
                aria-label="Cart"
              >
                <ShoppingBagOutlinedIcon htmlColor="#777" />
              </IconButton>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerMenu
        logo={logoImage}
        anchor="left"
        items={menuItems}
        open={menuOpen}
        close={handleMenuClose}
      />
      <DrawerCart anchor="right" open={cartOpen} close={handleCartClose} />
      <DrawerLogin anchor="right" open={loginOpen} close={handleLoginClose} />
    </>
  );
};

export default TopNav;
