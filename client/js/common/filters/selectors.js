import {createSelector} from 'reselect';

import {paramsSelector} from 'js/common/selectors';

export const filtersSelector = createSelector(
    (state) => state.common.tags,
    paramsSelector,
    (tags, params) => (params.filters || []).map((filter) => tags.find((tag) => tag.id === +filter))
);
