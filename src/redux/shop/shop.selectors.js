import { createSelector } from 'reselect';
//Adding helper memoize package
import memoize from 'lodash.memoize';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

//converting object to array
export const selectCollectionForPreview = createSelector(
    [selectCollections],
    //Object.keys transforms contents of object into an array
    collections => Object.keys(collections).map(key => collections[key])
)

//collectionUrlParam refers to 'hats', 'jackets' etc
// Memoize: whenever this function gets called and receives collectionUrlParam, I want to memoize the return of this function (in this case we return a selector). If this function gets called again with the same collectionUrlParam, don't rerun this function because we'll return the same value as last time, which we've memoized so just return the selector that's been stored.
export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    ));