import { yupClient } from 'app/libs/yup';

export interface UserRegistrationFormInterface {
	username: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export const userRegistrationFormSchema = yupClient
	.object({
		username: yupClient
			.string()
			.min(4, 'Benutzername muss mindestens 4 Zeichen enthalten')
			.required()
			.matches(/^[a-zA-Z0-9]+$/, 'Benutzername darf nur aus Latin Buchstaben und Zahlen bestehen'),
		email: yupClient.string().email().required(),
		password: yupClient.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein').required(),
		passwordConfirmation: yupClient
			.string()
			.min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
			.oneOf([yupClient.ref('password'), undefined], 'Passwörter müssen übereinstimmen')
			.required('Bestätige dein Passwort'),
	})
	.required();
