import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {listURLSelector} from 'js/components/listView/selectors';

class MovieView extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        listURL: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div role="movie-view">
                <h2>
                    <a href={this.props.listURL}>Back to List</a>
                </h2>
                <video src={`/files/${this.props.movie.movieNumber}-740k.mp4`} controls autoPlay />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    listURL: listURLSelector,
});

export default connect(mapStateToProps)(MovieView);
