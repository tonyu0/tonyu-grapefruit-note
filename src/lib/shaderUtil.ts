import { GLUtilities } from '@/lib/gl/gl'

export enum ShaderType {
	vertex,
	fragment,
}

export const createShader = (shaderType: ShaderType, shaderText: string): WebGLShader | void => {
	const glType = shaderType === ShaderType.vertex ? GLUtilities.gl.VERTEX_SHADER : GLUtilities.gl.FRAGMENT_SHADER
	const _shader = GLUtilities.gl.createShader(glType)
	if (!_shader) {
		return
	}
	const shader: WebGLShader = _shader
	// vert or fragでシェーダの受け皿を作る？
	GLUtilities.gl.shaderSource(shader, shaderText)
	// sourceの割り当て、shader programのロードかな？
	GLUtilities.gl.compileShader(shader)
	// コンパイル、vertもfragも同じ関数でできる。
	return GLUtilities.gl.getShaderParameter(shader, GLUtilities.gl.COMPILE_STATUS)
		? shader
		: alert(GLUtilities.gl.getShaderInfoLog(shader))
}

// programオブジェクト---varyingではvertからfragに値を渡すよね？それをやってくれるやつ。
export const createProgram = (vs: WebGLShader, fs: WebGLShader): WebGLProgram | void => {
	const _program = GLUtilities.gl.createProgram()
	if (!_program) {
		return
	}
	const program: WebGLProgram = _program
	GLUtilities.gl.attachShader(program, vs)
	GLUtilities.gl.attachShader(program, fs)
	GLUtilities.gl.linkProgram(program)

	// shaderのリンクが正しく行われたか✓
	if (!GLUtilities.gl.getProgramParameter(program, GLUtilities.gl.LINK_STATUS))
		return alert(GLUtilities.gl.getProgramInfoLog(program))

	// use programするとどこに何がロードされるんだろうか。
	GLUtilities.gl.useProgram(program)
	return program
}

export const createVbo = (data: number[]): WebGLBuffer => {
	// バッファを操作する場合は、まずバッファをWebGLにバインドする。
	const _vbo = GLUtilities.gl.createBuffer()
	if (!_vbo) {
		return new WebGLBuffer()
	}
	const vbo: WebGLBuffer = _vbo
	// バインド
	GLUtilities.gl.bindBuffer(GLUtilities.gl.ARRAY_BUFFER, vbo)
	// バッファにデータをセット
	// STATIC_DRAW: このバッファがどのような頻度で内容を更新されるか
	// VBOの場合はモデルデータはそのままで何度も利用することになる。
	// のでSTATIC_DRAW?
	GLUtilities.gl.bufferData(GLUtilities.gl.ARRAY_BUFFER, new Float32Array(data), GLUtilities.gl.STATIC_DRAW)
	// バインド解除
	GLUtilities.gl.bindBuffer(GLUtilities.gl.ARRAY_BUFFER, null)
	return vbo
}

export const setAttribute = (
	vbo: WebGLBuffer[],
	attributeLocation: number[],
	attributeStride: number[],
	ibo: WebGLBuffer,
): void => {
	for (const i in vbo) {
		GLUtilities.gl.bindBuffer(GLUtilities.gl.ARRAY_BUFFER, vbo[i]) // VBOをバインド
		GLUtilities.gl.enableVertexAttribArray(attributeLocation[i]) // attribute属性を有効に
		GLUtilities.gl.vertexAttribPointer(attributeLocation[i], attributeStride[i], GLUtilities.gl.FLOAT, false, 0, 0) // attribute属性を登録
	}
	GLUtilities.gl.bindBuffer(GLUtilities.gl.ELEMENT_ARRAY_BUFFER, ibo)
}

export const createIbo = (data: number[]): WebGLBuffer => {
	const _ibo = GLUtilities.gl.createBuffer()
	if (!_ibo) {
		return new WebGLBuffer()
	}
	const ibo = _ibo
	GLUtilities.gl.bindBuffer(GLUtilities.gl.ELEMENT_ARRAY_BUFFER, ibo)
	// インデックスなのでint16
	GLUtilities.gl.bufferData(GLUtilities.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), GLUtilities.gl.STATIC_DRAW)
	// iboはGPU上の参照を返す？
	GLUtilities.gl.bindBuffer(GLUtilities.gl.ELEMENT_ARRAY_BUFFER, null)
	return ibo
}

// あえてフレームバッファのサイズを個別に変数として保持しているのは、後々、座標変換行列を生成する際にアスペクト比などを指定する処理に利用するためです。
// フレームバッファをオブジェクトとして生成する関数
export function createFramebuffer(width: number, height: number) {
	// フレームバッファの生成
	const frameBuffer = GLUtilities.gl.createFramebuffer()

	// フレームバッファをWebGLにバインド
	GLUtilities.gl.bindFramebuffer(GLUtilities.gl.FRAMEBUFFER, frameBuffer)

	// 深度バッファ用レンダーバッファの生成とバインド
	const depthRenderBuffer = GLUtilities.gl.createRenderbuffer()
	GLUtilities.gl.bindRenderbuffer(GLUtilities.gl.RENDERBUFFER, depthRenderBuffer)

	// レンダーバッファを深度バッファとして設定
	GLUtilities.gl.renderbufferStorage(GLUtilities.gl.RENDERBUFFER, GLUtilities.gl.DEPTH_COMPONENT16, width, height)

	// フレームバッファにレンダーバッファを関連付ける
	GLUtilities.gl.framebufferRenderbuffer(
		GLUtilities.gl.FRAMEBUFFER,
		GLUtilities.gl.DEPTH_ATTACHMENT,
		GLUtilities.gl.RENDERBUFFER,
		depthRenderBuffer,
	)

	// フレームバッファ用テクスチャの生成
	const fTexture = GLUtilities.gl.createTexture()

	// フレームバッファ用のテクスチャをバインド
	GLUtilities.gl.bindTexture(GLUtilities.gl.TEXTURE_2D, fTexture)

	// フレームバッファ用のテクスチャにカラー用のメモリ領域を確保
	GLUtilities.gl.texImage2D(
		GLUtilities.gl.TEXTURE_2D,
		0,
		GLUtilities.gl.RGBA,
		width,
		height,
		0,
		GLUtilities.gl.RGBA,
		GLUtilities.gl.UNSIGNED_BYTE,
		null,
	)

	// テクスチャパラメータ
	GLUtilities.gl.texParameteri(GLUtilities.gl.TEXTURE_2D, GLUtilities.gl.TEXTURE_MAG_FILTER, GLUtilities.gl.LINEAR)
	GLUtilities.gl.texParameteri(GLUtilities.gl.TEXTURE_2D, GLUtilities.gl.TEXTURE_MIN_FILTER, GLUtilities.gl.LINEAR)

	// フレームバッファにテクスチャを関連付ける
	GLUtilities.gl.framebufferTexture2D(
		GLUtilities.gl.FRAMEBUFFER,
		GLUtilities.gl.COLOR_ATTACHMENT0,
		GLUtilities.gl.TEXTURE_2D,
		fTexture,
		0,
	)

	// 各種オブジェクトのバインドを解除
	GLUtilities.gl.bindTexture(GLUtilities.gl.TEXTURE_2D, null)
	GLUtilities.gl.bindRenderbuffer(GLUtilities.gl.RENDERBUFFER, null)
	GLUtilities.gl.bindFramebuffer(GLUtilities.gl.FRAMEBUFFER, null)

	// オブジェクトを返して終了
	return { f: frameBuffer, d: depthRenderBuffer, t: fTexture }
}

// まだ理解してない
// キューブマップをフレームバッファで作成する場合は、方向づけが必要
// **二次元のテクスチャをフレームバッファにアタッチする場合には、この関数内部でテクスチャのアタッチまで行なっていました。
// **しかしフレームバッファにキューブマップテクスチャをアタッチする場合には、実際にレンダリングが行なわれる段階でアタッチを行ないます。
// フレームバッファをオブジェクトとして生成する関数(キューブマップ仕様)
function createCubeFramebuffer(width: number, height: number, target: number[]) {
	// フレームバッファの生成
	const frameBuffer = GLUtilities.gl.createFramebuffer()

	// フレームバッファをWebGLにバインド
	GLUtilities.gl.bindFramebuffer(GLUtilities.gl.FRAMEBUFFER, frameBuffer)

	// 深度バッファ用レンダーバッファの生成とバインド
	const depthRenderBuffer = GLUtilities.gl.createRenderbuffer()
	GLUtilities.gl.bindRenderbuffer(GLUtilities.gl.RENDERBUFFER, depthRenderBuffer)

	// レンダーバッファを深度バッファとして設定
	GLUtilities.gl.renderbufferStorage(GLUtilities.gl.RENDERBUFFER, GLUtilities.gl.DEPTH_COMPONENT16, width, height)

	// フレームバッファにレンダーバッファを関連付ける
	GLUtilities.gl.framebufferRenderbuffer(
		GLUtilities.gl.FRAMEBUFFER,
		GLUtilities.gl.DEPTH_ATTACHMENT,
		GLUtilities.gl.RENDERBUFFER,
		depthRenderBuffer,
	)

	// フレームバッファ用テクスチャの生成
	const fTexture = GLUtilities.gl.createTexture()

	// フレームバッファ用のテクスチャをキューブマップテクスチャとしてバインド
	GLUtilities.gl.bindTexture(GLUtilities.gl.TEXTURE_CUBE_MAP, fTexture)

	// フレームバッファ用のテクスチャにカラー用のメモリ領域を 6 面分確保
	for (let i = 0; i < target.length; i++) {
		GLUtilities.gl.texImage2D(
			target[i],
			0,
			GLUtilities.gl.RGBA,
			width,
			height,
			0,
			GLUtilities.gl.RGBA,
			GLUtilities.gl.UNSIGNED_BYTE,
			null,
		)
	}
	// あとは実際にフレームバッファにレンダリングを行なう際に、どの面に対してのレンダリングなのかを明確に通知してアタッチしてやれば、動的なキューブマップの生成が行なえます。

	// テクスチャパラメータ
	GLUtilities.gl.texParameteri(GLUtilities.gl.TEXTURE_CUBE_MAP, GLUtilities.gl.TEXTURE_MAG_FILTER, GLUtilities.gl.LINEAR)
	GLUtilities.gl.texParameteri(GLUtilities.gl.TEXTURE_CUBE_MAP, GLUtilities.gl.TEXTURE_MIN_FILTER, GLUtilities.gl.LINEAR)
	GLUtilities.gl.texParameteri(
		GLUtilities.gl.TEXTURE_CUBE_MAP,
		GLUtilities.gl.TEXTURE_WRAP_S,
		GLUtilities.gl.CLAMP_TO_EDGE,
	)
	GLUtilities.gl.texParameteri(
		GLUtilities.gl.TEXTURE_CUBE_MAP,
		GLUtilities.gl.TEXTURE_WRAP_T,
		GLUtilities.gl.CLAMP_TO_EDGE,
	)

	// 各種オブジェクトのバインドを解除
	GLUtilities.gl.bindTexture(GLUtilities.gl.TEXTURE_CUBE_MAP, null)
	GLUtilities.gl.bindRenderbuffer(GLUtilities.gl.RENDERBUFFER, null)
	GLUtilities.gl.bindFramebuffer(GLUtilities.gl.FRAMEBUFFER, null)

	// オブジェクトを返して終了
	return { f: frameBuffer, d: depthRenderBuffer, t: fTexture }
}
