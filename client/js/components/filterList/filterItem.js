import React, {Component, PropTypes} from 'react';

export default class FilterItem extends Component {
    static propTypes = {
        removeFilter: PropTypes.func.isRequired,
        filter: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.remove = () => this.props.removeFilter(this.props.filter);
    }

    render() {
        return (
            <li onClick={this.remove}>
                {this.props.filter.label}
                <span className="icon-cancel" />
            </li>
        );
    }
}
