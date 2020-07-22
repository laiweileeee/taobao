import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    // we return a function here because we need to invert the boolean value received
    isLoading: (state) => !selectIsCollectionsLoaded(state),
});

//Currying our functions together for enhanced readability
const CollectionPageContainer = compose(
    //compose evaluates right to left
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);
//the above is the same as: 
// ***connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionPageContainer;

/***********************************************************************************/
// We do this separately because we don't want ShopPage to be as DUMB as possible, it doesnt need to know 
// whether collections is fetching or not. 
// Therefore, mapStateToProps is HERE instead of in ShopPage