<script lang="ts">
	import MessageMe from '$lib/components/MessageMe.svelte';
	import NoteSignature from '$lib/components/NoteSignature.svelte';
	import { getNote } from '../../notes.remote';

	const { params } = $props();
	const note = $derived(await getNote(params.slug!));
</script>

<svelte:head>
	<title>{note.meta.title}</title>
</svelte:head>

<div>
	<h1>{note.meta.title}</h1>

	{#if note.meta.ai}
		<small
			>This note was compiled by AI after a back and forth discussion about the thoughts described
			in the note below.</small
		>
	{/if}

	<ul class="tags">
		{#each note.meta.tags as tag}
			<li class="tag">{tag}</li>
		{/each}
	</ul>
</div>

<section class="note-content">
	{@html note.content}
</section>

<NoteSignature date={new Date(note.meta.date)} location={note.meta.location} />

<hr />

<MessageMe title={note.meta.title} />

<style>
	.tags {
		display: flex;
		gap: 0.5rem;
		list-style: none;
		padding-left: 0;
	}

	.tag {
		background-color: rgb(241, 243, 245);
		padding: 0.25rem;
		display: inline-flex;
		border-radius: 4px;
	}

	hr {
		margin-block: 2rem;
	}
</style>
