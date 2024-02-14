import {STATUSES} from '@/store/consts'
import jsonApi from "@/api";

export default {
    namespaced: true,

    state: {
        statuses: {
            data: []
        }
    },

    mutations: {
        [STATUSES.SET_STATUSES_DATA](state, payload) {
            state.statuses = payload;
        }
    },

    actions: {
        async [STATUSES.FETCH_STATUSES_DATA]({ commit }, data) {
            const response = await jsonApi.get('statuses', {
                params: data
            });
            commit(STATUSES.SET_STATUSES_DATA, response.data);
        },
    },

    getters: {
        [STATUSES.GET_STATUSES_DATA](state) {
            return state.statuses;
        },
    },
}