import React from 'react';
//Routes will be added to this page
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

// This components needs state because its has child that requires the shop_data from fire base.
// A fetch has to be made during componentDidMount() 
class ShopPage extends React.Component {
    componentDidMount() {
        //let the fetch request of the shop data be handled by async REDUX behind the scenes, updating redux state etc
        const { fetchCollectionsStartAsync } = this.props;
        //note that render runs BEFORE componentDidMount, isLoading prop will be false
        fetchCollectionsStartAsync();
    }

    render() {
        const { match } = this.props;
        return (
            <div className="shop-page">
                {/* match.path refers to './shop' || we user 'render' instead of 'component' bc we need to pass props into the component wrapped in Route */}
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                {/* match.path instead of hardcoded /shop for flexibility, dont need to know where shop lies */}
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);