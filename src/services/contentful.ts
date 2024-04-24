import * as contentful from 'contentful'
export const Contentful = contentful.createClient({
	space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
})
