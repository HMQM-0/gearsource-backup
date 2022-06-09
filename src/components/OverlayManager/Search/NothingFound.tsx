import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";
export const NothingFound: React.FC<{ search: string }> = ({ search }) => {
  return (
    <Box className="search__products--not-found">
      <p className="u-lead u-lead--bold u-uppercase">
        <FormattedMessage
          defaultMessage="Sorry, but we couldn’t match any search results for: {search}"
          values={{ search }}
        />
      </p>
      <p>
        <FormattedMessage defaultMessage="Don’t give up - check the spelling, think of something less specific and then use the search bar above." />
      </p>
    </Box>
  );
};

export default NothingFound;
