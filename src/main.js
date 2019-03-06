import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);
axios.defaults.withCredentials=true;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {

    let getFlag = localStorage.getItem("Flag");

    if(getFlag === "isLogin"){

        store.state.IsLogin = true
        next()
    }else{
        if(to.meta.IsLogin){
            next({
                path: '/',
            })
        }else{
            next()
        }

    }
});
router.afterEach(() => {
    window.scroll(0, 0);
});