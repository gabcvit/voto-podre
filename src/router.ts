import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';
import DeputadosView from './views/DeputadosView.vue';
import DeputadoDetailsView from './views/DeputadoDetailsView.vue';
import PautasView from './views/PautasView.vue';
import PautaDetailsView from './views/PautaDetailsView.vue';
import AboutView from './views/AboutView.vue';
import GlossaryView from './views/GlossaryView.vue';
import PrivacyPolicyView from './views/PrivacyPolicyView.vue';
import TermsOfUseView from './views/TermsOfUseView.vue';
import SupportView from './views/SupportView.vue';

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
    path: '/pautas',
    name: 'Pautas',
    component: PautasView,
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
  {
    path: '/glossario',
    name: 'Glossario',
    component: GlossaryView,
  },
  {
    path: '/privacidade',
    name: 'Privacidade',
    component: PrivacyPolicyView,
  },
  {
    path: '/termos',
    name: 'Termos',
    component: TermsOfUseView,
  },
  {
    path: '/apoio',
    name: 'Apoio',
    component: SupportView,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
