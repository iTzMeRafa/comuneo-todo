import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import Wireframe from 'app/components/wireframe';
import { Toaster } from 'app/components/toaster';
import { ThemeProvider } from 'app/contexts/themeContextChakra';
import { Box } from '@chakra-ui/react';

export const links = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<ThemeProvider>
					<Toaster />
					<Wireframe>{children}</Wireframe>
				</ThemeProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: { error: any }) {
	let message = 'Oops!';
	let details = 'Ein Fehler ist aufgetreten.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'Die Seite konnte nicht gefunden werden.' : error.statusText || details;
	} else if (import.meta.env.NODE_ENVIRONMENT === 'development' && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Box>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre>
					<code>{stack}</code>
				</pre>
			)}
		</Box>
	);
}
