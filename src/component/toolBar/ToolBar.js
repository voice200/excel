import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class ToolBar extends ExcelComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'ToolBar',
            listeners: [],
            ...options
        });
    }
    toHTML() {
        const materialIcons = ['format_bold', 'format_italic', 'format_underlined', 'format_align_left', 'format_align_center', 'format_align_right'];
        const iconRender = materialIcons.map(value => {
            const $el = $.create('span', 'material-icons').text(value).html();
            return $el;
        });
        return iconRender.join('');
    }
}
