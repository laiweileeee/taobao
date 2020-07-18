import React from 'react';
//Routes will be added to this page
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
    console.log(match)
    return (
    <div className="shop-page">
        {/* match.path refers to './shop' */}
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        {/* match.path instead of hardcoded /shop for flexibility, dont need to know where shop lies */}
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)}

export default ShopPage;