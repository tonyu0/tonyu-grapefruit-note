import { GLUtilities } from '@/lib/gl/gl'

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
