export const homeCollectionData = (homeCollection) => {
  const object = JSON.parse(homeCollection.descriptionJson);

  return object.blocks[0].text;
};
