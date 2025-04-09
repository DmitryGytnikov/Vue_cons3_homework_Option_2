import CreateTodo from '@/components/CreateTodo.vue'
import EditTodo from '@/components/EditTodo.vue'
import HomePageTodo from '@/components/HomePageTodo.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageTodo,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateTodo,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditTodo,
    },
  ],
})

export default router
