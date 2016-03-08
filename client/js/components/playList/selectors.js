import {createSelector} from 'reselect';
import _ from 'lodash';

import {moviesByNumberSelector} from 'js/common/movies/selectors';
import {filtersSelector} from 'js/common/filters/selectors';

export function reduceTimeLine(timeLine, indexList, reducedTimeLine = {}, currentIndex = 0, level = 0) {
    const value = timeLine[indexList[currentIndex]];

    if ((value && level === 0) || (!value && level === -1)) {
        reducedTimeLine[indexList[currentIndex]] = value;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex === indexList.length) {
        return reducedTimeLine;
    }

    const nextValue = timeLine[indexList[nextIndex]];

    const nextLevel = nextValue ? level + 1 : level - 1;

    reduceTimeLine(timeLine, indexList, reducedTimeLine, nextIndex, nextLevel);

    return reducedTimeLine;
}

export function transformMoviesTimeToTimeLine(movieTimes) {
    return movieTimes.reduce((timeLine, [start, stop]) => {
        timeLine[start] = true;
        timeLine[stop] = false;

        return timeLine;
    }, {});
}

export function reduceTagMovieTimes(tag, playList) {
    return _.reduce(tag.movies, (p, movies, movieNumber) => {
        if (!p[movieNumber]) {
            p[movieNumber] = [];
        }

        p[movieNumber].push(...movies);

        return p;
    }, playList);
}

const includedMoviesSelector = createSelector(
    (state) => state.common.movies,
    filtersSelector,
    (movies, filters) => {
        const filteredTags = filters.reduce((playList, tag) => {
            reduceTagMovieTimes(tag, playList);

            return playList;
        }, {});

        if (_.isEmpty(filteredTags)) {
            return movies.reduce((playList, movie) => {
                playList[movie.movieNumber] = [0, movie.length];

                return playList;
            }, {});
        }

        return filteredTags;
    }
);

export const playListSelector = createSelector(
    includedMoviesSelector,
    moviesByNumberSelector,
    (includedMovies, moviesByNumber) => (
        _.chain(includedMovies)
            .map((value, key) => ({
                movieNumber: key,
                description: moviesByNumber[key].description,
                startDate: moviesByNumber[key].startDate,
                startDateString: moviesByNumber[key].startDateString,
                endDateString: moviesByNumber[key].endDateString,
                times: value,
            }))
            .sortBy('startDate')
            .value()
    )
);
