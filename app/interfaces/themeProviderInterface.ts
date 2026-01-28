import { Dispatch, SetStateAction } from 'react';

export interface ThemeProviderInterface {
	colorScheme: 'light' | 'dark';
}

export interface ThemeContextInterface {
	theme: ThemeProviderInterface;
	setTheme: Dispatch<SetStateAction<ThemeProviderInterface>>;
}
