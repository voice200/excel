import {Page} from '@core/Page';
import {Excel} from '@/component/excel/Excel';
import {Header} from '@/component/header/Header';
import {ToolBar} from '@/component/toolBar/ToolBar';
import {Formula} from '@/component/formula/Formula';
import {Table} from '@/component/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
    return 'excel:' + param;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        const state = storage(storageName(params));
        const store = createStore(rootReducer, normalizeInitialState(state));

        const stateListener = debounce(state =>{
        storage(storageName(this.params), state);
        }, 300);
        store.subscribe(stateListener);
   this.excel = new Excel({
    components: [Header, ToolBar, Formula, Table],
      store
    });
    return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }
    destroy() {
        this.excel.destroy();
    }
}
