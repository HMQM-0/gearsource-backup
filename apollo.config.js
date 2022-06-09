module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/@sdk/**/*"],
    service: {
      name: "nautical",
      url: "http://localhost:8000/graphql/",
    },
  },
};
