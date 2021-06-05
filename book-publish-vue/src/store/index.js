import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        wantLogin: true,
        token: localStorage.getItem('token'),
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        is_login: 0,
    },
    mutations: {
        // set
        SET_TOKEN: (state, token) => {
            state.token = '' /*token*/
            localStorage.setItem('token', token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem('token', '')
            sessionStorage.setItem('userInfo', JSON.stringify(''))
        },
        CANCEL_LOGIN: state => {
            state.wantLogin = false
        },
        LOGIN: state => {
            state.wantLogin = true
        },
        LOGOUT: state => {
            state.is_login = 0
            state.token = ''
            state.userInfo = {}
            localStorage.setItem('token', '')
            sessionStorage.setItem('userInfo', JSON.stringify(''))
        }
    },
    getters: {
        // get
        getUser: state => {
            return state.userInfo
        },
        get_is_login(state) {
            return state.is_login
        }
    },
    actions: {},
    modules: {}
})