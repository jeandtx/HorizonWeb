import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '@/views/LandingPage.vue'

const routes = [
    {
        path: '/',
        component: Landing
    },
    {
        path: '/info',
        component: Landing
    },
    {
        path: '/rgpd',
        component: Landing
    },
    {
        path: '/horizon',
        component: Landing
    },
    {
        path: '/blog',
        component: () => import('@/views/Blog/BlogList.vue')
    },
    {
        path: '/blog/new',
        component: () => import('@/views/Blog/BlogNew.vue')
    },
    {
        path: '/blog/show/1',
        component: () => import('@/views/Blog/BlogShow.vue')
    },
    {
        path: '/blog/admin',
        component: () => import('@/views/Blog/BlogAdmin.vue')
    },
    {
        path: '/post/:id',
        component: () => import('@/views/Post/ThreadCompactView.vue'),
    },

    {
        path: '/new-post',
        component: () => import('@/views/Post/PostNew.vue')
    },

    {
        path: '/admin',
        component: () => import('@/views/Dashboard/AdminDashboard.vue')
    },

    {
        path: '/file-upload',
        component: () => import('@/views/FileUpload.vue')
    },

    {
        path: '/posts',
        component: () => import('@/views/Post/PostList.vue')
    },

    {
        path: '/test',
        component: () => import('@/views/Test/TestPage.vue')
    },

    {
        path: '/my-account',
        component: () => import('@/views/UserSettings.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
