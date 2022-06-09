import "./mui";
import * as React from "react";
import { BuilderComponent, Builder, builder } from "@builder.io/react";
import { CircularProgress } from "@mui/material";
// @ts-ignore
import { Base64 } from "js-base64";

const model = "article";

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

const ArticlePage: React.FunctionComponent = (props) => {
  const [pageJson, setPage] = React.useState();
  // @ts-ignore
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  // @ts-ignore
  function getLastNumberOfString(value: string) {
    var allNumbers = value
      .replace(/[^0-9]/g, " ")
      .trim()
      .split(/\s+/);
    return parseInt(allNumbers[allNumbers.length - 1], 10);
  }

  /*
  function extractPath(value: string) {
    // any character that is not a word character or whitespace
    const regex = /\/(article)+\/([A-z|0-9]+\-[A-z|0-9]+)/g;    
    var result = value.match(regex).pop();

    var id = Base64.encode('Product:5' + getLastNumberOfString(value));

    if (result !== null) {
      return result;
    }else{
      return "";
    }
  }
  */

  React.useMemo(() => {
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        const path = window.location.pathname;
        const content = await builder.get(model, { url: path }).promise();
        setPage(content);
        setLoading(false);
      };

      fetchPage();
    }
  }, []);

  if (!pageJson && !isEditingOrPreviewing) {
    return isLoading ? (
      <CircularProgress sx={{ placeSelf: "center" }} />
    ) : (
      <NoComponent />
    );
  } else {
    return <BuilderComponent model={model} content={pageJson} />;
  }
};

export default ArticlePage;
