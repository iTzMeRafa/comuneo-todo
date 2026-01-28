import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { account } from 'app/libs/appwrite';
import { Button, Field, Flex, Input, Separator, Text, Heading, Container } from '@chakra-ui/react';
import { ArrowRightIcon } from 'lucide-react';
import { toaster } from 'app/components/toaster';
import { UserLoginFormInterface, userLoginFormSchema } from 'app/schemas/userLoginFormSchema';
import GuestRoute from 'app/components/guestRoute';
import { useNavigate } from 'react-router';

export async function loader() {
	return null;
}

export default function Login() {
	let navigate = useNavigate();

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<UserLoginFormInterface, any, any>({
		defaultValues: {
			email: '',
			password: '',
		} as UserLoginFormInterface,
		resolver: yupResolver(userLoginFormSchema),
	});

	const onSubmit = async (data: UserLoginFormInterface) => {
		try {
			const result = await account.createEmailPasswordSession({
				email: data.email,
				password: data.password,
			});
			window.location.reload();
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
		<GuestRoute>
			<Container maxWidth={'xl'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading fontSize={40} mb={10}>
						Anmelden
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
								{errors.password?.message && (
									<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
								)}
							</Field.Root>
						)}
					/>

					<Button type={'submit'} fontSize={'sm'} fontWeight={600} color={'realWhite'} bg={'primary'}>
						Anmelden <ArrowRightIcon />
					</Button>

					<Separator my={5} />

					<Flex justifyContent={'space-between'} align={'center'}>
						<Text>Noch kein Account?</Text>
						<Button
							as={'a'}
							fontSize={'sm'}
							variant="ghost"
							_hover={{ bg: 'gray.50', _dark: { bg: 'gray.600' } }}
							color={'black'}
							fontWeight={600}
							onClick={() => navigate('/register')}
						>
							Registrieren
						</Button>
					</Flex>
				</form>
			</Container>
		</GuestRoute>
	);
}
