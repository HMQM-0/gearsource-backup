import * as React from "react";
import Helmet from "react-helmet";
import { TypedThemeFontQuery } from "./queries";

interface IThemeFontProps {
  fontName?: string;
}

export const ThemeFont: React.FC<IThemeFontProps> = ({ fontName }) => {
  function generateLinkUrl(name) {
    const fontNameString = name.replace(" ", "+");
    const fontString =
      "https://fonts.googleapis.com/css?family=FONTNAME:400,600,700,900&display=swap";
    return fontString.replace("FONTNAME", fontNameString);
  }

  function getNameFromQuery(value) {
    const data = value.designerdata.jsonContent;
    return JSON.parse(data).name;
  }

  return (
    <TypedThemeFontQuery
      variables={{
        name: "ThemeFont",
      }}
    >
      {({ loading, data }) => {
        const fontNameFromQuery = getNameFromQuery(data);
        return (
          <>
            {loading ? (
              ""
            ) : (
              <Helmet>
                <link
                  href={generateLinkUrl(fontNameFromQuery)}
                  rel="stylesheet"
                ></link>
                <style type="text/css">
                  {`
                            * {
                                font-family: ${fontNameFromQuery};
                            }
                        `}
                </style>
              </Helmet>
            )}
          </>
        );
      }}
    </TypedThemeFontQuery>
  );
};
