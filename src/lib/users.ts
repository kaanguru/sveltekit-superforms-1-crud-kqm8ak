import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

export const userSchema = z.object({
	id: z.string().cuid2(),
	name: z.string().min(2),
	email: z.string().email()
});

type UserDB = z.infer<typeof userSchema>[];

const g = globalThis as unknown as { users: UserDB };

export const userId = () => createId();

export const users = g.users ?? [
	createUser('Important Customer', 'important@example.com'),
	createUser('Super Customer', 'super@example.com')
];
function createUser(name: string, email: string) {
	return {
		id: createId(),
		name,
		email
	};
}
