import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

//store items are stored in object, preview component displays items in array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  //get keys then map over array of keys to get the value of each item in collection object
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
