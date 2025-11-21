<script lang="ts">
	import { getNote } from '../../notes.remote';

	const { params } = $props();
	const note = $derived(await getNote(params.slug!));
</script>

<svelte:head>
	<title>{note.meta.title}</title>
</svelte:head>

<div>
	<h1>{note.meta.title}</h1>
	<ul class="tags">
		{#each note.meta.tags as tag}
			<li class="tag">{tag}</li>
		{/each}
	</ul>
</div>

<section class="note-content">
	{@html note.content}
</section>

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

	.note-content {
		padding-block: 2rem;
	}
</style>
