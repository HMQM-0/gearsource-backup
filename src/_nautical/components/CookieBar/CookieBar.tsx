import React from "react";
import "./scss/index.scss";
import { Box } from "@mui/material";
interface CookieBarProps {
  title: string;
  description?: string;
  hide?: boolean;
  action?: React.ReactNode;
}

const CookieBar: React.FC<CookieBarProps> = ({
  title,
  description,
  action,
  hide,
}) => {
  return (
    <Box className={hide ? "cookie-hide" : "cookie-root"}>
      <span>{title}</span>
      <span>
        {description}
        &nbsp;
        <a
          rel="noreferrer"
          aria-label="learn more about cookies"
          role="button"
          className="cookie-link"
          href="http://cookiesandyou.com"
          target="_blank"
        >
          About Cookies
        </a>
      </span>
      {action && action}
    </Box>
  );
};

export default CookieBar;

/*
<span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
*/
