import Vue from 'vue'
import VueRouter from 'vue-router'
import EditView from '../components/EditView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Edit View',
        component: EditView
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router