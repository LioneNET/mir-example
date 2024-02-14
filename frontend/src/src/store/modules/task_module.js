import {TASKS} from '@/store/consts'
import jsonApi from "@/api";

export default {
    namespaced: true,

    state: {
        tasks: {
            data: []
        },

        task: {
            data: {}
        }
    },

    mutations: {
        [TASKS.SET_TASKS_DATA](state, payload) {
            state.tasks = payload;
        },
        [TASKS.SET_TASK_DATA](state, payload) {
            state.task = payload;
        }
    },

    actions: {
        async [TASKS.FETCH_TASKS_DATA]({ commit }, data) {
            const response = await jsonApi.get('tasks', {
                params: data
            });
            commit(TASKS.SET_TASKS_DATA, response.data);
        },
        async [TASKS.FETCH_TASK_DATA]({ commit }, id) {
            const response = await jsonApi.get(`tasks/${id}`);
            commit(TASKS.SET_TASK_DATA, response.data);
        },
        async [TASKS.UPDATE_TASKS_DATA](_, {id, data}) {
            await jsonApi.post(`tasks/${id}`, {
                ...data,
                _method: "PUT"
            });
        },
        async [TASKS.STORE_TASKS_DATA](_, data) {
            await jsonApi.post(`tasks`, data);
        },
        async [TASKS.DELETE_TASKS_DATA](_, id) {
            await jsonApi.post(`tasks/${id}`, {
                _method: "DELETE"
            });
        },
        async [TASKS.CHANGE_TASK_STATUS](_, {id, data}) {
            await jsonApi.post(`tasks/${id}/set-status`, data);
        },
    },

    getters: {
        [TASKS.GET_TASKS_DATA](state) {
            return state.tasks;
        },
        [TASKS.GET_TASK_DATA](state) {
            return state.task;
        },
    }
}