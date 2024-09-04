export function formatRelativeTime(date: Date): string

export function formatDate(date: Date, delim: string): string

export async function fetchArticles(id: string | undefined, category: string | undefined, limit: number, sortByCreatedAt: bool): object

export async function fetchAllArticles(limit: number, sortByCreatedAt: bool): object