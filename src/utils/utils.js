
const UNITS = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
}

const LOCALE = "en"

const rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" })

export function formatRelativeTime(fromDate, toDate) {
	const elapsed = fromDate - (toDate || new Date())

	// "Math.abs" accounts for both "past" & "future" scenarios
	for (const u in UNITS) {
		if (Math.abs(elapsed) > UNITS[u] || u === "second")
			return rtf.format(Math.round(elapsed / UNITS[u]), u)
	}

	return fromDate.toLocaleDateString(LOCALE)
}

export function formatDate(date, delim = '.') {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return year.toString() + delim + month.toString() + delim + day.toString()
}