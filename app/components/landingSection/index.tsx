import React, { JSX } from 'react';
import { Link } from 'react-router';
import { Box, Button, Text, VStack, Heading } from '@chakra-ui/react';

interface PropsInterface {
	children?: React.ReactNode;
}

function LandingSection(props: PropsInterface): JSX.Element {
	return (
		<Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
			<VStack gap={6} textAlign="center" maxW="lg">
				<Heading size="2xl">To-Do Listen App</Heading>
				<Text color="gray.500">
					Organisiere deine Aufgaben mit verschachtelten To-dos. Bleib fokussiert. Bleib produktiv.
				</Text>

				<Link to={'/register'}>
					<Button bg="primary" size="lg">
						Los gehts
					</Button>
				</Link>
			</VStack>
		</Box>
	);
}

export default LandingSection;
