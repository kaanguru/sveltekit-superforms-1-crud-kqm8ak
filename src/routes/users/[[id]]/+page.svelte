<script lang="ts">
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms/client';
  import spinner from '$lib/spinner.svg'

  export let data;

  const {
    form,
    errors,
    enhance,
    delayed,
    message,
    constraints,
    reset
  } = superForm(data.form, {
    onUpdated({form}) {
      // Fix for resetting the form when creating a user.
      if(!data.form.data.id)
        reset({
          keepMessage: true
        })
    }
  });
</script>

<h1><a href="/"> Superforms CRUD</a></h1>

<h3>Users</h3>
<div class="users">
  {#if $form.id}
    <form action="/users">
      <button>Create new</button>
    </form>
  {/if}
  {#each data.users as user}
  <ul>
    <a href="/users/{user.id}">{user.name}</a>
  </ul>
  {/each}
</div>

{#if $message}
  <h4 class="message" class:success={$page.status < 400} class:error={$page.status >= 400}>{$message}</h4>
{/if}

<h2>{!$form.id ? 'Create' : 'Update'} user</h2>

<form method="POST" use:enhance>
  <input type="hidden" name="id" bind:value={$form.id} />

  <label>
    Name<br />
    <input
      name="name"
      aria-invalid={$errors.name ? 'true' : undefined}
      bind:value={$form.name}
      {...$constraints.name}
    />
    {#if $errors.name}<p class="invalid">{$errors.name}</p>{/if}
  </label>

  <label>
    E-mail<br />
    <input
      name="email"
      type="email"
      aria-invalid={$errors.email ? 'true' : undefined}
      bind:value={$form.email}
      {...$constraints.email}
    />
    {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
  </label>

  <div class="buttons">
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
    {#if $delayed}<img src={spinner} alt="Loading...">{/if}
  </div>
  <div><input type="checkbox" name="delay"> Delay response 2s</div>
</form>

