import { GLUtilities } from '@/lib/gl/gl'

/**
 * Represents a WebGL shader.
 * */
export default class GLShader {
	private _name: string
	private _program: WebGLProgram = {}
	private _attributes: { [name: string]: number } = {}
	private _uniforms: { [name: string]: WebGLUniformLocation } = {}

	/**
	 * Creates a new shader.
	 * @param name The name of shader.
	 * @param vertexSource The source of the vertex shader.
	 * @param fragmentSource The source of the fragment shader.
	 */
	public constructor(name: string, vertexSource: string, fragmentSource: string) {
		this._name = name
		const vertexShader = this.loadShader(vertexSource, GLUtilities.gl.VERTEX_SHADER)
		const fragmentShader = this.loadShader(fragmentSource, GLUtilities.gl.FRAGMENT_SHADER)
		if (vertexShader && fragmentShader) {
			this.createProgram(vertexShader, fragmentShader)
			this.detectAttributes()
			this.detectUniforms()
		}
	}

	/** The name of this shader */
	public get name(): string {
		return this._name
	}

	/**
	 * Use this shader
	 * */
	public use(): void {
		GLUtilities.gl.useProgram(this._program)
	}

	/**
	 * Get the location of an attribute with the provided name.
	 * @param name The name of attribute
	 */
	public getAttributeLocation(name: string): number {
		if (this._attributes[name] === undefined) {
			throw new Error(`Unable to find attribute named '${name}' in shader named '${this._name}`)
		}
		return this._attributes[name]
	}
	/**
	 * Get the location of an uniform with the provided name.
	 * @param name The name of uniform
	 */
	public getUniformLocation(name: string): WebGLUniformLocation | undefined {
		return this._uniforms[name]
	}

	private loadShader(source: string, shaderType: number): WebGLShader | null {
		const _shader = GLUtilities.gl.createShader(shaderType)
		if (!_shader) {
			return null
		}
		const shader: WebGLShader = _shader
		GLUtilities.gl.shaderSource(shader, source)
		GLUtilities.gl.compileShader(shader)
		const error = GLUtilities.gl.getShaderInfoLog(shader)
		if (error !== '') {
			throw new Error("Error compiling shader: '" + this._name + "': " + error)
		}

		return shader
	}

	private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
		const _program = GLUtilities.gl.createProgram()
		if (!_program) {
			return
		}
		this._program = _program
		GLUtilities.gl.attachShader(this._program, vertexShader)
		GLUtilities.gl.attachShader(this._program, fragmentShader)

		GLUtilities.gl.linkProgram(this._program)
		const error = GLUtilities.gl.getProgramInfoLog(this._program)
		if (error !== '') {
			throw new Error("Error linking shader: '" + this._name + "': " + error)
		}
	}

	private detectAttributes(): void {
		const attributeCount = GLUtilities.gl.getProgramParameter(this._program, GLUtilities.gl.ACTIVE_ATTRIBUTES)
		for (let i = 0; i < attributeCount; ++i) {
			const attributeInfo: WebGLActiveInfo | null = GLUtilities.gl.getActiveAttrib(this._program, i)
			if (!attributeInfo) {
				break
			}
			this._attributes[attributeInfo.name] = GLUtilities.gl.getAttribLocation(this._program, attributeInfo.name)
		}
	}

	private detectUniforms(): void {
		const uniformCount = GLUtilities.gl.getProgramParameter(this._program, GLUtilities.gl.ACTIVE_UNIFORMS)
		for (let i = 0; i < uniformCount; ++i) {
			const uniformInfo: WebGLActiveInfo | null = GLUtilities.gl.getActiveUniform(this._program, i)
			if (!uniformInfo) {
				break
			}
			const uniformLocation: WebGLUniformLocation | null = GLUtilities.gl.getUniformLocation(
				this._program,
				uniformInfo.name,
			)
			if (!uniformLocation) {
				break
			}
			this._uniforms[uniformInfo.name] = uniformLocation
		}
	}
}
