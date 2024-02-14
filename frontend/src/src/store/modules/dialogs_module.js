import { DIALOGS as DIALOG_MODULE } from "@/store/consts";

export default {
    namespaced: true,

    state: {
        //объект диалоговых окон
        dialogs: {},
    },

    mutations: {
        [DIALOG_MODULE.SET_DIALOGS](state, payload) {
            state.dialogs = payload;
        },
    },

    actions: {
        /** Открывает диалоговые окна */
        [DIALOG_MODULE.ACTIONS_DIALOGS_OPEN]({ commit, state }, data) {
            if (!state.dialogs[Object.keys(data)[0]]) {
                commit(DIALOG_MODULE.SET_DIALOGS, {
                    ...state.dialogs,
                    ...data,
                });
            }
        },

        /** Закрывает одельные диалоговые окна */
        [DIALOG_MODULE.ACTIONS_DIALOGS_CLOSE]({ commit, state }, data) {
            if (state.dialogs[data]) {
                delete state.dialogs[data];
                const newState = state.dialogs;
                commit(DIALOG_MODULE.SET_DIALOGS, {
                    ...newState,
                });
            }
        },
    },

    getters: {
        [DIALOG_MODULE.GET_DIALOGS](state) {
            return state.dialogs;
        },
    },
};