import {createSelector} from 'reselect';
import _ from 'lodash';

export const queryStringSelector = createSelector(
    (params) => params,
    (params) => (
        _.reduce(params, (paramsArray, param, key) => {
            if (_.isArray(param)) {
                const arrayKey = `${key}[]`;
                param.forEach((subParam) => paramsArray.push(`${arrayKey}=${subParam}`));
            }
            else {
                paramsArray.push(`${key}=${param}`);
            }

            return paramsArray;
        }, [])
        .join('&')
    )
);

export const paramsSelector = createSelector(
    (state) => state.common.query,
    (query) => (
        query.split('&').reduce((params, param) => {
            if (!param) {
                return params;
            }

            const [key, value] = param.split('=');
            const [, realKey, symbol] = key.match(/(\w+)(\[\])?/);

            if (symbol && params[realKey]) {
                params[realKey].push(value);
            }
            else if (symbol) {
                params[realKey] = [value];
            }
            else {
                params[realKey] = value;
            }

            return params;
        }, {})
    )
);
