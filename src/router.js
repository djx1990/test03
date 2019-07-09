import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";


Vue.use(Router);
const router = new VueRouter({
  routes: [
    {
      name: 'PostIndex',
      path: "/posts",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/posts/Index.vue")
    },
    {
      name: 'PostEdit',
      path: "/posts/:id/edit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/posts/Edit.vue")
    },
    {
      name: 'PostNew',
      path: "/posts/new",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/posts/New.vue")
    },
    {
      name: 'PostShow',
      path: "/posts/:id",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/posts/Show.vue")
    },
    {
      name: 'UserIndex',
      path: "/users",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/users/Index.vue")
    },
    {
      name: 'UserEdit',
      path: "/users/:id/edit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/users/Edit.vue")
    },
    {
      name: 'UserLogin',
      path: "/users/login",
      meta: {
        layout: false,
        requiresAuth: false
      },
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/users/Login.vue")
    },
    {
      path: "/users/new",
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/users/New.vue")
    },
    {
      name: 'UserShow',
      path: "/users/:id",
      component: () =>
        import(/* webpackChunkName: "cdsign" */ "./views/users/Show.vue")
    },
    {
      name: 'Userposts',
      path: "/userposts/:id/posts",
      component: () =>
        import(/* webpackChunkName: "posts" */ "./views/users/userposts/Posts.vue")
    },
    {
      name: 'Userposts2',
      path: "/userposts/posts",
      component: () =>
        import(/* webpackChunkName: "posts" */ "./views/users/userposts/Posts.vue")
    },
    {
      name: 'Usershow',
      path: "/userposts/:id",
      component: () =>
        import(/* webpackChunkName: "posts" */ "./views/users/userposts/Show.vue")
    }
  ]
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     next({
//       path: "/users/login",
//       query: { redirect: to.fullPath }
//     });
//   } else {
//     next();
//   }
// });

export default router;
