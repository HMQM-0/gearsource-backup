import * as React from "react";
import StorePage from "../Builder/StorePage";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { Loader, NetworkStatus, NotFound, OfflinePlaceholder } from "@temp/components";
import { TypedProductVariantDetailsQuery } from "../Product/queries";
import { useParams } from "react-router-dom";
import { getGraphqlIdFromDBId } from "@temp/core/utils";

const View: React.FC = () => {
  const params = useParams();
  const { builderKey } = React.useContext(ShopContext);

  return builderKey ? (
    <TypedProductVariantDetailsQuery
      loaderFull
      variables={{
        id: getGraphqlIdFromDBId(params.id, "ProductVariant"),
      }}
      errorPolicy="all"
      key={params.id}
    >
      {({ data, loading }) => (
        <NetworkStatus>
          {(isOnline) => {
            const { productVariant } = data;
            
            if (loading) {
              return <Loader />;
            }

            if (productVariant === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }

            return <StorePage listing={productVariant} />
          }}
        </NetworkStatus>
      )}
    </TypedProductVariantDetailsQuery>
  ) : (
    <NotFound />
  );
};

export default View;
