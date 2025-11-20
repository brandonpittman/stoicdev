<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		padding: 1rem;
		margin-inline: auto;
		max-inline-size: 65ch;
		font-family: Georgia, 'Times New Roman', Times, serif;
	}
	:global(p) {
		line-height: 1.5;
	}
</style>
