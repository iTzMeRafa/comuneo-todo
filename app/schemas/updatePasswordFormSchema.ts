import { yupClient } from 'app/libs/yup';

export interface UpdatePasswordFormInterface {
	password: string;
	oldPassword: string;
}

export const updatePasswordFormSchema = yupClient
	.object({
		password: yupClient.string().required(),
		oldPassword: yupClient.string().required(),
	})
	.required();
