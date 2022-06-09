import { createStyles, makeStyles } from "@mui/styles";
import { Box, Button, CircularProgress, Theme } from "@mui/material";
import { OrderTabel } from "@components/molecules";
import { useNauticalOrdersByUser } from "@nautical/react";
import * as H from "history";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      margin: theme.spacing(1),
    },
  })
);

const ORDERS_PER_APICALL = 5;
export interface IProps {
  history: H.History;
}

export const OrdersHistory: React.FC<any> = () => {
  const { data, loading, loadMore } = useNauticalOrdersByUser(
    {
      perPage: ORDERS_PER_APICALL,
    },
    {
      fetchPolicy: "network-only",
    }
  );

  const classes = useStyles();

  return loading && !data ? (
    <CircularProgress />
  ) : (
    <>
      <OrderTabel orders={data?.edges} />
      {data?.pageInfo.hasNextPage && (
        <Box className={classes.root}>
          <Button
            // testingContext="loadMoreOrdersButton"
            onClick={() => {
              loadMore({
                after: data!.pageInfo.endCursor,
                perPage: ORDERS_PER_APICALL,
              });
            }}
          >
            <FormattedMessage defaultMessage="Load more" />
          </Button>
        </Box>
      )}
    </>
  );
};
