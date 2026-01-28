import React from 'react';
import { ThemeContextInterface, ThemeProviderInterface } from 'app/interfaces/themeProviderInterface';
import { getSystemTheme } from 'app/styles/theme';
import { ChakraProvider, Theme } from '@chakra-ui/react';

const defaultValues: ThemeProviderInterface = {
	colorScheme: 'light',
};

export const ThemeContext = React.createContext<ThemeContextInterface>({
	theme: defaultValues,
	setTheme: () => null,
});

interface ChakraThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({ children }: ChakraThemeProviderProps) {
	const [theme, setTheme] = React.useState<ThemeProviderInterface>(defaultValues);

	const systemTheme = getSystemTheme(theme.colorScheme);

	return (
		<ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
			<ChakraProvider value={systemTheme as unknown as any}>
				<Theme appearance={theme.colorScheme}>{children}</Theme>
			</ChakraProvider>
		</ThemeContext.Provider>
	);
}
