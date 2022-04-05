// 用户的登录信息
const actions = {
    login(context, value) {
        context.commit("LOGIN", value);
    }
};
const mutations = {
    LOGIN(state, value) {
        state.schoolNumber = value.schoolNumber;
        state.status = value.status;
        state.token = value.token;
    }
};
const state = {
    schoolNumber : "",
    status : "",
    token : ""
};

export default {
    namespaced : true,
    actions,
    mutations,
    state
}