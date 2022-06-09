// import queryString from "query-string";
// import { useMemo } from "react";
// import {
//   useNavigate,
//   useLocation,
//   useParams,
//   useRouteMatch,
// } from "react-router";

// // Hook
// export function useRouter() {
//   const params = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const match = useRouteMatch();

//   // Return our custom router object
//   // Memoize so that a new object is only returned if something changes
//   return useMemo(() => {
//     return {
//       // For convenience add push(), replace(), pathname at top level
//       navigate,
//       location,
//       match,
//       pathname: location?.pathname,
//       push: navigate,
//       query: {
//         ...queryString.parse(location.search), // Convert string to object
//         ...params,
//       },
//       replace: navigate,
//       // Merge params and parsed query string into single "query" object
//       // so that they can be used interchangeably.
//       // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }

//       // Include match, location, history objects so we have
//       // access to extra React Router functionality if needed.
//     };
//   }, [params, match, location, navigate]);
// }
