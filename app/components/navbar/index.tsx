import React, { JSX, useContext, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { ArrowRightIcon, ChevronsUpDown, LogOutIcon, SettingsIcon } from 'lucide-react';
import { ThemeContext } from 'app/contexts/themeContextChakra';
import { UserInterface } from 'app/interfaces/UserInterface';
import { IMAGE } from 'app/services/imageService';

interface PropsInterface {
	children?: React.ReactNode;
}

const NAV_ITEMS = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Test',
		href: '/test',
	},
];

function Navbar(props: PropsInterface): JSX.Element {
	const { theme, setTheme } = useContext(ThemeContext);

	const [userAccount, setUserAccount] = React.useState<UserInterface | null>(null);

	let navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const userAccount = await account.get();
			setUserAccount(userAccount);

			console.log('userAccount');
			console.log(userAccount);
		})();
	}, [account]);

	const DesktopNav = () => {
		return (
			<Stack direction={'row'} gap={10} w={'100%'} justify={'center'}>
				{NAV_ITEMS.map((navItem, index) => {
					const textColorLight = 'primary';

					return (
						<Box key={index.toString()}>
							<Popover.Root key={index.toString()} positioning={{ placement: 'bottom-start' }}>
								<PopoverTrigger asChild display={'flex'}>
									<Box
										css={{ cursor: 'pointer' }}
										p={2}
										fontWeight={500}
										whiteSpace="nowrap"
										color={textColorLight}
										_hover={{ color: 'primary' }}
									>
										<Link to={navItem.href}>
											<Flex align="center" justify="center" gap={3}>
												<Text
													fontWeight={600}
													color={textColorLight}
													_hover={{ color: 'primary' }}
												>
													{navItem.label}
												</Text>
											</Flex>
										</Link>
									</Box>
								</PopoverTrigger>
							</Popover.Root>
						</Box>
					);
				})}
			</Stack>
		);
	};

	return (
		<Box position={'sticky'} top={0} zIndex={999} mb={10}>
			<Flex
				bg={'white'}
				color={'gray.600'}
				height={'80px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={'gray.200'}
				align={'center'}
			>
				<Flex justify="space-between" align="center" w="100%" gap={10}>
					<Flex
						justify={{ base: 'center', xl: 'start' }}
						align={'center'}
						flex={{ base: '0 1 auto', xl: '0 0 auto' }}
						w={{ base: '100%', xl: '300px' }}
					>
						<img
							src={
								'https://static.wixstatic.com/media/2d9376_684688cb9d90412f966decb89c54b243~mv2.jpg/v1/fill/w_494,h_138,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2d9376_684688cb9d90412f966decb89c54b243~mv2.jpg'
							}
							width={200}
							alt={'Logo'}
						/>
					</Flex>

					<Flex
						display={{ base: 'none', xl: 'flex' }}
						justify={{ base: 'center', xl: 'center' }}
						w={'100%'}
						css={{ overflowX: 'auto', overflowY: 'hidden' }}
					>
						<Flex display={{ base: 'none', xl: 'flex' }} justify={'center'} w={'100%'}>
							<DesktopNav />
						</Flex>
					</Flex>

					<Stack
						flex={{ base: '0 0 auto', xl: '0 0 auto' }}
						justify={'flex-end'}
						direction={'row'}
						gap={6}
						w={{ base: 'auto', xl: '300px' }}
					>
						{!userAccount && (
							<>
								<Link to={'/login'}>
									<Button
										fontSize={'sm'}
										variant="ghost"
										_hover={{ bg: 'gray.50', _dark: { bg: 'gray.600' } }}
										color={'black'}
										fontWeight={600}
									>
										<Text color={'primary'}>Anmelden</Text>
									</Button>
								</Link>
								<Link to={'/register'}>
									<Button
										display={{ base: 'none', lg: 'inline-flex' }}
										fontSize={'sm'}
										fontWeight={600}
										color={'realWhite'}
										bg={'primary'}
										_hover={{ bg: 'primary.500' }}
									>
										<Text color={'realWhite'}>Registrieren</Text> <ArrowRightIcon />
									</Button>
								</Link>
							</>
						)}
						{!!userAccount && (
							<Flex alignItems={'center'} gap={5}>
								<Menu.Root>
									<Menu.Trigger rounded="full" focusRing="outside">
										<Avatar.Root size="sm" _hover={{ cursor: 'pointer' }}>
											<Avatar.Fallback name={'Günther'} />
											<Avatar.Image src={IMAGE.DEFAULT_AVATAR} />
											<Float placement="bottom-end" offsetX="0" offsetY="1">
												<Icon
													_hover={{ cursor: 'pointer', shadow: 'xl' }}
													as={ChevronsUpDown}
													strokeWidth={3}
													boxSize={'16px'}
													bg={'realWhite'}
													borderRadius={'50%'}
													outlineColor="bg"
												/>
											</Float>
										</Avatar.Root>
									</Menu.Trigger>
									<Portal>
										<Menu.Positioner boxShadow={'primary'}>
											<Menu.Content _hover={{ cursor: 'pointer' }} width={300} maxWidth={'100%'}>
												<Flex alignItems={'center'} gap={4} mb={4}>
													<Avatar.Root
														size="sm"
														_hover={{ cursor: 'pointer' }}
														onClick={() => null}
													>
														<Avatar.Fallback name={'Günther'} />
														<Avatar.Image src={IMAGE.DEFAULT_AVATAR} />
													</Avatar.Root>
													<Flex direction={'column'}>
														<Text fontWeight={600} truncate w={'200px'}>
															{userAccount.name}
														</Text>
														<Text truncate w={'200px'}>
															{userAccount.email}
														</Text>
													</Flex>
												</Flex>
												<Menu.Item
													value="settings"
													height={'40px'}
													_hover={{ cursor: 'pointer' }}
													mb={'1'}
													onClick={() => navigate('/settings')}
												>
													<SettingsIcon size={20} />
													<Box flex="1" ml={3}>
														Einstellungen
													</Box>
												</Menu.Item>
												<Menu.Item
													value="logout"
													_hover={{ cursor: 'pointer' }}
													onClick={async () => {
														await account.deleteSessions();
														window.location.reload();
													}}
													height={'40px'}
												>
													<LogOutIcon size={20} />
													<Box flex="1" ml={3}>
														Abmelden
													</Box>
												</Menu.Item>
											</Menu.Content>
										</Menu.Positioner>
									</Portal>
								</Menu.Root>
							</Flex>
						)}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
}

export default Navbar;
