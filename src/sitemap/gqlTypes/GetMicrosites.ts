/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMicrosites
// ====================================================

export interface GetMicrosites_microsites_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface GetMicrosites_microsites_edges_node {
  __typename: "Microsite";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetMicrosites_microsites_edges {
  __typename: "MicrositeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetMicrosites_microsites_edges_node;
}

export interface GetMicrosites_microsites {
  __typename: "MicrositeCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetMicrosites_microsites_pageInfo;
  edges: GetMicrosites_microsites_edges[];
}

export interface GetMicrosites {
  /**
   * List of the shop's microsites.
   */
  microsites: GetMicrosites_microsites | null;
}

export interface GetMicrositesVariables {
  cursor?: string | null;
  perPage?: number | null;
}
