import React, { JSX, useContext, useEffect, useState } from 'react';
import { client } from 'app/libs/appwrite';
import { account } from 'app/libs/appwrite';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverTrigger,
	Portal,
	Stack,
	Text,
	Menu,
	Avatar,
	Float,
	Icon,
	Spinner,
} from '@chakra-ui/react';
import { ArrowRightIcon, ChevronsUpDown, LogOutIcon, SettingsIcon } from 'lucide-react';
import { ThemeContext } from 'app/contexts/themeContextChakra';
import { UserInterface } from 'app/interfaces/UserInterface';
import { IMAGE } from 'app/services/imageService';

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
