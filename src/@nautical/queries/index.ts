import {
  ApolloClient,
  ObservableQuery,
  QueryOptions as ApolloQueryOptions,
} from "@apollo/client";

import { RequireOnlyOne } from "../tsHelpers";
import * as AttributesList from "./attributes";
import * as Category from "./category";
import * as Collections from "./collections";
import * as Orders from "./orders";
import * as Product from "./products";
import * as Shop from "./shop";
import * as Wishlist from "./wishlist";
import * as User from "./user";
import * as PluginInfo from "./pluginInfo";

import {
  NauticalOrderByToken,
  OrderByToken,
  OrderByTokenVariables,
} from "./gqlTypes/OrderByToken";
import {
  UserOrderByToken,
  UserNauticalOrderByToken,
  UserOrderByTokenVariables,
} from "./gqlTypes/UserOrderByToken";

import { Attributes, AttributesVariables } from "./gqlTypes/Attributes";
import {
  ProductDetails,
  ProductDetailsVariables,
} from "./gqlTypes/ProductDetails";

import { ProductList, ProductListVariables } from "./gqlTypes/ProductList";

import {
  CategoryDetails,
  CategoryDetailsVariables,
} from "./gqlTypes/CategoryDetails";

import { GetShop } from "./gqlTypes/GetShop";
import { GetProductRatingsAndReviews } from "./gqlTypes/GetProductRatingsAndReviews";

import {
  Wishlist as WishlistType,
  WishlistVariables,
} from "./gqlTypes/Wishlist";

import {
  NauticalOrdersByUser,
  OrdersByUser,
  OrdersByUserVariables,
} from "./gqlTypes/OrdersByUser";
import {
  VariantsProducts,
  VariantsProductsVariables,
} from "./gqlTypes/VariantsProducts";
import {
  CollectionListVariables,
  CollectionList,
} from "./gqlTypes/CollectionList";
import { GetYotpoLoyaltyAndReferralsCustomerDetails } from "./gqlTypes/GetYotpoLoyaltyAndReferralsCustomerDetails";
import { GetLoyaltyAndReferralsInfo } from "./gqlTypes/GetLoyaltyAndReferralsInfo";
import { GetShippyProApiKeyForScript } from "./gqlTypes/GetShippyProApiKeyForScript";

type QueryOptions<T = {}> = T extends { [n: string]: never }
  ? Omit<ApolloQueryOptions<{}>, "query">
  : RequireOnlyOne<Omit<ApolloQueryOptions<T>, "query">, "variables">;

// TODO: Add ability to pass custom fragments to queries
export const QUERIES = {
  Attributes: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<AttributesVariables>
  ): ObservableQuery<Attributes, any> =>
    client.watchQuery({
      query: AttributesList.attributes,
      ...options,
    }),
  CategoryDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<CategoryDetailsVariables>
  ): ObservableQuery<CategoryDetails, any> =>
    client.watchQuery({
      query: Category.categoryQuery,
      ...options,
    }),
  CollectionList: (
    client: ApolloClient<any>,
    options: QueryOptions<CollectionListVariables>
  ): ObservableQuery<CollectionList, any> =>
    client.watchQuery({
      query: Collections.collections,
      ...options,
    }),
  GetShopDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShop, any> =>
    client.watchQuery({
      query: Shop.getShop,
      ...options,
    }),
  GetLoyaltyAndReferralsInfo: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetLoyaltyAndReferralsInfo, any> =>
    client.watchQuery({
      query: PluginInfo.getLoyaltyAndReferralsInfo,
      ...options,
    }),
  GetShippyProApiKeyForScript: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetShippyProApiKeyForScript, any> =>
    client.watchQuery({
      query: PluginInfo.getShippyProApiKeyForScript,
      ...options,
    }),
  NauticalOrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): ObservableQuery<NauticalOrderByToken, any> =>
    client.watchQuery({
      query: Orders.nauticalOrderDetailsByTokenQuery,
      ...options,
    }),
  NauticalOrderDetailsByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<UserOrderByTokenVariables>
  ): ObservableQuery<UserNauticalOrderByToken, any> =>
    client.watchQuery({
      query: Orders.userNauticalOrderDetailsByTokenQuery,
      ...options,
    }),
  NauticalOrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserVariables>
  ): ObservableQuery<NauticalOrdersByUser, any> =>
    client.watchQuery({
      query: Orders.nauticalOrdersByUser,
      ...options,
    }),
  OrderDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrderByTokenVariables>
  ): ObservableQuery<OrderByToken, any> =>
    client.watchQuery({
      query: Orders.orderDetailsByTokenQuery,
      ...options,
    }),
  OrderDetailsByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<UserOrderByTokenVariables>
  ): ObservableQuery<UserOrderByToken, any> =>
    client.watchQuery({
      query: Orders.userOrderDetailsByTokenQuery,
      ...options,
    }),
  OrdersByUser: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<OrdersByUserVariables>
  ): ObservableQuery<OrdersByUser, any> =>
    client.watchQuery({
      query: Orders.ordersByUser,
      ...options,
    }),
  ProductDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductDetailsVariables>
  ): ObservableQuery<ProductDetails, any> =>
    client.watchQuery({
      query: Product.productDetails,
      ...options,
    }),
  ProductList: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<ProductListVariables>
  ): ObservableQuery<ProductList, any> =>
    client.watchQuery({
      query: Product.productList,
      ...options,
    }),
  VariantsProducts: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<VariantsProductsVariables>
  ): ObservableQuery<VariantsProducts, any> =>
    client.watchQuery({
      query: Product.variantsProducts,
      ...options,
    }),
  Wishlist: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<WishlistVariables>
  ): ObservableQuery<WishlistType, any> =>
    client.watchQuery({
      query: Wishlist.userWishlist,
      ...options,
    }),
  GetProductRatingsAndReviews: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<null>
  ): ObservableQuery<GetProductRatingsAndReviews, any> =>
    client.watchQuery({
      query: Product.getProductRatingsAndReviews,
      ...options,
    }),
  GetYotpoLoyaltyAndReferralsCustomerDetails: <TCacheShape>(
    client: ApolloClient<TCacheShape>,
    options: QueryOptions<{ email: String }>
  ): ObservableQuery<GetYotpoLoyaltyAndReferralsCustomerDetails, any> =>
    client.watchQuery({
      query: User.getYotpoLoyaltyAndReferralsCustomerDetails,
      ...options,
    }),
};

export type QUERIES = typeof QUERIES;
