<script lang="ts">
	import { hrefs } from '$lib/hrefs';
	import { getNotes } from './notes.remote';
	import { sendMessage } from './contact.remote';

	const notes = await getNotes();
</script>

<svelte:head>
	<title>Stoic Dev</title>
</svelte:head>

<section>
	<h2>What This Site Is</h2>
	<p>
		This site is a repository of living documents about developing software with a traditional Stoic
		mindset.
	</p>
</section>

<section>
	<h2>Who This Site Is For</h2>
	<p>
		The notes written on this site are for practical philosophers who believe in the tenets of
		traditional Stoicism and seek to deepen their knowledge of it while also taking parts of other
		philosophical traditions to enhance the models provided by traditional Stoicism.
	</p>
</section>

<section>
	<h2>Notes</h2>
	<ul>
		{#each notes as note}
			<li>
				<a href={`/notes/${note.slug}`}>{note.title}</a>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Interesting Links</h2>
	<ul>
		<li>
			<a href={hrefs.traditional_stoicism}>Traditional Stoicism</a>
		</li>
		<li>
			<a href={hrefs.cosp}>College of Stoic Philosophers</a>
		</li>
	</ul>
</section>

<section>
	<h2>Send me a message</h2>
	{#if sendMessage.result?.success}
		<p>Message sent!</p>
	{:else}
		<form {...sendMessage}>
			<textarea {...sendMessage.fields.message.as('text')} rows="5"></textarea>
			<button>Send</button>
		</form>
	{/if}
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		font-family: inherit;
		font-size: inherit;
		padding: 0.5rem;
		resize: vertical;
		border-radius: 4px;
	}

	button {
		align-self: flex-start;
		font-family: inherit;
		font-size: inherit;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border-radius: 4px;
		background-color: #2b2b2b;
		color: #fff;
		border: none;
	}
</style>
