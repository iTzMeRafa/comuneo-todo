import React, { JSX, useEffect, useState } from 'react';
import { VStack, Heading, Checkbox, Box, Text, Flex, Spinner, IconButton, Input } from '@chakra-ui/react';
import { DeleteIcon, PlusIcon } from 'lucide-react';
import { TodoListInterface } from 'app/interfaces/TodoListInterface';
import { UserInterface } from 'app/interfaces/UserInterface';
import { account, tablesDB } from 'app/libs/appwrite';
import { ID, Query } from 'appwrite';

const INDENT_PX = 6;

function TodoList(): JSX.Element {
	const [userAccount, setUserAccount] = useState<UserInterface | null>(null);
	const [todos, setTodos] = useState<TodoListInterface[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [addingParentId, setAddingParentId] = useState<string | null>(null);
	const [newTodoTitle, setNewTodoTitle] = useState<string>('');

	const cardBg = 'white';
	const borderColor = 'gray.200';
	const mutedText = 'gray.500';

	// Fetch user
	useEffect(() => {
		(async () => {
			try {
				const user = await account.get();
				setUserAccount(user);
			} catch (err) {
				console.error('Failed to get user account:', err);
			}
		})();
	}, []);

	// Fetch todos
	useEffect(() => {
		if (!userAccount) return;

		const fetchTodos = async () => {
			setIsLoading(true);
			try {
				const response = await tablesDB.listRows({
					databaseId: 'comuneo-db',
					tableId: 'todo',
					queries: [Query.equal('user_id', userAccount.$id)],
				});

				if (response.rows) {
					const fetchedTodos: TodoListInterface[] = (response.rows as any).map((todo: any) => ({
						$id: todo.$id,
						title: todo.title,
						checked: todo.checked,
						parent_id: todo.parent_id ?? null,
						user_id: todo.user_id,
						$createdAt: todo.$createdAt,
						$updatedAt: todo.$updatedAt,
					}));

					setTodos(fetchedTodos);
				}
			} catch (err) {
				console.error('Failed to fetch todos:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTodos();
	}, [userAccount]);

	// Toggle parent + children recursively AND update database
	const toggleTodoRecursive = async (id: string, checked: boolean) => {
		const getAllChildIds = (parentId: string): string[] => {
			const directChildren = todos.filter((t) => t.parent_id === parentId);
			return directChildren.reduce(
				(acc, child) => [...acc, child.$id, ...getAllChildIds(child.$id)],
				[] as string[]
			);
		};

		const childIds = getAllChildIds(id);
		const allIdsToUpdate = [id, ...childIds];

		// Update local state immediately
		setTodos((prev) => prev.map((todo) => (allIdsToUpdate.includes(todo.$id) ? { ...todo, checked } : todo)));

		// Update Appwrite rows
		try {
			for (const todoId of allIdsToUpdate) {
				await tablesDB.updateRow({
					databaseId: 'comuneo-db',
					tableId: 'todo',
					rowId: todoId,
					data: { checked },
				});
			}
		} catch (err) {
			console.error('Failed to update todos in DB:', err);
		}
	};

	// Delete parent + children
	const deleteTodoRecursive = async (id: string) => {
		const getAllChildIds = (parentId: string): string[] => {
			const directChildren = todos.filter((t) => t.parent_id === parentId);
			return directChildren.reduce(
				(acc, child) => [...acc, child.$id, ...getAllChildIds(child.$id)],
				[] as string[]
			);
		};

		const childIds = getAllChildIds(id);
		const allIdsToDelete = [id, ...childIds];

		setTodos((prev) => prev.filter((todo) => !allIdsToDelete.includes(todo.$id)));

		try {
			for (const todoId of allIdsToDelete) {
				await tablesDB.deleteRow({
					databaseId: 'comuneo-db',
					tableId: 'todo',
					rowId: todoId,
				});
			}
		} catch (err) {
			console.error('Failed to delete todo:', err);
		}
	};

	// Add new todo
	const addTodo = async (parentId: string | null) => {
		if (!newTodoTitle.trim() || !userAccount) return;

		try {
			const newRow = await tablesDB.createRow({
				databaseId: 'comuneo-db',
				tableId: 'todo',
				rowId: ID.unique(),
				data: {
					title: newTodoTitle.trim(),
					checked: false,
					user_id: userAccount.$id,
					parent_id: parentId,
				},
			});

			setTodos((prev) => [
				...prev,
				{
					$id: newRow.$id,
					title: newRow.title,
					checked: newRow.checked,
					parent_id: newRow.parent_id ?? null,
					user_id: newRow.user_id,
					$createdAt: newRow.$createdAt,
					$updatedAt: newRow.$updatedAt,
				},
			]);
			setNewTodoTitle('');
			setAddingParentId(null);
		} catch (err) {
			console.error('Failed to add todo:', err);
		}
	};

	// Render recursively
	const renderTodos = (parentId: string | null, level = 0) => {
		const children = todos.filter((todo) => todo.parent_id === parentId);

		return (
			<>
				{children.map((todo) => {
					const indent = level * INDENT_PX;

					return (
						<Box key={todo.$id} position="relative" pl={`${indent}px`} w="100%">
							{level > 0 && (
								<Box
									position="absolute"
									left={`${indent / 2}px`}
									top="18px"
									bottom="0"
									w="1px"
									bg={borderColor}
								/>
							)}

							<Box
								bg={cardBg}
								border={todo.parent_id === null ? '1px solid' : 'none'}
								borderColor={todo.parent_id === null ? borderColor : 'transparent'}
								borderRadius="lg"
								position="relative"
								py={3}
								pl={5}
								transition="all 0.2s ease"
								_hover={{ borderColor: 'primary' }}
							>
								<Flex align="center" justify="space-between">
									<Flex align="center">
										<Checkbox.Root
											defaultChecked={todo.checked}
											checked={todo.checked}
											onChange={() => toggleTodoRecursive(todo.$id, !todo.checked)}
										>
											<Checkbox.HiddenInput />
											<Checkbox.Control />
											<Checkbox.Label>
												<Text
													fontWeight="medium"
													textDecoration={todo.checked ? 'line-through' : 'none'}
													color={todo.checked ? mutedText : 'inherit'}
												>
													{todo.title}
												</Text>
											</Checkbox.Label>
										</Checkbox.Root>

										{/* Add child todo button */}
										<IconButton
											ml={2}
											size="sm"
											aria-label="Add Child Todo"
											variant="ghost"
											onClick={() => setAddingParentId(todo.$id)}
										>
											<PlusIcon />
										</IconButton>
									</Flex>

									{/* Delete button */}
									<IconButton
										mr={3}
										aria-label="Todo Eintrag löschen"
										size="sm"
										variant="ghost"
										onClick={() => deleteTodoRecursive(todo.$id)}
									>
										<DeleteIcon />
									</IconButton>
								</Flex>

								{/* Input for adding a child */}
								{addingParentId === todo.$id && (
									<Flex mt={2} gap={2} mr={3}>
										<Input
											size="sm"
											value={newTodoTitle}
											onChange={(e) => setNewTodoTitle(e.target.value)}
											placeholder={'Neue Todo'}
											onKeyDown={(e) => {
												if (e.key === 'Enter') addTodo(todo.$id);
											}}
										/>
										<IconButton
											size="sm"
											variant="outline"
											aria-label="Todo Eintrag erstellen"
											onClick={() => addTodo(todo.$id)}
										>
											<PlusIcon />
										</IconButton>
									</Flex>
								)}

								<VStack align="start" mt={3} gap={3} w="100%">
									{renderTodos(todo.$id, level + 1)}
								</VStack>
							</Box>
						</Box>
					);
				})}

				{/* Root add button */}
				{parentId === null && addingParentId === null && (
					<Flex mt={2} ml={2}>
						<Input
							size="sm"
							value={newTodoTitle}
							onChange={(e) => setNewTodoTitle(e.target.value)}
							placeholder="Neue Todo"
							onKeyDown={(e) => {
								if (e.key === 'Enter') addTodo(null);
							}}
						/>
						<IconButton
							size="sm"
							ml={2}
							variant="outline"
							aria-label="Add Root Todo"
							onClick={() => addTodo(null)}
						>
							<PlusIcon />
						</IconButton>
					</Flex>
				)}
			</>
		);
	};

	return (
		<VStack align="start" gap={6} w="100%" maxW="fit-content" minW="600px" p={6} ml={5}>
			<Heading size="lg">📝 Deine Todo Liste</Heading>

			{isLoading ? (
				<Flex align="center" gap={2}>
					<Spinner /> Lädt...
				</Flex>
			) : (
				<VStack align="start" gap={4} w="100%">
					{renderTodos(null)}
				</VStack>
			)}
		</VStack>
	);
}

export default TodoList;
