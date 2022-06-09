import React from "react";

import { useNavigate, useLocation } from "react-router";

import { Loader } from "@components/atoms";
import { ThankYou } from "@components/organisms";
import { useNauticalOrderDetails } from "@nautical/react";
import { BASE_URL } from "@temp/core/config";
// import {
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";
import {
  generateGuestOrderDetailsUrl,
  // generateMicrositeGuestOrderDetailsUrl,
  // generateMicrositeUrl,
} from "@utils/core";

const ThankYouPage: React.FC<any> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const { token, orderNumber } = location.state;
  const { data: order, loading } = useNauticalOrderDetails(
    { token },
    { fetchPolicy: "cache-first" }
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <ThankYou
      continueShopping={() =>
        navigate(
          // !!isMicrosite()
          //   ? generateMicrositeUrl(getMicrositeId(), getMicrositeSlug())
          //   : BASE_URL
          BASE_URL
        )
      }
      orderNumber={orderNumber}
      orderEmail={order?.userEmail}
      orderDetails={() =>
        navigate(
          // !!isMicrosite()
          //   ? generateMicrositeGuestOrderDetailsUrl(
          //       token,
          //       getMicrositeId(),
          //       getMicrositeSlug()
          //     )
          //   : generateGuestOrderDetailsUrl(token)
          generateGuestOrderDetailsUrl(token)
        )
      }
    />
  );
};

export { ThankYouPage };
