export const BASE = 'components/filterControl';
export const SET_FILTER_SEARCH = `${BASE}/SET_FILTER_SEARCH`;

export function setSearchText(value) {
    return {
        type: SET_FILTER_SEARCH,
        payload: value,
    };
}
