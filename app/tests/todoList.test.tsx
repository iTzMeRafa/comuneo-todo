import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor } from 'app/tests/utils';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import TodoList from 'app/components/todoList';
import { account, tablesDB } from 'app/libs/appwrite';

vi.mock('app/libs/appwrite', () => ({
	account: { get: vi.fn() },
	tablesDB: {
		listRows: vi.fn(),
		createRow: vi.fn(),
	},
}));

describe('TodoList Komponente', () => {
	const mockUser = { $id: 'user123', name: 'Test User' };
	const mockTodo = { $id: 'todo1', title: 'Mein Test Todo', checked: false, user_id: 'user123' };

	beforeEach(() => {
		vi.clearAllMocks();
		(account.get as any).mockResolvedValue(mockUser);
		(tablesDB.listRows as any).mockResolvedValue({ rows: [mockTodo], total: 1 });
	});

	it('sollte To-dos laden und anzeigen', async () => {
		render(<TodoList />);
		expect(await screen.findByText('Mein Test Todo')).toBeInTheDocument();
	});

	it('sollte ein neues Root-Todo hinzufügen können', async () => {
		const user = userEvent.setup();
		(tablesDB.createRow as any).mockResolvedValue({
			$id: 'todo2',
			title: 'Neues Todo',
			checked: false,
			user_id: 'user123',
		});

		render(<TodoList />);

		const input = await screen.findByPlaceholderText('Neue Todo');
		const addButton = screen.getByLabelText('Add Root Todo');
		await user.type(input, 'Neues Todo');
		await user.click(addButton);

		await waitFor(
			() => {
				expect(tablesDB.createRow).toHaveBeenCalledWith(
					expect.objectContaining({
						data: expect.objectContaining({ title: 'Neues Todo' }),
					})
				);
			},
			{ timeout: 2000 }
		);
		expect(await screen.findByText('Neues Todo')).toBeInTheDocument();
	});
});
