import { JSX } from 'react';
import { Box, Button } from '@chakra-ui/react';

interface PropsInterface {
	children?: React.ReactNode;
}

export async function loader() {
	return null;
}

export function Home(props: PropsInterface): JSX.Element {
	return (
		<Box>
			<h1>Startseite</h1>
			<Button>Test</Button>
		</Box>
	);
}

export default Home;
