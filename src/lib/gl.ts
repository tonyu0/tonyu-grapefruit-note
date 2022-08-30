/** WebGL rendering  */

/** Responsible for setting up a WebGL rendering context. */
export class GLUtilities {
    /**
     * Initializes WebGL, potentially using the canvas with an assigned id
     * @param elementId The id for the element to search for
     */
    public static initialize(): [HTMLCanvasElement, WebGLRenderingContext] {
        const canvas = document.createElement('canvas') as HTMLCanvasElement
        const content = document.getElementById('content') as HTMLBodyElement
        content.appendChild(canvas)
        // document.body.appendChild(canvas)

        const gl: WebGLRenderingContext | null = canvas.getContext('webgl', { stencil: true })
        if (gl === undefined) {
            throw new Error('Unable to initialize WebGL!!!')
        }
        return [canvas, gl!]
    }
}
