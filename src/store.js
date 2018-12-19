import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const key = 'user';
export default new Vuex.Store({
    state: {
        LoginDialogVisible: false,        //登录注册框是否显示
        RegisterDialogVisible: false,
        userInfoDialogVisible: false,
        IsLogin: false,                    //是否登录
        user: null,                        //用户信息
        token:''
    },
    getters: {
        getStorge(state){
            if(!state.user){
                state.user = JSON.parse(localStorage.getItem(key));
            }
            return state.user;
        }
    },
    mutations: {
        loginShow(state){
            state.LoginDialogVisible = true;
        },
        loginHide(state){
            state.LoginDialogVisible = false;
        },
        registerShow(state){
            state.RegisterDialogVisible = true;
        },
        registerHide(state){
            state.RegisterDialogVisible = false;
        },
        login(state){
            state.IsLogin = true;
        },
        logout(state){
            state.IsLogin = false;
        },
        userInfoShow(state){
            state.userInfoDialogVisible = true
        },
        userInfoHide(state){
            state.userInfoDialogVisible = false
        },
        $_setStorage (state, value) {
            state.user = value;
            localStorage.setItem(key, JSON.stringify(value));
        },
        $_removeStorage (state) {
            state.user = null;
            localStorage.removeItem(key);
        }
  },
  actions: {

  }
})
