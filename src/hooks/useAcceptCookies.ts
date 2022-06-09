// import Cookies from 'js-cookie'
import { useEffect, useState } from "react";

const COOKIE_NAME = "accept_cookies";

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_NAME)) {
      setAcceptedCookies(false);
    }
  }, []);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    localStorage.setItem(COOKIE_NAME, "accepted"); //.set(COOKIE_NAME, 'accepted', { expires: 365 })
  };

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  };
};
