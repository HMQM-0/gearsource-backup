// @ts-nocheck

import "./scss/index.scss";

// import clsx from "clsx";
import * as React from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { ProductsFeatured } from "../../components";
import {
  // generateCategoryUrl,
  generateProductsUrl,
  maybe,
} from "../../core/utils";

import {
  ProductsList_categories,
  // ProductsList_collections,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

// import { StringParam, useQueryParam } from 'use-query-params';
// import noPhotoImg from "../../images/no-photo.svg";
import { homeCollectionData } from "./functions/homeCollectionData";
import CategoryBlock from "@temp/_nautical/components/CategoryBlock";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import logoImg from "@temp/images/cooee-logo.svg";
import DrawerCart from "@temp/components/MainMenu/DrawerCart";
import DrawerLogin from "@temp/components/MainMenu/DrawerLogin";
import DrawerMenu from "@temp/components/MainMenu/DrawerMenu";

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

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const classes = useStyles();
  const [term, setTerm] = React.useState<string>("");
  const [cartOpen, setCartOpen] = React.useState<boolean>(false);
  const [loginOpen, setLoginOpen] = React.useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCart = () => {
    setCartOpen(true);
  };

  const handleLogin = () => {
    setLoginOpen(true);
  };

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

  // const intl = useIntl();

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <AppBar
        position="relative"
        sx={{
          placeContent: "center",
          display: "flex",
          backgroundColor: "#000055",
          height: 32,
          color: "#fff",
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "space-between",
            minHeight: "32px !important",
            maxWidth: 1200,
            width: "100%",
          }}
        >
          <Box></Box>
          <Box>Hello World!</Box>
          <Box></Box>
        </Toolbar>
      </AppBar>
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
          <Box sx={{ alignContent: "center", display: "flex", flexBasis: 200 }}>
            <Box sx={{ alignContent: "center", display: "flex" }}>
              <img src={logoImg} width={148} height="auto" />
            </Box>
            <Button
              sx={{
                borderRadius: "12px",
                marginLeft: "8px",
                minWidth: 32,
                padding: "8px",
              }}
              onClick={handleMenu}
            >
              <MenuOpenIcon htmlColor="#777" />
            </Button>
            <Button
              sx={{
                display: "none",
                borderRadius: "12px",
                marginLeft: "8px",
                minWidth: 32,
                padding: "8px",
              }}
              onClick={handleClick}
            >
              <AutoAwesomeMosaicIcon htmlColor="#777" fontSize="small" />
              <KeyboardArrowDownIcon htmlColor="#777" fontSize="small" />
            </Button>
          </Box>
          <Box>
            <Paper elevation={0} className={classes.search}>
              <IconButton sx={{ p: "10px" }} aria-label="menu">
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
              <IconButton sx={{ p: "10px" }} onClick={() => handleSearch()}>
                <RocketLaunchIcon htmlColor="#000033" />
              </IconButton>
            </Paper>
          </Box>
          <Box
            sx={{ display: "flex", flexBasis: 200, justifyContent: "flex-end" }}
          >
            <IconButton
              sx={{ backgroundColor: "#efefef", marginRight: "8px" }}
              onClick={() => handleLogin()}
            >
              <PersonOutlineOutlinedIcon htmlColor="#777" />
            </IconButton>
            <IconButton
              sx={{ backgroundColor: "#efefef" }}
              onClick={() => handleCart()}
            >
              <ShoppingBagOutlinedIcon htmlColor="#777" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        elevation={0}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <DrawerCart
        anchor="right"
        open={cartOpen}
        close={() => setCartOpen(false)}
      />
      <DrawerLogin
        anchor="right"
        open={loginOpen}
        close={() => setLoginOpen(false)}
      />
      <DrawerMenu
        anchor="left"
        open={menuOpen}
        close={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Page;
