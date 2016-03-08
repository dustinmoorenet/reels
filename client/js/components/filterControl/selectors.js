import {createSelector} from 'reselect';

import {filtersSelector} from 'js/common/filters/selectors';

export const searchedTagsSelector = createSelector(
    (state) => state.components.filterControl.searchText,
    (state) => state.common.tags,
    filtersSelector,
    (searchText, tags, filters) => {
        const searchTextRegExp = new RegExp(searchText, 'i');

        return tags.reduce((searchedTags, tag) => {
            if (tag.label.search(searchTextRegExp) !== -1) {
                searchedTags.push({
                    ...tag,
                    isIncluded: !!filters.find((filter) => filter.id === tag.id),
                });
            }

            return searchedTags;
        }, []);
    }
);
