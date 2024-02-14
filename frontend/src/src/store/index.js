import Vue from 'vue'
import Vuex from 'vuex'
import tasks from '@/store/modules/task_module'
import statuses from '@/store/modules/status_module'
import dialogs from "@/store/modules/dialogs_module";
import {
    TASKS,
    STATUSES,
    DIALOGS
} from "@/store/consts";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        [TASKS.NAME]: tasks,
        [STATUSES.NAME]: statuses,
        [DIALOGS.NAME]: dialogs,
    }
})
