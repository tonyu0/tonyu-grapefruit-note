export function hsva(h: number, s: number, v: number, a: number): number[] {
	if (s > 1 || v > 1 || a > 1) {
		return []
	}
	const th = h % 360
	const i = Math.floor(th / 60)
	const f = th / 60 - i
	const m = v * (1 - s)
	const n = v * (1 - s * f)
	const k = v * (1 - s * (1 - f))
	const color = []
	// if (!
	//     s > 0 && !s < 0) {
	//     color.push(v, v, v, a);
	// } else {
	const r = [v, n, m, m, k, v]
	const g = [k, v, v, n, m, m]
	const b = [m, m, k, v, v, n]
	color.push(r[i], g[i], b[i], a)
	//}
	return color
}

interface Primitive {
	vertices: number[]
	indices: number[]
	normals: number[]
	colors: number[]
	texCoords: number[]
}

// canvas for fragment shader
export function canvasPlane(): Primitive {
	return {
		vertices: [-1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0],
		indices: [0, 1, 2, 3, 2, 1],
		normals: [-1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0],
		colors: [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
		texCoords: [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.75, 1.75],
	}
}

export function torus(row: number, column: number, irad: number, orad: number, color: number[]): Primitive {
	const pos = [],
		nor = [],
		col = [],
		st = [],
		idx = []
	for (let i = 0; i <= row; i++) {
		const r = ((Math.PI * 2) / row) * i
		const rr = Math.cos(r)
		const ry = Math.sin(r)
		for (let j = 0; j <= column; j++) {
			const tr = ((Math.PI * 2) / column) * j
			const tx = (rr * irad + orad) * Math.cos(tr)
			const ty = ry * irad
			const tz = (rr * irad + orad) * Math.sin(tr)
			const rx = rr * Math.cos(tr)
			const rz = rr * Math.sin(tr)
			const tc = color ? color : hsva((360 / column) * j, 1, 1, 1)
			const rs = (1 / column) * j
			let rt = (1 / row) * i + 0.5
			if (rt > 1.0) {
				rt -= 1.0
			}
			rt = 1.0 - rt
			pos.push(tx, ty, tz)
			nor.push(rx, ry, rz)
			col.push(tc[0], tc[1], tc[2], tc[3])
			st.push(rs, rt)
		}
	}
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < column; j++) {
			const r = (column + 1) * i + j
			idx.push(r, r + column + 1, r + 1)
			idx.push(r + column + 1, r + column + 2, r + 1)
		}
	}
	return {
		vertices: pos,
		indices: idx,
		normals: nor,
		colors: col,
		texCoords: st,
	}
}

export function sphere(row: number, column: number, rad: number, color: number[]): Primitive {
	const pos = [],
		nor = [],
		col = [],
		st = [],
		idx = []
	for (let i = 0; i <= row; i++) {
		const r = (Math.PI / row) * i
		const ry = Math.cos(r)
		const rr = Math.sin(r)
		for (let j = 0; j <= column; j++) {
			const tr = ((Math.PI * 2) / column) * j
			const tx = rr * rad * Math.cos(tr)
			const ty = ry * rad
			const tz = rr * rad * Math.sin(tr)
			const rx = rr * Math.cos(tr)
			const rz = rr * Math.sin(tr)
			const tc = color ? color : hsva((360 / row) * i, 1, 1, 1)
			pos.push(tx, ty, tz)
			nor.push(rx, ry, rz)
			col.push(tc[0], tc[1], tc[2], tc[3])
			st.push(1 - (1 / column) * j, (1 / row) * i)
		}
	}
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < column; j++) {
			const r = (column + 1) * i + j
			idx.push(r, r + 1, r + column + 2)
			idx.push(r, r + column + 2, r + column + 1)
		}
	}
	return {
		vertices: pos,
		indices: idx,
		normals: nor,
		colors: col,
		texCoords: st,
	}
}

export function cube(side: number, color: number[]): Primitive {
	// TODO: prepare color type
	const hs = side * 0.5
	const pos = [
		-hs,
		-hs,
		hs,
		hs,
		-hs,
		hs,
		hs,
		hs,
		hs,
		-hs,
		hs,
		hs,
		-hs,
		-hs,
		-hs,
		-hs,
		hs,
		-hs,
		hs,
		hs,
		-hs,
		hs,
		-hs,
		-hs,
		-hs,
		hs,
		-hs,
		-hs,
		hs,
		hs,
		hs,
		hs,
		hs,
		hs,
		hs,
		-hs,
		-hs,
		-hs,
		-hs,
		hs,
		-hs,
		-hs,
		hs,
		-hs,
		hs,
		-hs,
		-hs,
		hs,
		hs,
		-hs,
		-hs,
		hs,
		hs,
		-hs,
		hs,
		hs,
		hs,
		hs,
		-hs,
		hs,
		-hs,
		-hs,
		-hs,
		-hs,
		-hs,
		hs,
		-hs,
		hs,
		hs,
		-hs,
		hs,
		-hs,
	]
	const nor = [
		-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0,
		1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0,
		1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0,
		-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
	]
	const col = []
	for (let i = 0; i < pos.length / 3; i++) {
		const tc = color ? color : hsva((360 / pos.length / 3) * i, 1, 1, 1)
		col.push(tc[0], tc[1], tc[2], tc[3])
	}
	const st = [
		0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0,
		1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
		0.0, 1.0,
	]
	const idx = [
		0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
		20, 22, 23,
	]
	return {
		vertices: pos,
		indices: idx,
		normals: nor,
		colors: col,
		texCoords: st,
	}
}
