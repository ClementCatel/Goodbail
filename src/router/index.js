import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../services/firebase'

import Rentals from '../views/Rentals.vue'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Generate from '../views/Generate.vue'
import Account from '../views/Account.vue'
import Profile from '../views/account/Profile.vue'
import Settings from '../views/account/Settings.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/rentals',
		name: 'Rentals',
		meta: { requiresAuth: true },
		component: Rentals,
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: { noAppBar: true },
	},
	{
		path: '/forgot-password',
		name: 'forgotPassword',
		component: ForgotPassword,
		meta: { noAppBar: true },
	},
	{
		path: '/reset-password',
		name: 'resetPassword',
		component: ResetPassword,
		meta: { noAppBar: true },
	},
	{
		path: '/generate/:id',
		name: 'generate',
		meta: { requiresAuth: true },
		component: Generate,
	},
	{
		path: '/account',
		meta: { requiresAuth: true },
		component: Account,
		children: [
			{
				path: '',
				name: 'profile',
				meta: { requiresAuth: true },
				component: Profile,
			},
			{
				path: 'account-settings',
				name: 'account-settings',
				meta: { requiresAuth: true },
				component: Settings,
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)

	auth.onAuthStateChanged(function(user) {
		if (requiresAuth && !user) {
			next('/')
		} else if (!requiresAuth && user) {
			next('/rentals')
		} else {
			next()
		}
	})
})

export default router
