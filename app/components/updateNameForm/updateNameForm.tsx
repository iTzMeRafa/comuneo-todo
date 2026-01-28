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
import { UpdateNameFormInterface, updateNameFormSchema } from 'app/schemas/updateNameFormSchema';

export async function loader() {
	return null;
}

export default function UpdateNameForm() {
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
	} = useForm<UpdateNameFormInterface, any, any>({
		defaultValues: {
			name: '',
		} as UpdateNameFormInterface,
		resolver: yupResolver(updateNameFormSchema),
	});

	useEffect(() => {
		if (userAccount) {
			reset({
				name: userAccount.name ?? '',
			});
		}
	}, [userAccount, reset]);

	const onSubmit = async (data: UpdateNameFormInterface) => {
		try {
			const result = await account.updateName({
				name: data.name,
			});
			if (result) {
				toaster.create({
					description: 'Benutzername erfolgreich geändert.',
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
			});
		}
	};

	return (
		<Container maxWidth={'xl'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading fontSize={20} mb={5}>
					Benutzername ändern
				</Heading>

				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.name?.message} mb={4}>
							<Field.Label>Benutzername</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" />
							{errors.name?.message && <Field.ErrorText>{errors.name?.message}</Field.ErrorText>}
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
