const BASE = 'components';
export const SET_CURRENT = `${BASE}/SET_CURRENT`;

export function setCurrent(value) {
    return {
        type: SET_CURRENT,
        payload: value,
    };
}
