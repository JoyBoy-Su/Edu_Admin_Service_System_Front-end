// 用户的登录信息
const actions = {
    storeSession(context, value) {
        context,commit("STORE_SESSION", value);
    }
};
const mutations = {
    STORE_SESSION(state, value) {
        state.user = value.user;
        state.status = value.status;
        state.token = value.token;
    }
};
const state = {
    user : "",
    status : "",
    token : ""
};

export default {
    namespaced : true,
    actions,
    mutations,
    state
}