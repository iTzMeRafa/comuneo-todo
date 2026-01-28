import { Separator, Heading, Container } from '@chakra-ui/react';
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
