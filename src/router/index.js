import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', name: 'wallet', component: () => import("@/views/Wallet.vue") },
        { path: "/login", name: 'login', component: () => import("@/views/auth/Login.vue") },
        { path: "/register", name: 'register', component: () => import("@/views/auth/Register.vue") },
        { path: "/exchange", name: 'exchange', component: () => import("@/views/exchange/Exchange.vue") },
        { path: "/transactions", name: 'transactions', component: () => import("@/views/exchange/Transactions.vue") },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});
