export class Vec3 {
	public x: number
	public y: number
	public z: number
	constructor(_x: number, _y: number, _z: number) {
		this.x = _x
		this.y = _y
		this.z = _z
	}
	public normalize(): void {
		const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
		if (len == 1) {
			return
		}
		this.x /= len
		this.y /= len
		this.z /= len
	}
	public plus(rhs: Vec3): Vec3 {
		const x = this.x + rhs.x
		const y = this.y + rhs.y
		const z = this.z + rhs.z
		return new Vec3(x, y, z)
	}
	public minus(rhs: Vec3): Vec3 {
		const x = this.x - rhs.x
		const y = this.y - rhs.y
		const z = this.z - rhs.z
		return new Vec3(x, y, z)
	}

	public dot(rhs: Vec3): number {
		return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z
	}
	public cross(rhs: Vec3): Vec3 {
		const x = this.y * rhs.z - this.z * rhs.y
		const y = this.z * rhs.x - this.x * rhs.z
		const z = this.x * rhs.y - this.y * rhs.x
		return new Vec3(x, y, z)
	}
}

export class Mat4 {
	private mData: number[] = []

	constructor()
	constructor(inputData?: number[])

	// make 4x4 zero matrix
	constructor(inputData?: number[]) {
		if (inputData) {
			this.mData = inputData
		} else {
			this.mData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}
	}

	get data(): number[] {
		return this.mData
	}
	set data(inputData: number[]) {
		this.mData = inputData
	}

	public static identity(): Mat4 {
		return new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
	}

	// operation like src1 *= src2
	public multiply(rhs: Mat4): void {
		// dst = src2 * src1
		// init dst data
		const data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		for (let i = 0; i < 4; ++i) {
			for (let j = 0; j < 4; ++j) {
				for (let k = 0; k < 4; ++k) {
					data[i * 4 + j] += rhs.data[i * 4 + k] * this.data[k * 4 + j]
				}
			}
		}
		this.data = data
	}
	public scale(scaleX: number, scaleY: number, scaleZ: number): void {
		const scalemat: Mat4 = new Mat4([scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1])
		this.multiply(scalemat)
	}
	public translate(moveX: number, moveY: number, moveZ: number): void {
		const transmat: Mat4 = new Mat4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, moveX, moveY, moveZ, 1])
		this.multiply(transmat)
	}

	// make quaternion and toMat4
	public rotate(angle: number, axis: Vec3): void {
		const quaternion: Quaternion = new Quaternion()
		quaternion.makeQuaternionFromAxis(angle, axis)
		const rotmat = quaternion.toMat4()
		this.multiply(rotmat)
	}
	public static lookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
		// カメラの座標変換行列の逆行列
		const k = eye.minus(target) // 逆?
		k.normalize()
		const i = up.cross(k)
		i.normalize()
		const j = k.cross(i)
		j.normalize()
		const t = new Vec3(-i.dot(eye), -j.dot(eye), -k.dot(eye))
		return new Mat4([i.x, j.x, k.x, 0, i.y, j.y, k.y, 0, i.z, j.z, k.z, 0, t.x, t.y, t.z, 1])
	}
	// not affine
	public static createPerspective(fovy: number, width: number, height: number, near: number, far: number): Mat4 {
		const t = near * Math.tan((fovy * Math.PI) / 360)
		const r = (t * width) / height
		return new Mat4([
			near / r,
			0,
			0,
			0,
			0,
			near / t,
			0,
			0,
			0,
			0,
			-(far + near) / (far - near),
			-1,
			0,
			0,
			-(far * near * 2) / (far - near),
			0,
		])
	}
	public static createOrtho(left: number, right: number, top: number, bottom: number, near: number, far: number): Mat4 {
		return new Mat4([
			2 / (right - left),
			0,
			0,
			0,
			0,
			2 / (top - bottom),
			0,
			0,
			0,
			0,
			-2 / (far - near),
			0,
			-(left + right) / (right - left),
			-(top + bottom) / (top - bottom),
			-(far + near) / (far - near),
			1,
		])
	}
	public transpose(src: Mat4, dst: Mat4): void {
		for (let i = 0; i < 4; ++i) {
			for (let j = 0; j < 4; ++j) {
				dst.data[i * 4 + j] = src.data[i + j * 4]
			}
		}
	}
	public inverse(dst: Mat4): void {
		const a = this.data[0],
			b = this.data[1],
			c = this.data[2],
			d = this.data[3],
			e = this.data[4],
			f = this.data[5],
			g = this.data[6],
			h = this.data[7],
			i = this.data[8],
			j = this.data[9],
			k = this.data[10],
			l = this.data[11],
			m = this.data[12],
			n = this.data[13],
			o = this.data[14],
			p = this.data[15],
			q = a * f - b * e,
			r = a * g - c * e,
			s = a * h - d * e,
			t = b * g - c * f,
			u = b * h - d * f,
			v = c * h - d * g,
			w = i * n - j * m,
			x = i * o - k * m,
			y = i * p - l * m,
			z = j * o - k * n,
			A = j * p - l * n,
			B = k * p - l * o,
			ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w)
		dst.data[0] = (f * B - g * A + h * z) * ivd
		dst.data[1] = (-b * B + c * A - d * z) * ivd
		dst.data[2] = (n * v - o * u + p * t) * ivd
		dst.data[3] = (-j * v + k * u - l * t) * ivd
		dst.data[4] = (-e * B + g * y - h * x) * ivd
		dst.data[5] = (a * B - c * y + d * x) * ivd
		dst.data[6] = (-m * v + o * s - p * r) * ivd
		dst.data[7] = (i * v - k * s + l * r) * ivd
		dst.data[8] = (e * A - f * y + h * w) * ivd
		dst.data[9] = (-a * A + b * y - d * w) * ivd
		dst.data[10] = (m * u - n * s + p * q) * ivd
		dst.data[11] = (-i * u + j * s - l * q) * ivd
		dst.data[12] = (-e * z + f * x - g * w) * ivd
		dst.data[13] = (a * z - b * x + c * w) * ivd
		dst.data[14] = (-m * t + n * r - o * q) * ivd
		dst.data[15] = (i * t - j * r + k * q) * ivd
	}
}

export class Quaternion {
	public x: number
	public y: number
	public z: number
	public w: number
	constructor()
	constructor(inX?: number, inY?: number, inZ?: number, inW?: number)

	constructor(inX?: number, inY?: number, inZ?: number, inW?: number) {
		if (inX && inY && inZ && inW) {
			this.x = inX
			this.y = inY
			this.z = inZ
			this.w = inW
		} else {
			this.x = 0
			this.y = 0
			this.z = 0
			this.w = 1
		}
	}
	public static identity(): Quaternion {
		return new Quaternion(0, 0, 0, 1)
	}
	// Get rotate Quaternion
	public makeQuaternionFromAxis(angle: number, axis: Vec3): void {
		axis.normalize()

		const scalar: number = Math.sin(angle / 2.0)
		this.x = axis.x * scalar
		this.y = axis.y * scalar
		this.z = axis.z * scalar
		this.w = Math.cos(angle / 2.0)
	}

	public conjugate(): void {
		this.x *= -1
		this.y *= -1
		this.z *= -1
	}

	public normalize(): void {
		const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
		this.x /= length
		this.y /= length
		this.z /= length
		this.w /= length
	}
	// multiply rhs to this Quaternion
	public multiply(rhs: Quaternion): void {
		const x = this.x,
			y = this.y,
			z = this.z,
			w = this.w
		this.x = x * rhs.w + w * rhs.x + y * rhs.z - z * rhs.y
		this.y = y * rhs.w + w * rhs.y + z * rhs.x - x * rhs.z
		this.z = z * rhs.w + w * rhs.z + x * rhs.y - y * rhs.x
		this.w = w * rhs.w - x * rhs.x - y * rhs.y - z * rhs.z
	}

	// convert vec using quaternion
	public toVec3(vec: number[], qtn: Quaternion, dst: Vec3): void {
		const qp: Quaternion = new Quaternion()
		const qr: Quaternion = new Quaternion(qtn.x, qtn.y, qtn.z, 1)
		qr.conjugate()
		qp.x = vec[0]
		qp.y = vec[1]
		qp.z = vec[2]
		qr.multiply(qp)
		qr.multiply(qtn)
		dst.x = qr.x
		dst.y = qr.y
		dst.z = qr.z
	}
	public toMat4(): Mat4 {
		const x = this.x,
			y = this.y,
			z = this.z,
			w = this.w
		return new Mat4([
			1 - 2 * (y * y + z * z),
			2 * (x * y + w * z),
			2 * (x * z - w * y),
			0,
			2 * (x * y - w * z),
			1 - 2 * (x * x + z * z),
			2 * (y * z + w * x),
			0,
			2 * (x * z + w * y),
			2 * (y * z - w * x),
			1 - 2 * (x * x + y * y),
			0,
			0,
			0,
			0,
			1,
		])
	}
	public static slerp(q0: Quaternion, q1: Quaternion, time: number): Quaternion {
		const ht = q0.x * q1.x + q0.y * q1.y + q0.z * q1.z + q0.w * q1.w
		let hs = 1.0 - ht * ht
		let [x, y, z, w] = [q0.x, q0.y, q0.z, q0.w]
		if (hs > 0.0) {
			hs = Math.sqrt(hs)
			if (Math.abs(hs) < 0.0001) {
				x = q0.x * 0.5 + q1.x * 0.5
				y = q0.y * 0.5 + q1.y * 0.5
				z = q0.z * 0.5 + q1.z * 0.5
				w = q0.w * 0.5 + q1.w * 0.5
			} else {
				const ph = Math.acos(ht)
				const pt = ph * time
				const t0 = Math.sin(ph - pt) / hs
				const t1 = Math.sin(pt) / hs
				x = q0.x * t0 + q1.x * t1
				y = q0.y * t0 + q1.y * t1
				z = q0.z * t0 + q1.z * t1
				w = q0.w * t0 + q1.w * t1
			}
		}
		return new Quaternion(x, y, z, w)
	}
}
