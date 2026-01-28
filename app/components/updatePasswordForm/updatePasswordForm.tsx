import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { account } from 'app/libs/appwrite';
import { useNavigate } from 'react-router';
import { Button, Field, Input, Heading, Container } from '@chakra-ui/react';
import { ArrowRightIcon } from 'lucide-react';
import { toaster } from 'app/components/toaster';
import React, { useEffect } from 'react';
import { UserInterface } from 'app/interfaces/UserInterface';
import { UpdatePasswordFormInterface, updatePasswordFormSchema } from 'app/schemas/updatePasswordFormSchema';

export async function loader() {
	return null;
}

export default function UpdatePasswordForm() {
	const navigate = useNavigate();

	const [userAccount, setUserAccount] = React.useState<UserInterface | null>(null);

	useEffect(() => {
		(async () => {
			const userAccount = await account.get();
			setUserAccount(userAccount);
		})();
	}, [account]);

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<UpdatePasswordFormInterface, any, any>({
		defaultValues: {
			password: '',
			oldPassword: '',
		} as UpdatePasswordFormInterface,
		resolver: yupResolver(updatePasswordFormSchema),
	});

	const onSubmit = async (data: UpdatePasswordFormInterface) => {
		try {
			const result = await account.updatePassword({
				password: data.password,
				oldPassword: data.oldPassword,
			});
			if (result) {
				toaster.create({
					description: 'Passwort erfolgreich geändert.',
					type: 'success',
					closable: true,
				});

				await new Promise((resolve) => setTimeout(resolve, 1000));
				window.location.reload();
			}
		} catch (error: any) {
			toaster.create({
				description: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
				type: 'error',
				closable: true,
			});

			reset({
				...getValues(),
				password: '',
				oldPassword: '',
			});
		}
	};

	return (
		<Container maxWidth={'xl'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading fontSize={20} mb={5}>
					Passwort ändern
				</Heading>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.password?.message} mb={4}>
							<Field.Label>Neues Passwort</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" type={'password'} />
							{errors.password?.message && <Field.ErrorText>{errors.password?.message}</Field.ErrorText>}
						</Field.Root>
					)}
				/>
				<Controller
					name="oldPassword"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.oldPassword?.message} mb={4}>
							<Field.Label>Altes Passwort</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" type={'password'} />
							{errors.oldPassword?.message && (
								<Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
							)}
						</Field.Root>
					)}
				/>

				<Button type={'submit'} fontSize={'sm'} fontWeight={600} color={'realWhite'} bg={'primary'}>
					Aktualisieren <ArrowRightIcon />
				</Button>
			</form>
		</Container>
	);
}
