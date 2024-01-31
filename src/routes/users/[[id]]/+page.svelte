<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data;

	const { form, errors, enhance, message, constraints, reset, delayed } = superForm(data.form, {
		// Fix for resetting the form when creating a user.
		onUpdated({ form }) {
			if (!data.form.data.id)
				reset({
					keepMessage: true
				});
		}
	});
</script>

<div>
	<section>
		<h1><a href="/"> Superforms CRUD</a></h1>
		<h3>Users</h3>
		{#if $form.id}
			<p />
			<form action="/users">
				<button>Create new</button>
			</form>
		{/if}
		<ul>
			{#each data.users as user}
				<li>
					<a href="/users/{user.id}">{user.name}</a>
				</li>
			{/each}
		</ul>

		{#if $message}
			<h4 class:success={$page.status < 400} class:error={$page.status >= 400}>
				{$message}
			</h4>
		{/if}
		<hr />
	</section>
	
	<form method="POST" use:enhance>
		<h2>{$form.id ? 'Update' : 'Create'} user</h2>
		<input type="hidden" name="id" bind:value={$form.id} />

		<label for="name"> Name </label>
		<input name="name" required bind:value={$form.name} {...$constraints.name} />

		<label for="email"> E-mail</label>
		<input
			name="email"
			type="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
		{#if $errors.email}<span>{$errors.email}</span>{/if}

		<div>
			<button>Submit</button>
			{#if $form.id}
				<button
					name="delete"
					class="danger"
					on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
				>
					Delete user
				</button>
			{/if}
			<a href="/users"><button>Cancel</button></a>
		</div>
		{#if $delayed}Working...{/if}
	</form>
	<p>
		<SuperDebug data={$form} />
	</p>
</div>

<style>
	ul {
		columns: 2;
		column-gap: 20px;
		list-style: none;
		& :hover {
			background-color: #ccc;
		}
	}

	li {
		break-inside: avoid;
		height: 3rem;
		border-bottom: 1px solid #ccc;
		padding: 10px;
	}
	.success {
		color: green;
	}
	.invalid {
		color: red;
	}
	p {
		margin: 2rem;
	}
</style>
