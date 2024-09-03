import { GLUtilities } from '@/lib/gl/gl'
import GLShader from '@/lib/gl/glShader'
import { AttrInfo, GLBuffer } from '@/lib/gl/glBuffer'
export default class Engine {
	private _canvas: HTMLCanvasElement
	private _shader: GLShader | undefined
	private _vertexBuffer: GLBuffer
	private _indexBuffer: GLBuffer
	private _startTime: number
	private _mouseX = 0
	private _mouseY = 0
	private _isLoopStopped = false

	public constructor() {
		this._startTime = new Date().getTime()
		this._canvas = GLUtilities.initialize()
		GLUtilities.gl.clearColor(0.6, 0, 0.9, 1)
		// GLUtilities.gl.enable(GLUtilities.gl.CULL_FACE)
		GLUtilities.gl.enable(GLUtilities.gl.DEPTH_TEST)
		GLUtilities.gl.depthFunc(GLUtilities.gl.LEQUAL)
		GLUtilities.gl.enable(GLUtilities.gl.STENCIL_TEST)
		this._vertexBuffer = new GLBuffer(0)
		this._indexBuffer = new GLBuffer(0)
		this.addEventListener()
		this.resize()
		this.loop()
	}

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
			this._mouseX = e.offsetX / cw
			this._mouseY = e.offsetY / ch
		}
		this._canvas.addEventListener('mousemove', mouseMove, true)
	}

	// javascript is single-threaded, and for inifinite loop, we need an event based loop.
	/** main loop */
	public loop(): void {
		GLUtilities.gl.clear(GLUtilities.gl.COLOR_BUFFER_BIT)
		// const colorPosition = this._shader.getUniformLocation('u_color')
		// GLUtilities.gl.uniform4f(colorPosition, 1, 0.5, 0, 1)
		const time = (new Date().getTime() - this._startTime) * 0.001
		GLUtilities.gl.clearColor(0, 0, 0, 0)
		GLUtilities.gl.clearDepth(1.0)
		GLUtilities.gl.clearStencil(0)
		GLUtilities.gl.clear(
			GLUtilities.gl.COLOR_BUFFER_BIT | GLUtilities.gl.DEPTH_BUFFER_BIT | GLUtilities.gl.STENCIL_BUFFER_BIT,
		) // canvas初期化

		if (this._shader) {
			this._shader.use() // always use the target shader before taking the uniform locations
			const timeUniformLocation = this._shader.getUniformLocation('time')
			const mouseUniformLocation = this._shader.getUniformLocation('mouse')
			const resolutionUniformLocation = this._shader.getUniformLocation('resolution')
			if (timeUniformLocation) {
				GLUtilities.gl.uniform1f(timeUniformLocation, time)
			}
			if (mouseUniformLocation) {
				GLUtilities.gl.uniform2f(mouseUniformLocation, this._mouseX, this._mouseY)
			}
			if (resolutionUniformLocation) {
				GLUtilities.gl.uniform2f(resolutionUniformLocation, this._canvas.width, this._canvas.height)
			}

			this._vertexBuffer.bind()
			this._indexBuffer.bind()
			this._indexBuffer.draw()
		}

		if(!this._isLoopStopped) {
			requestAnimationFrame(this.loop.bind(this))
		}
	}

	public stopLoop() {
		this._isLoopStopped = true
	}

	private createVertexBuffer() {
		this._vertexBuffer = new GLBuffer(3, GLUtilities.gl.FLOAT, GLUtilities.gl.ARRAY_BUFFER, GLUtilities.gl.TRIANGLES)

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const attributeLocations: GLint[] = [this._shader!.getAttributeLocation('position')]
		const attributeStrides: number[] = [3]
		const vertices = [
			// x, y, z
			-1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0,
		]
		let currentOffset = 0
		for (let i = 0; i < attributeLocations.length; ++i) {
			const attributeInfo = new AttrInfo()
			attributeInfo.location = attributeLocations[i]
			attributeInfo.offset = currentOffset
			attributeInfo.size = attributeStrides[i]
			this._vertexBuffer.addAttributeLocation(attributeInfo)
			currentOffset += attributeStrides[i]
		}

		this._vertexBuffer.pushBackData(vertices)
		this._vertexBuffer.upload()
		this._vertexBuffer.unbind()
	}
	private createIndexBuffer() {
		this._indexBuffer = new GLBuffer(
			1,
			GLUtilities.gl.UNSIGNED_SHORT,
			GLUtilities.gl.ELEMENT_ARRAY_BUFFER,
			GLUtilities.gl.TRIANGLES,
		)
		const indices = [0, 2, 1, 1, 2, 3]
		this._indexBuffer.pushBackData(indices)
		this._indexBuffer.upload()
		this._indexBuffer.unbind()
	}

	public loadShaders(vertexShaderSource: string, fragmentShaderSource: string): void {
		this._shader = new GLShader('basic', vertexShaderSource, fragmentShaderSource)
		this.createVertexBuffer()
		this.createIndexBuffer()
	}
}
