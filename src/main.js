import './scss/index.scss';
import {Excel} from '@/component/excel/Excel';
import {Header} from '@/component/header/Header';
import {ToolBar} from '@/component/toolBar/ToolBar';
import {Formula} from '@/component/formula/Formula';
import {Table} from '@/component/table/Table';
const excel = new Excel('#app',{
    components: [Header, ToolBar, Formula, Table]
});

excel.render();
// excel.getRoot();
