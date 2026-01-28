import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

let paletteCommon = {
	primary: '#27256F',
	secondary: '#4FD1C5',
	realBlack: '#000000',
	realWhite: '#FFFFFF',
	realYellow: '#F6E05E',
	light: {
		primary: '#EBF8FF',
	},
	dark: {
		primary: '#27256F',
	},
};

const gradients = {
	gradientPrimary: {
		value: `linear-gradient(to right, ${paletteCommon.primary} 0%, ${paletteCommon.secondary} 100%)`,
	},
	gradientSection: {
		value: `linear-gradient(to bottom right, #EBF8FF, ${paletteCommon.realWhite}, #BEE3F8)`,
	},
};
paletteCommon = { ...paletteCommon, ...gradients };

const paletteLight = {
	colors: {
		...paletteCommon,

		white: '#FFFFFF',
		black: '#0F0F0F',
		focus: { value: '#2B6CB0' },
		focusRing: {
			value: {
				base: '##27256F',
				_dark: '#27256F',
			},
		},
	},
};

const paletteDark = {
	colors: {
		...paletteCommon,
		white: '#1B1B1F',
		black: '#FFFFFF',
		test: 'yellow',
		focus: { value: '#27256F' },
		focusRing: {
			value: {
				base: '#27256F',
				_dark: '#27256F',
			},
		},
	},
};

const breakpoints = {
	breakpoints: {
		sm: '320px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
	},
};

const keyframes = {
	keyframes: {
		blob: {
			'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
			'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
			'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
		},
	},
};

const genericSettings = {
	preflight: true,
	strictTokens: true,
};

const globalCss = (mode: 'light' | 'dark') => {
	return {
		globalCss: {
			'html, body, .dark, .light': {
				mode: 'dark !important',
				// overflowX: 'hidden',
			},
			em: {
				fontStyle: 'italic',
				fontWeight: 'inherit',
				color: mode === 'light' ? paletteLight.colors.black : paletteDark.colors.white,
				backgroundColor: 'gray.50',
				padding: '0 8px',
				borderRadius: '3px',
				// display: 'inline-block',
				boxDecorationBreak: 'clone',
			},
			'.chakra-theme': {
				backgroundColor: `${
					mode === 'light' ? paletteLight.colors.white : paletteDark.colors.white
				} !important`,
			},
			'::-webkit-scrollbar': {
				width: '12px', // width of vertical scrollbar
				height: '12px', // height of horizontal scrollbar
			},
			'::-webkit-scrollbar-track': {
				background: '#f1f1f1', // track color
			},
			'::-webkit-scrollbar-thumb': {
				background: '#F67280', // thumb color
				borderRadius: '6px',
			},
			'::-webkit-scrollbar-thumb:hover': {
				background: '#c25565', // thumb hover color
			},
			a: {
				color: paletteLight.colors.primary,
				':hover': {
					textDecoration: 'underline',
				},
			},
		},
	};
};

const configLight = defineConfig({
	...genericSettings,
	...breakpoints,
	...globalCss('light'),
	theme: {
		...keyframes,
		// @ts-ignore
		tokens: {
			...paletteLight,
		},
	},
});

const configDark = defineConfig({
	...genericSettings,
	...breakpoints,
	...globalCss('dark'),
	theme: {
		...keyframes,
		// @ts-ignore
		tokens: {
			shadows: {
				primary: {
					value: `0px 16px 24px color-mix(in srgb, ${paletteDark.colors.primary} 10%, transparent),
						0px 0px 1px color-mix(in srgb, ${paletteDark.colors.primary} 30%, transparent) !important`,
				},
			},
			...paletteDark,
		},
	},
});

export const getSystemTheme = (mode: 'light' | 'dark', configOnly?: boolean) => {
	switch (mode) {
		case 'light':
			return configOnly ? configLight : createSystem(defaultConfig, configLight);
		case 'dark':
			return configOnly ? configDark : createSystem(defaultConfig, configDark);
		default:
			return configOnly ? configLight : createSystem(defaultConfig, configLight);
	}
};
