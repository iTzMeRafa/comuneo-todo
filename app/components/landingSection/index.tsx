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
	VStack,
	Heading,
} from '@chakra-ui/react';
import { ArrowRightIcon, ChevronsUpDown, LogOutIcon, SettingsIcon } from 'lucide-react';
import { ThemeContext } from 'app/contexts/themeContextChakra';
import { UserInterface } from 'app/interfaces/UserInterface';
import { IMAGE } from 'app/services/imageService';

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
