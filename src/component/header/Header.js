import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        });
    }
    toHTML() {
        const $input = $.create('input', 'input').setAttribute('value','Новая таблица');
        const $divButton = $.create('div', 'button');
        $divButton.append($.create('span', 'material-icons').text('exit_to_app'));
        $divButton.append( $.create('span', 'material-icons').text('delete'));
        return $input.html() + $divButton.html();
    }
}
