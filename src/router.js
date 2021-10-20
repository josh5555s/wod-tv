import { createRouter, createWebHistory } from 'vue-router'

import StoreSelector from './components/StoreSelector.vue'
import LocationSpecials from './components/LocationSpecials.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: StoreSelector },
		{ path: '/:store', component: LocationSpecials },
	]
})


export default router