import React from "react";
import { useIntl } from "react-intl";
import { useAlert } from "react-alert";

// import { useAuth, useAffiliateCode } from "@nautical/sdk";
import { useAuth, useAffiliateCode } from "@nautical/react";
import { ServiceWorkerContext } from "@components/containers";
import { useSearchParams } from "react-router-dom";
import useCookie from "@temp/_nautical/hooks/useCookie";
import { maybe } from "@utils/misc";
// import { useLocation } from "react-router";

const Notifications: React.FC = () => {
  const alert = useAlert();
  const intl = useIntl();
  // const location = useLocation();
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const [cookie, updateCookie] = useCookie("_nauticalaffiliatecode", null);
  const [nameCookie, updateNameCookie] = useCookie("_nauticalaffiliate", null);

  // @ts-ignore
  // const affiliateId = maybe(() => router.query.aff, null);
  const affiliateId = maybe(() => searchParams.get("aff"), null);
  const { updateAvailable } = React.useContext(ServiceWorkerContext);

  const [setAffiliateCode, { data, error, loading }] = useAffiliateCode();

  React.useEffect(() => {
    if (updateAvailable) {
      alert.show(
        {
          actionText: intl.formatMessage({ defaultMessage: "Refresh" }),
          content: intl.formatMessage({
            defaultMessage:
              "To update the application to the latest version, please refresh the page!",
          }),
          title: intl.formatMessage({
            defaultMessage: "New version is available!",
          }),
        },
        {
          onClose: () => {
            window.location.reload();
          },
          timeout: 0,
          type: "success",
        }
      );
    }

    if (affiliateId !== null && cookie === null) {
      // TRIGGER UPDATE AFFILIATE CODE USES HERE
      setAffiliateCode({
        code: affiliateId,
      });
      // console.info(data);
      // console.info(error);
    }

    if (affiliateId !== null && cookie !== null) {
      alert.show(
        {
          content: `You have already been referred today by ${nameCookie}, and cannot be referred again.`,
          title: intl.formatMessage({
            defaultMessage: "Referral Lockout",
          }),
        },
        {
          timeout: 7500,
          type: "error",
        }
      );
    }
  }, [affiliateId, updateAvailable]);

  React.useEffect(() => {
    if (error) {
      alert.show(
        {
          content: `Affiliate code ${affiliateId} does not exist`,
          title: intl.formatMessage({
            defaultMessage: "Code not found",
          }),
        },
        {
          onClose: () => {
            // location.reload();
          },
          timeout: 7500,
          type: "error",
        }
      );
    }

    if (data?.affiliateCodes && !error && !loading) {
      updateCookie(data.affiliateCodes.id, 1);
      updateNameCookie(
        data.affiliateCodes.affiliate.firstName +
          " " +
          data.affiliateCodes.affiliate.lastName,
        1
      );
      alert.show(
        {
          content: `${data.affiliateCodes.affiliate.firstName} ${data.affiliateCodes.affiliate.lastName} referred you!`,
          title: intl.formatMessage({
            defaultMessage: "Congratulations",
          }),
        },
        {
          onClose: () => {
            // location.reload();
          },
          timeout: 7500,
          type: "success",
        }
      );
    }
  }, [data, error, loading]);

  const { authenticated } = useAuth();

  const [prevAuthenticated, setPrevAuthenticated] = React.useState<
    boolean | undefined
  >();

  React.useEffect(() => {
    if (prevAuthenticated !== undefined && authenticated !== undefined) {
      if (!prevAuthenticated && authenticated) {
        alert.show(
          {
            title: intl.formatMessage({
              defaultMessage: "You are now logged in",
            }),
          },
          { type: "success" }
        );
      } else if (prevAuthenticated && !authenticated) {
        alert.show(
          {
            title: intl.formatMessage({
              defaultMessage: "You are now logged out",
            }),
          },
          { type: "success" }
        );
      }
      setPrevAuthenticated(authenticated);
    } else if (authenticated !== undefined) {
      setPrevAuthenticated(authenticated);
    }
  }, [authenticated]);

  return null;
};

export default Notifications;
