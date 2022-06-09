import React from "react";
import { Route, Routes } from "react-router-dom";

import { NotFound } from "../components";
import { OrderDetails } from "./views";

export const baseUrl = "/my-account/";
export const userOrderDetailsUrl = `${baseUrl}order/:id/`;
export const orderHistoryUrl = `${baseUrl}order/history/`;

const UserAccountRoutes: React.FC = () => (
  <Routes>
    <Route path={userOrderDetailsUrl} element={<OrderDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default UserAccountRoutes;
