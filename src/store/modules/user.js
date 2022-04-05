// 用户的登录信息
const actions = {
    login(context, value) {
        context.commit("LOGIN", value);
    },
    logout(context, value) {
        context.commit("LOGOUT", value);
    }
};
const mutations = {
    LOGIN(state, value) {
        state.name = value.username;
        state.type = value.type;
        state.schoolNumber = value.schoolNumber;
        state.login = true;
    },
    LOGOUT(state, value) {
        state.name = "";
        state.type = "";
        state.schoolNumber = "";
        state.login = false;
    }
};
const state = {
    name : "",
    type : "",
    schoolNumber : "",
    login : false
};

export default {
    namespaced : true,
    actions,
    mutations,
    state
}