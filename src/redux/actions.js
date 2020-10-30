import {
    APPLY_STYLE,
    CHANGE_DATE,
    CHANGE_ID_TITLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    CHANGE_TITLE,
    TABLE_RESIZE
} from '@/redux/types';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
}

export function changeStyle(data) {
   return {
       type: CHANGE_STYLES,
       data
   };
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    };
}
export function changeDate(data) {
    return {
        type: CHANGE_DATE,
        data
    };
}