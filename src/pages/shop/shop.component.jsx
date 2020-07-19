import React from 'react';
//Routes will be added to this page
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.util';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// This components needs state because its has child that requires the shop_data from fire base.
// A fetch has to be made during componentDidMount() 
class ShopPage extends React.Component {
    state = {
        loading: true
    };
    
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        //Remeber to destructure off updateCollections action here, since props are not passed down in constructor
        const { updateCollections } = this.props; 
        const collectionRef = firestore.collection('collections');

        //Any changes happens, snapshots will be sent, representing our collections array
        collectionRef.onSnapshot(async (snapshot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            //change the state of loading to false 
            this.setState({ loading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                {/* match.path refers to './shop' || we user 'render' instead of 'component' bc we need to pass props into the component wrapped in Route */}
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
                {/* match.path instead of hardcoded /shop for flexibility, dont need to know where shop lies */}
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);