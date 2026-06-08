import { query } from '$app/server';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as z from 'zod/mini';
import hljs from 'highlight.js/lib/common';
import markedFootnote from 'marked-footnote';

export type Note = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
	location?: string;
	content: string;
};

const marked = new Marked(
	markedHighlight({
		emptyLangClass: 'hljs',
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
).use(markedFootnote({ footnoteDivider: true }));

// Load all posts at module scope
const noteModules = import.meta.glob('/content/notes/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// Parse once at module scope
const allNotes = Object.entries(noteModules).map(([path, content]) => {
	const fm = matter(content as Input);
	const { data, content: md } = fm;
	const slug = path.match(/\/([^/]+)\.md$/)?.[1];
	return { slug, ...data, content: md };
}) as Note[];

// Get all posts
export const getNotes = query(z.optional(z.string()), async (searchQuery) => {
	let notes = allNotes;

	// Production hides drafts + future-dated notes (visible in dev for preview)
	if (!dev) {
		const now = new Date();
		notes = notes.filter((note) => {
			if (note.draft === true) return false;
			if (new Date(note.date) > now) return false;
			return true;
		});
	}

	if (searchQuery) {
		const q = searchQuery.toLowerCase();
		notes = notes.filter(
			(note) =>
				note.title.toLowerCase().includes(q) || note.content.toLowerCase().includes(q)
		);
	}

	return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Get single post by slug
export const getNote = query(z.string(), async (slug) => {
	const path = `/content/notes/${slug}.md`;
	const content = noteModules[path];

	if (!content) error(404, 'Post not found');

	const { data, content: markdown } = matter(content as Input);

	// Drafts are not reachable in production, even by direct URL (visible in dev).
	if (!dev && data.draft === true) error(404, 'Post not found');

	return {
		slug,
		meta: data,
		content: marked.parse(markdown, { gfm: true })
	};
});
