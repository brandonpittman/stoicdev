<script lang="ts">
	import { sendMessage } from '../../routes/contact.remote';
</script>

<section>
	<h2>Message Me</h2>
	{#if sendMessage.result?.success}
		<p>Message sent!</p>
	{:else}
		<form {...sendMessage}>
			<input
				{...sendMessage.fields.website}
				autocomplete="off"
				tabindex="-1"
				aria-hidden="true"
				class="honeypot"
			/>
			<textarea {...sendMessage.fields.message.as('text')} rows="5"></textarea>
			<button>Send</button>
		</form>
	{/if}
</section>

<style>
	.honeypot {
		position: absolute;
		left: -9999px;
		opacity: 0;
		height: 0;
		width: 0;
		pointer-events: none;
	}

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
