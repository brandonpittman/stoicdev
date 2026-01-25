<script lang="ts">
	import { getNotes } from '../../routes/notes.remote';
	import { page } from '$app/stores';

	type Props = {
		limit?: number;
		showForm?: boolean;
	};

	let { limit, showForm = true }: Props = $props();

	const searchQuery = $derived($page.url.searchParams.get('q') ?? '');
	const notes = $derived(await getNotes(searchQuery || undefined));
	const displayNotes = $derived(limit ? notes.slice(0, limit) : notes);

	let inputValue = $state(searchQuery);
</script>

{#if showForm}
	<form>
		<input
			id="search"
			type="search"
			name="q"
			placeholder="Search..."
			bind:value={inputValue}
			style="font-size: 16px;"
		/>
		<button type="submit">Search</button>
	</form>
{/if}

{#if displayNotes.length === 0}
	<p>No notes found</p>
{:else}
	<ul>
		{#each displayNotes as note (note.slug)}
			<li>
				<a href={`/notes/${note.slug}`}>{note.title}</a>
			</li>
		{/each}
	</ul>
{/if}
