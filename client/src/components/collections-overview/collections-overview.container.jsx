import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

//Currying our functions together for enhanced readability
const CollectionsOverviewContainer = compose(
    //compose evaluates right to left
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);
//the above is the same as: 
// ***connect(mapStateToProps)(WithSpinner(CollectionsOverview));

export default CollectionsOverviewContainer;

/***********************************************************************************/
// We do this separately because we don't want ShopPage to be as DUMB as possible, it doesnt need to know 
// whether collections is fetching or not. 
// Therefore, mapStateToProps is HERE instead of in ShopPage