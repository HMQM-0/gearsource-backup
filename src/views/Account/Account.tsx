import * as React from "react";
import { useIntl } from "react-intl";
import Media from "react-media";
import { Box } from "@mui/material";
// import { RouteComponentProps, withRouter } from "react-router";
import { commonMessages } from "@temp/intl";
// import { useAuth } from "@nautical/sdk";
import { useAuth } from "@nautical/react";

import { smallScreen } from "@styles/constants";
import { AccountMenu, AccountMenuMobile } from "@components/molecules";
import { AccountTab, OrdersHistory } from "@pages";
import AddressBook from "../../account/AddressBook/AddressBook";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  // micrositeAccountUrl,
  // micrositeAddressBookUrl,
  // micrositeOrderHistoryUrl,
  orderHistoryUrl,
  wishlistUrl,
} from "../../app/routes";
import { Breadcrumbs, Loader } from "../../components";

import "./scss/index.scss";
// import {
//   generateMicrositeUrl,
//   getMicrositeId,
//   getMicrositeSlug,
//   isMicrosite,
// } from "@temp/core/utils";
// import NoHomeBreadcrumbs from "@temp/components/NoHomeBreadcrumbs";
import { withRouter } from "@temp/components/Overlay/provider";
import { useLocation, useNavigate, useParams } from "react-router";
// import { Wishlist } from "@components/templates";

const returnTab: any = (path: string, userDetails) => {
  let tabContent = <></>;
  switch (path) {
    case accountUrl: {
      tabContent = <AccountTab />;
      break;
    }
    case addressBookUrl: {
      tabContent = <AddressBook user={userDetails} />;
      break;
    }
    case orderHistoryUrl: {
      tabContent = <OrdersHistory />;
      break;
    }
    // case micrositeAccountUrl:
    //   tabContent = <AccountTab />;
    //   break;
    // case micrositeAddressBookUrl: {
    //   tabContent = <AddressBook user={userDetails} />;
    //   break;
    // }
    // case micrositeOrderHistoryUrl: {
    //   tabContent = <OrdersHistory />;
    //   break;
    // }
    /* case wishlistUrl: {
      tabContent = <Wishlist {...{ history }} />;
      break;
    } */
    default:
      tabContent = <AccountTab />;
      break;
  }
  return tabContent;
};

// const Account: React.FC<RouteComponentProps> = ({ history, match }) => {
const Account: React.FC<any> = () => {
  const intl = useIntl();
  const { user, loaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // console.info("ACCOUNT PARAMS")
  // console.info(params)
  // console.info(location)

  // const links = !!isMicrosite()
  //   ? [
  //       `${generateMicrositeUrl(getMicrositeId(), getMicrositeSlug())}account/`,
  //       `${generateMicrositeUrl(
  //         getMicrositeId(),
  //         getMicrositeSlug()
  //       )}order-history/`,
  //       `${generateMicrositeUrl(
  //         getMicrositeId(),
  //         getMicrositeSlug()
  //       )}wishlist/`,
  //       `${generateMicrositeUrl(
  //         getMicrositeId(),
  //         getMicrositeSlug()
  //       )}address-book/`,
  //     ]
  //   : [accountUrl, orderHistoryUrl, wishlistUrl, addressBookUrl];

  const links = [accountUrl, orderHistoryUrl, wishlistUrl, addressBookUrl];

  if (!loaded) {
    return <Loader />;
  }

  if (!user) {
    navigate(
      // !!isMicrosite()
      //   ? generateMicrositeUrl(getMicrositeId(), getMicrositeSlug())
      //   : baseUrl
      baseUrl
    );
  }

  return (
    <Box className="container">
      {/* {!!isMicrosite() ? (
        <NoHomeBreadcrumbs
          breadcrumbs={[
            {
              link: generateMicrositeUrl(getMicrositeId(), getMicrositeSlug()),
              value: "Back",
            },
          ]}
        />
      ) : (
        <Breadcrumbs
          breadcrumbs={[
            {
              link: params.path,
              value: intl.formatMessage(commonMessages.myAccount),
            },
          ]}
        />
      )} */}
      <Breadcrumbs
        breadcrumbs={[
          {
            link: params.path,
            value: intl.formatMessage(commonMessages.myAccount),
          },
        ]}
      />
      <Box className="account">
        <Media query={{ minWidth: smallScreen }}>
          <Box className="account__menu">
            <AccountMenu links={links} active={location.pathname} />
          </Box>
        </Media>
        <Media query={{ maxWidth: smallScreen - 1 }}>
          <Box className="account__menu_mobile">
            <AccountMenuMobile links={links} active={location.pathname} />
          </Box>
        </Media>
        <Box className="account__content">
          {user && returnTab(location.pathname, user)}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Account);
