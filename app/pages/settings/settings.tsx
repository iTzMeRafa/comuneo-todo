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
import UpdateEmailForm from 'app/components/updateEmailForm/updateEmailForm';
import UpdateNameForm from 'app/components/updateNameForm/updateNameForm';
import UpdatePasswordForm from 'app/components/updatePasswordForm/updatePasswordForm';

export async function loader() {
	return null;
}

export default function Settings() {
	return (
		<Container maxWidth={'xl'} mb={40}>
			<Heading fontSize={40} mb={10}>
				Einstellungen
			</Heading>
			<UpdateEmailForm />
			<Separator my={5} />
			<UpdateNameForm />
			<Separator my={5} />
			<UpdatePasswordForm />
		</Container>
	);
}
