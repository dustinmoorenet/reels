import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import FilterItem from './filterItem';
import {
    setFilters,
    removeFilter,
} from 'js/common/actions';
import {filtersSelector} from 'js/common/filters/selectors';

class FilterList extends Component {
    static propTypes = {
        filters: PropTypes.array.isRequired,
        setFilters: PropTypes.func.isRequired,
        removeFilter: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);

        this.clear = () => this.props.setFilters([]);
    }

    render() {
        return (
            <div role="filter-list">
                {this.props.filters.length > 0 &&
                    <button onClick={this.clear}>Clear Filters</button>
                }
                <ul>
                    {this.props.filters.map((filter) => (
                        <FilterItem
                            key={filter.id}
                            filter={filter}
                            removeFilter={this.props.removeFilter}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    filters: filtersSelector,
});

const mapDispatchToProps = {
    setFilters,
    removeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
