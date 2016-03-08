import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {tagsByMovieNumberSelector} from 'js/common/movies/selectors';
import {writeHash} from 'js/common/actions';

class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        tags: PropTypes.array.isRequired,
        writeHash: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.onClick = () => {
            this.props.writeHash({hash: `#/movie/${this.props.item.movieNumber}`});
        };

        this.mouseEnter = (event) => {
            event.currentTarget.querySelector('img').src = `images/${this.props.item.movieNumber}.gif`;
        };

        this.mouseLeave = (event) => {
            event.currentTarget.querySelector('img').src = `images/${this.props.item.movieNumber}.jpeg`;
        };
    }

    renderDate() {
        return this.props.item.startDateString + (this.props.item.endDateString ? ` - ${this.props.item.endDateString}` : '');
    }

    render() {
        const item = this.props.item;

        return (
            <li role="list-item" onClick={this.onClick}>
                <div
                    className="image-holder"
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                >
                    <img
                        className="jpeg"
                        src={`images/${item.movieNumber}.jpeg`}
                    />
                </div>
                <div className="info">
                    <div className="header">
                        <div className="description">{item.description}</div>
                        <div className="date">{this.renderDate()}</div>
                    </div>
                    <div className="tags">{this.props.tags.join(', ')}</div>
                </div>
            </li>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        tags: tagsByMovieNumberSelector(state)[ownProps.item.movieNumber] || [],
    };
}

const mapDispatchToProps = {
    writeHash,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
