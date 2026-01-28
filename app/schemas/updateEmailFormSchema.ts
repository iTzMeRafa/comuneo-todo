import { yupClient } from 'app/libs/yup';

export interface UpdateEmailFormInterface {
	email: string;
	password: string;
}

export const updateEmailFormSchema = yupClient
	.object({
		email: yupClient.string().email().required(),
		password: yupClient.string().required(),
	})
	.required();
