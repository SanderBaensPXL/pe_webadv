import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentListView from '../views/StudentListView.vue'
import AddStudentView from "@/views/AddStudentView.vue";
import AddResultView from "@/views/AddResultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentListView
    },
    {
      path: '/add-student',
      name: 'AddStudent',
      component: AddStudentView
    },
    {
      path: '/add-result',
      name: 'AddResult',
      component: AddResultView
    },
    {
      path: '/add-result/:studentId',
      name: 'AddResult',
      component: AddResultView,
      props: true,
    }
  ]
})

export default router
