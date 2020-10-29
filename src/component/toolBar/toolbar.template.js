import {$} from '@core/dom';

export function createToolbar(state) {
    const materialIcons = [
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
        },
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        }
    ];
    const iconRender = materialIcons.map(value => {
        const key = Object.keys(value.value);
        const dataValue = `${key}:${value.value[key]}`;
        const $el = $.create('span', 'material-icons')
            .text(value.icon)
            .setAttr({
                'data-type': 'button',
                'data-value': dataValue
            });
        if (value.active) {
            $el.addClass('active');
        }
        return $el.html();
    });
    return iconRender.join('');
}
