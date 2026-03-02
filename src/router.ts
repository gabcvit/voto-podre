import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import DeputadosView from './views/DeputadosView.vue';
import DeputadoDetailsView from './views/DeputadoDetailsView.vue';
import PautaDetailsView from './views/PautaDetailsView.vue';

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
  {
    path: '/pauta/:id',
    name: 'PautaDetails',
    component: PautaDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
