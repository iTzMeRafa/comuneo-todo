import { yupClient } from 'app/libs/yup';

export interface UpdateNameFormInterface {
	name: string;
}

export const updateNameFormSchema = yupClient
	.object({
		name: yupClient.string().required(),
	})
	.required();
