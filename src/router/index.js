import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "CinemaApp",
    component: () =>
      import(/* webpackChunkName: "cinemaposter" */ "../views/CinemaApp.vue"),
  },
  {
    path: "/seances/:id",
    name: "Seances",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CinemaSeances.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
