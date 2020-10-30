import {
    APPLY_STYLE, CHANGE_DATE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    TABLE_RESIZE
} from '@/redux/types';

export function rootReducer(state, action) {
    let field;
    let prevState;
    let val;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.data.id] = action.data.size;
            return {...state, [field]: prevState};
        case CHANGE_TEXT:
            prevState = state['dataState'] || {};
            prevState[action.data.id] = action.data.text;
            return {...state, currentText: action.data.text, dataState: prevState};
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data};
        case APPLY_STYLE:
            field = 'stylesState';
            val = state[field] || {};
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value};
            });
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            };
        case CHANGE_TITLE:
            return {...state, title: action.data};
        case CHANGE_DATE:
            return {...state, date: action.data};
        default: return state;
    }
}
