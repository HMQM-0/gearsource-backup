import { builder, Builder, BuilderComponent } from "@builder.io/react";
import * as React from "react";
import { Breadcrumb } from "../../components";

export interface IBuilderPageProps {
  breadcrumbs: Breadcrumb[];
  headerImage: string | null;
  page: {
    contentJson: any;
    title: string;
  };
}

const NoComponent: React.FunctionComponent = (props) => {
  return <>404</>;
};

const BuilderPage: React.FunctionComponent<IBuilderPageProps> = (props) => {
  const [pageJson, setPage] = React.useState();
  // @ts-ignore
  const [isLoading, setLoading] = React.useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  React.useMemo(() => {
    if (!isEditingOrPreviewing) {
      const fetchPage = async () => {
        setLoading(true);
        const path = window.location.pathname;
        const content = await builder.get("page", { url: path }).promise();
        setPage(content);
        setLoading(false);
      };

      fetchPage();
    }
  }, []);

  if (!pageJson && !isEditingOrPreviewing) {
    return <NoComponent />;
  } else {
    return <BuilderComponent model="page" content={pageJson} />;
  }
};

export default BuilderPage;
