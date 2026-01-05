<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header><a href="/">Stoic Dev</a></header>

<main>
	{@render children()}
</main>

<footer hidden>Stoic Dev · {new Date().getFullYear()}</footer>

<style>
	:global(body) {
		box-sizing: border-box;
		padding: 1.5rem;
		margin-inline: auto;
		max-inline-size: 65ch;
		font-family: 'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif;
		min-block-size: 100dvh;
		display: flex;
		flex-direction: column;
	}
	:global(p) {
		line-height: 1.5;
	}

	:global(a) {
		color: unset;
	}

	header {
		font-weight: 500;
		font-size: 1.5em;
		padding-block-end: 2rem;

		& a {
			text-decoration: none;
			color: unset;
		}
	}

	main {
		flex: 1;
	}

	footer {
		text-align: center;
	}
</style>
