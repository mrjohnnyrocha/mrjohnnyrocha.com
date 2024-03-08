import { createRouter, createWebHistory } from 'vue-router';
import StartConversation from '@/components/StartConversation';
import ChatDisplay from '@/components/ChatDisplay';

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