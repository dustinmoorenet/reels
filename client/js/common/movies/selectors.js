import {createSelector} from 'reselect';
import _ from 'lodash';

export const moviesByNumberSelector = createSelector(
    (state) => state.common.movies,
    (movies) => _.keyBy(movies, 'movieNumber')
);

export const tagsByMovieNumberSelector = createSelector(
    (state) => state.common.tags,
    (state) => state.common.movies,
    (tags) => (
        tags.reduce((tagsByMovie, tag) => {
            Object.keys(tag.movies).forEach((movieNumber) => {
                if (!tagsByMovie[movieNumber]) {
                    tagsByMovie[movieNumber] = [];
                }

                tagsByMovie[movieNumber].push(tag.label);
            });

            return tagsByMovie;
        }, {})
    )
);
