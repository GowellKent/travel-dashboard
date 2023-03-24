//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'login.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/login/IndexLogin.vue')
    },
    {
        path: '/dashboard',
        name: 'dash.board',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/DashBoard.vue')
    },
    {
        path: '/reservasi',
        name: 'reservasi.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/IndexReservasi.vue')
    },
    {
        path: '/editres/:id',
        name: 'reservasi.edit',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/EditReservasi.vue')
    },
    {
        path: '/createres',
        name: 'reservasi.create',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/CreateReservasi.vue')
    },
    {
        path: '/customres',
        name: 'reservasi.custom',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/CustomReservasi.vue')
    },
    {
        path: '/paket',
        name: 'paket.index',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/IndexPaket.vue')
    },
    {
        path: '/paketdet/:id',
        name: 'paket.detail',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/DetailPaket.vue')
    },
    {
        path: '/createpaket',
        name: 'paket.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/paket/CreatePaket.vue')
    },
    {
        path: '/createdetail',
        name: 'detail.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/paket/CreateDetail.vue')
    },
    {
        path: '/editpaket/:id',
        name: 'paket.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/EditPaket.vue')
    },
    {
        path: '/objek',
        name: 'objek.index',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/objek/IndexObjek.vue')
    },
    {
        path: '/editobjek/:id',
        name: 'objek.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/objek/EditObjek.vue')
    },
    {
        path: '/createobjek',
        name: 'objek.create',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/objek/CreateObjek.vue')
    },
    {
        path: '/indexbus',
        name: 'bus.index',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/bus/IndexBus.vue')
    },
    {
        path: '/addbus',
        name: 'bus.create',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/bus/CreateBus.vue')
    },
    {
        path: '/editbus/:id',
        name: 'bus.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/bus/EditBus.vue')
    },
    {
        path: '/*',
        component:404
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router