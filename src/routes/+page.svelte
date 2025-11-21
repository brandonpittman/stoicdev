<script lang="ts">
	import { hrefs } from '$lib/hrefs';
	import { getNotes } from './notes.remote';

	const notes = await getNotes();
</script>

<svelte:head>
	<title>Stoic Dev</title>
</svelte:head>

<p>
	This site is a repository of living documents about developing software with a traditional Stoic
	mindset.
</p>

<h2>Notes</h2>
<ul>
	{#each notes as note}
		<li>
			<a href={`/notes/${note.slug}`}>{note.title}</a>
		</li>
	{/each}
</ul>

<h2>Interesting Links</h2>
<ul>
	<li>
		<a href={hrefs.traditional_stoicism}>Traditional Stoicism</a>
	</li>
	<li>
		<a href={hrefs.cosp}>College of Stoic Philosophers</a>
	</li>
</ul>
