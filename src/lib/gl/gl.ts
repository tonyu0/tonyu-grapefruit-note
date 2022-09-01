/** WebGL rendering  */

/** Responsible for setting up a WebGL rendering context. */
export class GLUtilities {
	/**
	 * Initializes WebGL, potentially using the canvas with an assigned id
	 * @param elementId The id for the element to search for
	 */
	static gl: WebGLRenderingContext
	public static initialize(): HTMLCanvasElement {
		const canvas = document.createElement('canvas') as HTMLCanvasElement
		const content = document.getElementById('content') as HTMLBodyElement
		content.appendChild(canvas)
		// document.body.appendChild(canvas)

		const _gl = canvas.getContext('webgl', { stencil: true })
		if (_gl === null) {
			throw new Error('Unable to initialize WebGL!!!')
		}
		this.gl = _gl
		return canvas
	}
}
