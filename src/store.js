import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const key = 'user';
export default new Vuex.Store({
    state: {
        LoginDialogVisible: false,        //登录注册框是否显示
        RegisterDialogVisible: false,
        IsLogin: false,                    //是否登录
        user: null,                        //用户信息
        actionIP: 'http://39.106.156.178:8080'  //服务器
        // actionIP: 'http://172.17.27.5:8080'        //班耀强服务器
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
