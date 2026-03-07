import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

// Mock the return value when calling useRoute() etc. in the script
vi.mock('vue-router', () => ({
	useRoute: () => ({
		path: '/',
		// params: { id: '1' }
	}),
	useRouter: () => ({
		push: vi.fn(), // Check if the push function has been called in the script
	}),
	RouterView: () => ({}),
	RouterLink: () => ({}),
}))

describe('testing App.vue', () => {
	it('testing title', () => {
		const wrapper = mount(App, {
			global: {
				// Definition for $route.fullPath in the template (HTML). It is referenced as a Vue global property in a different route from the one for the script.
				mocks: {
					$route: {
						fullPath: '/',
					},
				},
			},
		})

		expect(wrapper.find('h1').exists()).toBe(true)
		expect(wrapper.find('h1').text()).toBe('tonyu grapefruit note')
	})
})
