import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';
import DeputadosView from './views/DeputadosView.vue';
import DeputadoDetailsView from './views/DeputadoDetailsView.vue';
import PautasPodresView from './views/PautasPodresView.vue';
import PautaDetailsView from './views/PautaDetailsView.vue';
import AboutView from './views/AboutView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/deputados',
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
    path: '/pautas-podres',
    name: 'PautasPodres',
    component: PautasPodresView,
  },
  {
    path: '/pauta/:id',
    name: 'PautaDetails',
    component: PautaDetailsView,
    props: true,
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
