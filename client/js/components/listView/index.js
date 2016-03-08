import React, {Component} from 'react';

import FilterControl from 'js/components/filterControl';
import FilterList from 'js/components/filterList';
import PlayList from 'js/components/playList';

export default class ListView extends Component {
    render() {
        return (
            <div role="list-view">
                <h1>Arnold and Moore Home Movies</h1>
                <FilterControl />
                <div className="content">
                    <FilterList />
                    <PlayList />
                </div>
            </div>
        );
    }
}
