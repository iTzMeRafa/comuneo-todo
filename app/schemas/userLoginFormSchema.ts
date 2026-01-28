import { yupClient } from 'app/libs/yup';

export interface UserLoginFormInterface {
	email: string;
	password: string;
}

export const userLoginFormSchema = yupClient
	.object({
		email: yupClient.string().email().required(),
		password: yupClient.string().min(8).required(),
	})
	.required();
