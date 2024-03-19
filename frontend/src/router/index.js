import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import AboutMePage from '@/components/AboutMePage.vue';
import ChatPage from '@/components/ChatPage.vue';
import ChatDisplay from '@/components/ChatDisplay.vue';
import SignInPage from '@/components/SignInPage.vue';
import SignUpPage from '@/components/SignUpPage.vue';

const routes = [
    { path: '/', redirect: '/chat' },
    { path: '/chat', component: ChatPage },
    { path: '/chat/:conversationId', component: ChatDisplay },
    { path: '/home', component: HomePage },
    { path: '/about', component: AboutMePage },
    { path: '/signin', component: SignInPage },
    { path: '/signup', component: SignUpPage },
    { path: '/signout', redirect: '/signin' },
];

const routerConfig = {
  history: createWebHistory(process.env.BASE_URL),
  routes,
};

const router = createRouter(routerConfig);

export default router;
