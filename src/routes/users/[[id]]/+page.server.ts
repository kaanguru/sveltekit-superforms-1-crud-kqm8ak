import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { createId } from '@paralleldrive/cuid2';

import { users,  userSchema } from '$lib/users';
import type { Actions, PageServerLoad } from './$types';

const crudSchema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

///// Load //////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({ params }) => {
	// READ user
	const user = users.find((u) => u.id == params.id);

	if (params.id && !user) throw error(404, 'User not found.');

	// If user is null, default values for the schema will be returned.
	const form = await superValidate(user, crudSchema);
	return { form, users };
};

///// Form actions //////////////////////////////////////////////////

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, crudSchema);

		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			// CREATE user
			const user = { ...form.data, id: createId() };
			users.push(user);

			return message(form, 'User created!');
		} else {
			const index = users.findIndex((u) => u.id == form.data.id);
			if (index == -1) throw error(404, 'User not found.');

			if (formData.has('delete')) {
				// DELETE user
				users.splice(index, 1);
				throw redirect(303, '/users');
			} else {
				// UPDATE user
				users[index] = { ...form.data, id: form.data.id };
				return message(form, 'User updated!');
			}
		}
	}
};
