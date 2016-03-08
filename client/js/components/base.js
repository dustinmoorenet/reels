import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ListView from './listView';
import MovieView from './movieView';

class Base extends Component {
    static propTypes = {
        movies: PropTypes.array,
        current: PropTypes.string,
    };

    render() {
        const movie = this.props.movies.find((m) => m.movieNumber === this.props.current);

        return (
            <div role="base">
                {movie ?
                    <MovieView movie={movie} />
                    : <ListView movies={this.props.movies} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.common.movies,
        current: state.components.current,
    };
}

export default connect(mapStateToProps)(Base);
