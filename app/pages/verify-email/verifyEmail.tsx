import { account } from 'app/libs/appwrite';
import { Heading, Container, Spinner, VStack, Text, Button } from '@chakra-ui/react';
import { toaster } from 'app/components/toaster';
import { useNavigate, useSearchParams } from 'react-router';
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

	useEffect(() => {
		const userId = searchParams.get('userId');
		const secret = searchParams.get('secret');

		if (!userId || !secret) {
			setStatus('error');
			setLoading(false);
			return;
		}

		const verify = async () => {
			try {
				await account.updateVerification(userId, secret);

				setStatus('success');
				toaster.create({
					title: 'Erfolg!',
					description: 'Deine E-Mail wurde erfolgreich verifiziert.',
					type: 'success',
				});

				setTimeout(() => navigate('/'), 3000);
			} catch (error: any) {
				setStatus('error');
				toaster.create({
					title: 'Fehler',
					description: 'Verifizierung fehlgeschlagen oder Link abgelaufen.',
					type: 'error',
				});
			} finally {
				setLoading(false);
			}
		};

		verify();
	}, [searchParams, navigate]);

	return (
		<Container maxWidth={'xl'} py={20}>
			<VStack gap={6} textAlign="center">
				{status === 'loading' && (
					<>
						<Spinner size="xl" color="primary" />
						<Heading size="md">E-Mail wird verifiziert...</Heading>
					</>
				)}

				{status === 'success' && (
					<>
						<Heading size="lg" color="green.500">
							✓ Verifiziert
						</Heading>
						<Text>Vielen Dank! Du wirst gleich weitergeleitet.</Text>
						<Button onClick={() => navigate('/')} variant="outline">
							Zum Dashboard
						</Button>
					</>
				)}

				{status === 'error' && (
					<>
						<Heading size="lg" color="red.500">
							Verifizierung fehlgeschlagen
						</Heading>
						<Text>Der Link ist ungültig oder bereits abgelaufen.</Text>
						<Button onClick={() => navigate('/login')} bg="primary" color="white">
							Zurück zum Login
						</Button>
					</>
				)}
			</VStack>
		</Container>
	);
}
