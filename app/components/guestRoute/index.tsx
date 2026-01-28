import React, { JSX, useEffect, useState } from 'react';
import { account } from 'app/libs/appwrite';
import { useNavigate } from 'react-router';
import { Box, Spinner } from '@chakra-ui/react';
import { UserInterface } from 'app/interfaces/UserInterface';

interface PropsInterface {
	children?: React.ReactNode;
}

function GuestRoute(props: PropsInterface): JSX.Element {
	const [user, setUser] = useState<UserInterface | null | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const accountData = await account.get();
				setUser(accountData);
			} catch {
				setUser(null);
			}
		})();
	}, []);

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	if (user === undefined)
		return (
			<Box>
				<Spinner mr={5} /> Lädt...
			</Box>
		);

	return <>{!user && props.children}</>;
}

export default GuestRoute;
