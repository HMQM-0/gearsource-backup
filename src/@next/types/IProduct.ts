// import { ProductList_products_edges_node } from "@nautical/sdk/lib/queries/gqlTypes/ProductList";
import { ProductList_products_edges_node } from "@nautical/queries/gqlTypes/ProductList";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IProduct = WithOptional<ProductList_products_edges_node, "slug">;
