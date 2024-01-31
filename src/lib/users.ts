import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

export const userSchema = z.object({
	id: z.string().cuid2(),
	name: z.string().min(2,"çok küçük"),
	email: z.string().email("bu nasıl mail")
});

type UserDB = z.infer<typeof userSchema>[];

const g = globalThis as unknown as { users?: UserDB };

export const users = g.users ?? [
	createUser('user1', 'important@example.com'),
	createUser('Super Customer', 'super@example.com')
];

export function createUser(name: string, email: string) {
	return {
		id: createId(),
		name,
		email
	};
}
