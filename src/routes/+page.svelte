<script lang="ts">
	import { hrefs } from '$lib/hrefs';
	import NotesSearch from '$lib/components/NotesSearch.svelte';
</script>

<svelte:head>
	<title>Stoic Dev</title>
</svelte:head>

<section>
	<h2>What This Site Is</h2>
	<p>
		This site is a repository of living documents about developing software with a traditional Stoic
		mindset. The notes contained are partly generated using AI after lengthy voice conversations
		with AI models. The thoughts are my own but often organized by AI.
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
	<NotesSearch limit={5} showForm={false} />
	<a href="/notes">View all notes</a>
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
