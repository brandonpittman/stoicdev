<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>Stoic Dev</h1>

<main>
	{@render children()}
</main>

<footer>Stoic Dev · {new Date().getFullYear()}</footer>

<style>
	:global(body) {
		box-sizing: border-box;
		padding: 1.5rem;
		margin-inline: auto;
		max-inline-size: 65ch;
		font-family: Georgia, 'Times New Roman', Times, serif;
		min-block-size: 100dvh;
		display: flex;
		flex-direction: column;
	}
	:global(p) {
		line-height: 1.5;
	}

	main {
		flex: 1;
	}

	footer {
		text-align: center;
	}
</style>
