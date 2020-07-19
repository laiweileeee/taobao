import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    //Because our firebase fetch request in async, 'title' and 'items' cannot be destructured bc data is not 'loaded'
    // Therefore during the async fetch request, we need to set a loading animation
    const { title, items } = collection;
    return (
        <div className="collection-page">
            <h2 className="title">{title.toUpperCase()}</h2>
            <div className="items">
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
};

// ownProps is 2nd optional param, refers to the prop of the component being wrapped by connect
// Link between the component props (match, location, history..) and the global STATE
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);

