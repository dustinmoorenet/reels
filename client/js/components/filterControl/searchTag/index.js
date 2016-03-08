import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class SearchTag extends Component {
    static propTypes = {
        tag: PropTypes.object,
        toggleTag: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.toggle = () => this.props.toggleTag(this.props.tag);
    }

    render() {
        return (
            <div
                role="search-tag"
                className={classNames({
                    included: this.props.tag.isIncluded,
                })}
                onClick={this.toggle}
            >
                {this.props.tag.label}
            </div>
        );
    }
}
