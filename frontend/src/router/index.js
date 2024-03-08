import { createRouter, createWebHistory } from 'vue-router';

const ChatDisplay = () => import('@/components/ChatDisplay')
const StartConversation = () => import('@/components/StartConversation')
const routes = [
    {
        path: '/',
        name: 'StartConversation',
        component: StartConversation,
    },
    {
        path: '/chat/:conversationId',
        name: 'ChatDisplay',
        component: ChatDisplay,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router; 