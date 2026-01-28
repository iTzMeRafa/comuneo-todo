import { client } from 'app/libs/appwrite';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRegistrationFormInterface, userRegistrationFormSchema } from 'app/schemas/userRegistrationFormSchema';
import { Controller, useForm } from 'react-hook-form';
import { account } from 'app/libs/appwrite';
import { Button, Field, Flex, Input, Separator, Text, Heading, Container } from '@chakra-ui/react';
import { ArrowRightIcon } from 'lucide-react';
import { toaster } from 'app/components/toaster';
import { useNavigate } from 'react-router';

export async function loader() {
	return null;
}

export default function Register() {
	let navigate = useNavigate();

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationFormInterface, any, any>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		} as UserRegistrationFormInterface,
		resolver: yupResolver(userRegistrationFormSchema),
	});

	const onSubmit = async (data: UserRegistrationFormInterface) => {
		try {
			const user = await account.create({
				userId: 'unique()',
				email: data.email,
				password: data.password,
				name: data.username,
			});

			toaster.create({
				duration: 10000,
				title: ``,
				description: 'Benutzer erfolgreich registriert!',
				type: 'success',
				closable: true,
			});

			reset();
		} catch (error: any) {
			toaster.create({
				description: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
				type: 'error',
				closable: true,
			});

			reset({
				...getValues(),
				password: '',
				passwordConfirmation: '',
			});
		}
	};

	return (
		<Container maxWidth={'xl'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading fontSize={40} mb={10}>
					Registrieren
				</Heading>

				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.username?.message} mb={4}>
							<Field.Label>Benutzername</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" />
							{errors.username?.message && <Field.ErrorText>{errors.username?.message}</Field.ErrorText>}
						</Field.Root>
					)}
				/>

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

				<Controller
					name="passwordConfirmation"
					control={control}
					render={({ field }) => (
						<Field.Root invalid={!!errors.passwordConfirmation?.message} mb={4}>
							<Field.Label>Passwort Bestätigen</Field.Label>
							<Input {...field} autoComplete="off" margin="normal" type={'password'} />
							{errors.passwordConfirmation?.message && (
								<Field.ErrorText>{errors.passwordConfirmation?.message}</Field.ErrorText>
							)}
						</Field.Root>
					)}
				/>

				<Button type={'submit'} fontSize={'sm'} fontWeight={600} color={'realWhite'} bg={'primary'}>
					Registrieren <ArrowRightIcon />
				</Button>

				<Separator my={5} />

				<Flex justifyContent={'space-between'} align={'center'}>
					<Text>Bereits registriert?</Text>
					<Button
						as={'a'}
						fontSize={'sm'}
						variant="ghost"
						_hover={{ bg: 'gray.50', _dark: { bg: 'gray.600' } }}
						color={'black'}
						fontWeight={600}
						onClick={() => navigate('/login')}
					>
						Anmelden
					</Button>
				</Flex>
			</form>
		</Container>
	);
}
