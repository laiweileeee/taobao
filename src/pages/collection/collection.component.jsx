import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    const { title, items } = collection;
    console.log(collection);
    return (
    <div className="collection-page">
        <h2 className="title">{ title.toUpperCase() }</h2>
        <div className="items">
            {
                items.map(item => <CollectionItem key={item.id} item={item} />)
            }
        </div>
    </div>
)};

// ownProps is 2nd optional param, refers to the prop of the component being wrapped by connect
// Link between the component props (match, location, history..) and the global STATE
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);

