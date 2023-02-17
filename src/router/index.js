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
        path: '/reservasi',
        name: 'reservasi.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/reservasi/IndexReservasi.vue')
    },
    {
        path: '/kota',
        name: 'kota.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/kota/IndexKota.vue')
    },
    {
        path: '/createkota',
        name: 'kota.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/kota/CreateKota.vue')
    },
    {
        path: '/editkota/:id',
        name: 'kota.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/kota/EditKota.vue')
    },
    {
        path: '/paket',
        name: 'paket.index',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/IndexPaket.vue')
    },
    {
        path: '/paketdet',
        name: 'paket.detail',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/DetailPaket.vue')
    },
    {
        path: '/createpaket',
        name: 'paket.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/paket/CreatePaket.vue')
    },
    {
        path: '/editpaket/:id',
        name: 'paket.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/paket/EditPaket.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router