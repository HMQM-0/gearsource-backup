import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./scss/index.scss";
import { Box } from "@mui/material";
interface IBottomNavProps {}

const fabStyle: React.CSSProperties = {
  border: "1px solid #ededed",
  bottom: 12,
  boxShadow: "none",
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
};

const BottomNav: React.FunctionComponent<IBottomNavProps> = (props) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <Box className="bottom-nav">
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          bottom: 0,
          top: "auto",
          borderTop: "1px solid #ededed",
          position: "fixed",
          width: "100%",
        }}
      >
        <BottomNavigationAction
          showLabel
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate("/")}
          style={{ zIndex: 3 }}
        />
        <BottomNavigationAction
          disableRipple
          disableTouchRipple
          disabled
          style={{ zIndex: 3 }}
        />
        <BottomNavigationAction
          showLabel
          label="Wishlist"
          icon={<FavoriteIcon />}
          onClick={() => navigate("/wishlist")}
          style={{ zIndex: 3 }}
        />
      </BottomNavigation>
      <Fab
        color="primary"
        style={fabStyle}
        aria-label="Search"
        onClick={() => navigate("/search/?q=search")}
      >
        <SearchIcon fontSize="large" />
      </Fab>
    </Box>
  );
};

export default BottomNav;
