<script lang="ts">
	import { getNotes } from '../../routes/notes.remote';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	type Props = {
		limit?: number;
		showForm?: boolean;
	};

	let { limit, showForm = true }: Props = $props();

	const searchQuery = $derived($page.url.searchParams.get('q') ?? '');
	const notes = $derived(await getNotes(searchQuery || undefined));
	const displayNotes = $derived(limit ? notes.slice(0, limit) : notes);

	let inputValue = $state('');

	$effect(() => {
		inputValue = searchQuery;
	});

	function handleSearch(e: SubmitEvent) {
		e.preventDefault();
		const url = new URL($page.url);
		if (inputValue) {
			url.searchParams.set('q', inputValue);
		} else {
			url.searchParams.delete('q');
		}
		goto(url, { replaceState: true });
	}
</script>

{#if showForm}
	<form onsubmit={handleSearch}>
		<label for="search">Search notes</label>
		<input
			id="search"
			type="search"
			name="q"
			placeholder="Search..."
			bind:value={inputValue}
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
