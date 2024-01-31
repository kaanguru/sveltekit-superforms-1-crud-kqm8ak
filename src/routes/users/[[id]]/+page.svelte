<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance, message, constraints, reset } = superForm(data.form, {
		onUpdated({ form }) {
			// Fix for resetting the form when creating a user.
			if (!data.form.data.id)
				reset({
					keepMessage: true
				});
		}
	});
</script>

<section>
	<h1><a href="/"> Superforms CRUD</a></h1>
	<h3>Users</h3>
	<p>
		{#if $form.id}
			<p />
			<form action="/users">
				<button>Create new</button>
			</form>
		{/if}
		{#each data.users as user}
			<p />
			<ul>
				<li>
					<a href="/users/{user.id}">{user.name}</a>
				</li>
			</ul>
		{/each}
	</p>

	{#if $message}
		<h4 class="message" class:success={$page.status < 400} class:error={$page.status >= 400}>
			{$message}
		</h4>
	{/if}

	<h2>{!$form.id ? 'Create' : 'Update'} user</h2>

	<form method="POST" use:enhance>
		<input type="hidden" name="id" bind:value={$form.id} />

		<label for="name"> Name </label>
		<input
			name="name"
			required
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<p>{$errors.name}</p>{/if}

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
	</form>
</section>


