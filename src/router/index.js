import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: () => import("@/views/Wallet.vue") },
        { path: "/login", component: () => import("@/views/auth/Login.vue") },
        // { path: "register", component: () => import("../views/auth/Register.vue") },
        // { path: "exchange", component: () => import("../views/auth/Exchange.vue") },
        // { path: "transactions", component: () => import("../views/auth/Transactions.vue") },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});
