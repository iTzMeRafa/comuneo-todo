import React, { JSX, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { UserInterface } from 'app/interfaces/UserInterface';
import { account } from 'app/libs/appwrite';
import LandingSection from 'app/components/landingSection';
import TodoList from 'app/components/todoList';

interface PropsInterface {
	children?: React.ReactNode;
}

export async function loader() {
	return null;
}

export function Home(props: PropsInterface): JSX.Element {
	const [userAccount, setUserAccount] = React.useState<UserInterface | null>(null);

	useEffect(() => {
		(async () => {
			const userAccount = await account.get();
			setUserAccount(userAccount);
		})();
	}, [account]);

	return (
		<Box>
			{!userAccount ? (
				<LandingSection />
			) : (
				<Box mb={40}>
					<TodoList />
				</Box>
			)}
		</Box>
	);
}

export default Home;
