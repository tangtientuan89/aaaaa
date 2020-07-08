import Vuex from 'vuex'
import Vue from "vue"
import restaurant from './modules/restaurant'
Vue.use(Vuex)
const store = new Vuex.Store({
modules:{
    restaurant:restaurant
}
})
export default store