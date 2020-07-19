import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
    <div className="collection-preview">
        {/* Remember to import withRouter to access Route props */}
        <h1 className="title" onClick={() => history.push(`${match.path}/${routeName}`)} >
            {title.toUpperCase()}
        </h1>
        <div className="preview">
            {
                items
                    .filter((item, i) => i < 4)
                    .map((item) => {
                        return (
                            <CollectionItem key={item.id} item={item} />
                        )
                    })
            }
        </div>
    </div>
)


export default withRouter(CollectionPreview);