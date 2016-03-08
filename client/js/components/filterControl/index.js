import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {
    setSearchText,
} from './actions';

import {
    toggleTag,
} from 'js/common/actions';

import {searchedTagsSelector} from './selectors';

import SearchTag from './searchTag';

class FilterControl extends Component {
    static propTypes = {
        searchText: PropTypes.string,
        setSearchText: PropTypes.func.isRequired,
        tags: PropTypes.array.isRequired,
        toggleTag: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.onSearchText = (event) => this.props.setSearchText(event.target.value);
    }

    renderTags() {
        return this.props.tags.map((tag) => (
            <SearchTag
                key={tag.id}
                tag={tag}
                toggleTag={this.props.toggleTag}
            />
        ));
    }

    render() {
        return (
            <div role="filter-control">
                <input
                    role="search-text"
                    type="text"
                    onChange={this.onSearchText}
                    placeholder="Search Filters"
                    value={this.props.searchText}
                />
                <div className="tags">
                    {this.renderTags()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchText: state.components.filterControl.searchText,
        tags: searchedTagsSelector(state),
    };
}

const mapDispatchToProps = {
    setSearchText,
    toggleTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterControl);
