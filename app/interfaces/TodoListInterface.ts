export interface TodoListInterface {
	$id: string;
	title: string;
	checked: boolean;
	parent_id: string | null;
	user_id: number;
	$createdAt: string;
	$updatedAt: string;
}
