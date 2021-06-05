import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        doNotWantLogin: sessionStorage.getItem('doNotWantLogin'),
        token: localStorage.getItem('token'),
        // userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        userInfo: sessionStorage.getItem('userInfo'),
        is_login: 0,
    },
    mutations: {
        // set
        is_login: function (state, is_login) {
            state.is_login = is_login;
        },
        userInfo: function (state, userInfo) {
            state.userInfo = userInfo
        },
        WANT_LOGIN: (state) => {
            // sessionStorage.removeItem('doNotWantLogin')
            state.doNotWantLogin = null
        },
        DONT_WANT_LOGIN: (state) => {
            // sessionStorage.setItem('doNotWantLogin', '1')
            state.doNotWantLogin ='1'
        },
        token: function (state, token) {
            state.token = token;
        },
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
            // sessionStorage.setItem('userInfo', JSON.stringify(''))
            sessionStorage.removeItem('userInfo')
        },
        LOGIN: state => {
            state.wantLogin = true
            state.is_login = 1
        },
        LOGOUT: state => {
            state.is_login = 0
            state.token = ''
            state.userInfo = {}
            localStorage.setItem('token', '')
            // sessionStorage.setItem('userInfo', JSON.stringify(''))
            sessionStorage.removeItem('userInfo')
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
    modules: {},
    plugins: [vuexAlong({
        name: 'vuex-along',
        local: {
            list: ['userInfo', 'is_login', 'token', 'wantLogin'],
            isFilter: true
        },
        session: false
    })]
})