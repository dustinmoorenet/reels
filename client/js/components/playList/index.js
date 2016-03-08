import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import ListItem from './listItem';
import {playListSelector} from './selectors';

class PlayList extends Component {
    static propTypes = {
        playList: PropTypes.array.isRequired,
    };

    render() {
        return (
            <ul role="play-list">
                {this.props.playList.map((item) => <ListItem key={item.movieNumber} item={item} />)}
            </ul>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    playList: playListSelector,
});

export default connect(mapStateToProps)(PlayList);
