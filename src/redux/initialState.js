import {clone, dateLocal, storage} from '@core/utils';
import {defaultIDTitle, defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    title: defaultTitle,
    currentStyles: defaultStyles,
    date: dateLocal(new Date()),
    idTitle: defaultIDTitle
};
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;
export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
