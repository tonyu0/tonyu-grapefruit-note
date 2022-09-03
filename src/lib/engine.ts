import { GLUtilities } from '@/lib/gl/gl'
import GLShader from '@/lib/gl/glShader'
import { AttrInfo, GLBuffer } from '@/lib/gl/glBuffer'

/** 中枢 */
export default class Engine {
	// canvas, shader, bufferをくらすとして管理
	private _canvas: HTMLCanvasElement
	private _shader: GLShader
	private _buffer: GLBuffer

	/** メインループを開始する */
	public constructor() {
		this._canvas = GLUtilities.initialize()
		GLUtilities.gl.clearColor(0.6, 0, 0.9, 1)
		// GLUtilities.gl.enable(GLUtilities.gl.CULL_FACE)
		GLUtilities.gl.enable(GLUtilities.gl.DEPTH_TEST)
		GLUtilities.gl.depthFunc(GLUtilities.gl.LEQUAL)
		GLUtilities.gl.enable(GLUtilities.gl.STENCIL_TEST)

		this._shader = this.loadShaders()
		this._shader.use()
		this._buffer = this.createBuffer()
		this.addEventListener()
		this.resize()
		this.loop()
	}

	/** 画面のリサイズに対応する */
	public resize(): void {
		if (this._canvas !== undefined) {
			this._canvas.width = window.innerWidth / 2
			this._canvas.height = window.innerHeight / 2
			GLUtilities.gl.viewport(0, 0, this._canvas.width, this._canvas.height)
		}
	}

	public addEventListener(): void {
		const mouseMove = (e: MouseEvent) => {
			const cw = this._canvas.width
			const ch = this._canvas.height
			const mx = e.offsetX / cw
			const my = e.offsetY / ch
			console.log(mx, my)
		}
		this._canvas.addEventListener('mousemove', mouseMove, true)
	}

	// javascript is single-threaded, and for inifinite loop, we need an event based loop.
	/** main loop */
	public loop(): void {
		GLUtilities.gl.clear(GLUtilities.gl.COLOR_BUFFER_BIT)
		// set uniforms
		const colorPosition = this._shader.getUniformLocation('u_color')
		GLUtilities.gl.uniform4f(colorPosition, 1, 0.5, 0, 1)

		this._buffer.bind()
		this._buffer.draw()
		requestAnimationFrame(this.loop.bind(this))
	}

	private createBuffer(): GLBuffer {
		this._buffer = new GLBuffer(3)
		const positionAttribute = new AttrInfo()
		positionAttribute.location = this._shader.getAttributeLocation('position')
		positionAttribute.offset = 0
		positionAttribute.size = 3
		this._buffer.addAttributeLocation(positionAttribute)

		const vertices = [
			// x, y, z
			0, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, 0, 0, 0, 0, 0,
		]
		this._buffer.pushBackData(vertices)
		this._buffer.upload()
		this._buffer.unbind()
		return this._buffer
	}

	private loadShaders(): GLShader {
		const vertexShaderSource = `
attribute vec3 position;
uniform   mat4 mvpMatrix;
void main() {
    gl_Position =  vec4(position, 1.0);
}`
		const fragmentShaderSource = `
precision mediump float;

uniform vec4 u_color;
void main() {
    gl_FragColor = u_color;
}`
		return new GLShader('basic', vertexShaderSource, fragmentShaderSource)
	}
}
