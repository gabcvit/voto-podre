import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import DeputadosView from './views/DeputadosView.vue';
import DeputadoDetailsView from './views/DeputadoDetailsView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Deputados',
    component: DeputadosView,
  },
  {
    path: '/deputado/:id',
    name: 'DeputadoDetails',
    component: DeputadoDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
