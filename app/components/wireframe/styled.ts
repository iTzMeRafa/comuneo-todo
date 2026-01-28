import { Box, Theme } from '@chakra-ui/react';
import { styled } from '@mui/system';
import { css, isStylePropFn } from '@chakra-ui/styled-system';

export const Example_ = styled(Box, {
	shouldForwardProp: (prop: string) => !['bgCoulo_'].includes(prop),
})<{
	theme?: typeof Theme;
	bgCoulo_: 'red' | 'blue';
}>(({ theme, bgCoulo_, ...rest }) => {
	const styleProps = Object.fromEntries(
		Object.entries(rest).filter(([prop]) => typeof prop === 'string' && isStylePropFn(prop))
	);
	const systemStyles = css(styleProps)(theme);
	return {
		...systemStyles,
		backgroundColor: bgCoulo_,
		width: theme.spacing(50),
	};
});
