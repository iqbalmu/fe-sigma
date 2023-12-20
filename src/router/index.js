import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RentFacility from '../views/RentFacility.vue'
import RentDetail from '../views/RentDetail.vue'
import Login from '../views/LoginView.vue'
import profileEdit from '../views/profileEdit.vue'
import history from '../views/History.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      name: 'home',
      component: HomeView ,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }

    },

    {
      path: '/RentDetail/:id',
      name: 'RentDetail',
      component: RentDetail ,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }

    },

    {
      path: '/RentFacility',
      name: 'RentFacility',
      component: RentFacility,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }

    },

    {
      path: '/profileEdit',
      name: 'profileEdit',
      component:profileEdit ,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }

    },

    {
      path: '/history',
      name: 'history',
      component:history ,
      meta: {
        requiresAuth: true // Add meta field to indicate protected route
      }

    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: NotFoundView
    // },
 

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = sessionStorage.getItem('token');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
   next();
}
});
export default router
