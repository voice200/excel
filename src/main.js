import './scss/index.scss';
import {Excel} from '@/component/excel/Excel';
import {Header} from '@/component/header/Header';
import {ToolBar} from '@/component/toolBar/ToolBar';
import {Formula} from '@/component/formula/Formula';
import {Table} from '@/component/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';

const store = createStore(rootReducer);
const excel = new Excel('#app', {
    components: [Header, ToolBar, Formula, Table],
    store
});

excel.render();
// excel.getRoot();
