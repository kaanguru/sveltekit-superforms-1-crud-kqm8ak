import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { users, userSchema, createId } from '$lib/users';
import type { Actions, PageServerLoad } from './$types';

const crudSchema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

///// Load //////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ params }) => {
	// READ user
	const user = users.find((u) => u.id === params.id);

	if (params.id && !user) throw error(404, 'User not found.');

	// If user is null, default values for the schema will be returned.
	const form = await superValidate(user, crudSchema);
	return { form, users };
};

///// Form actions //////////////////////////////////////////////////

export const actions = {
	create: async ({ request }) => {
		// Get form data
		const formData = await request.formData();

		// Validate form
		const form = await superValidate(formData, crudSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Create new user
		const user = { ...form.data, id: createId()  };
		users.push(user);

		// Redirect
		throw redirect(303, '/users');
	},

	update: async ({ request }) => {
		// Get form data
		const formData = await request.formData();

		// Validate form
		const form = await superValidate(formData, crudSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// Find user index
		const index = users.findIndex((u) => u.id === form.data.id);
		if (index == -1) {
			throw error(404, 'User not found.');
		}

		// Update user
		users[index] = { ...form.data, id: form.data.id as string };

		// Redirect
		throw redirect(303, '/users');
	},

	delete: async ({ request }) => {
		// Get ID
		const formData = await request.formData();
		const id = formData.get('id') as string;

		// Find index
		const index = users.findIndex((u) => u.id === id);
		if (index == -1) {
			throw error(404, 'User not found.');
		}

		// Delete user
		users.splice(index, 1);

		// Redirect
		throw redirect(303, '/users');
	}
};
