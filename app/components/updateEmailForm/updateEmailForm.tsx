import { client } from 'app/libs/appwrite';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRegistrationFormInterface, userRegistrationFormSchema } from 'app/schemas/userRegistrationFormSchema';
import { Controller, useForm } from 'react-hook-form';
import { account } from 'app/libs/appwrite';
import { useNavigate } from 'react-router';
import { Button, Field, Flex, Input, Separator, Text, Heading, Container } from '@chakra-ui/react';
import { ArrowRightIcon } from 'lucide-react';
import { toaster } from 'app/components/toaster';
import { UserLoginFormInterface, userLoginFormSchema } from 'app/schemas/userLoginFormSchema';
import { UpdateEmailFormInterface, updateEmailFormSchema } from 'app/schemas/updateEmailFormSchema';
import React, { useEffect } from 'react';
import { UserInterface } from 'app/interfaces/UserInterface';

export async function loader() {
	return null;
}

export default function UpdateEmailForm() {
	let navigate = useNavigate();

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
	} = useForm<UpdateEmailFormInterface, any, any>({
		defaultValues: {
			email: '',
			password: '',
		} as UpdateEmailFormInterface,
		resolver: yupResolver(updateEmailFormSchema),
	});

	useEffect(() => {
		if (userAccount) {
			reset({
				email: userAccount.email ?? '',
			});
		}
	}, [userAccount, reset]);

	const onSubmit = async (data: UpdateEmailFormInterface) => {
		try {
			const result = await account.updateEmail({
				email: data.email,
				password: data.password,
			});
			if (result) {
				toaster.create({
					description: 'E-Mail Addresse erfolgreich geändert.',
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
			});
		}
	};

	return (
		<Container maxWidth={'xl'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading fontSize={20} mb={5}>
					E-Mail ändern
				</Heading>

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.email?.message} mb={4}>
							<Field.Label>E-Mail</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" />
							{errors.email?.message && <Field.ErrorText>{errors.email?.message}</Field.ErrorText>}
						</Field.Root>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.password?.message} mb={4}>
							<Field.Label>Passwort</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" type={'password'} />
							{errors.password?.message && <Field.ErrorText>{errors.password?.message}</Field.ErrorText>}
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
