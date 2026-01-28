import React, { JSX } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from 'app/components/navbar';

interface PropsInterface {
	children?: React.ReactNode;
}

export async function loader() {
	return null;
}

function Wireframe(props: PropsInterface): JSX.Element {
	return (
		<Container maxWidth={'8xl'}>
			<Navbar />
			<Box>{props.children}</Box>
		</Container>
	);
}

export default Wireframe;
