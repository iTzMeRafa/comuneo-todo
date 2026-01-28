import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';

export default [
	index('./pages/home/home.tsx'),
	route('test', './pages/test/test.tsx'),
	route('register', './pages/register/register.tsx'),
	route('login', './pages/login/login.tsx'),
	route('verify-email', './pages/verify-email/verifyEmail.tsx'),
	route('settings', './pages/settings/settings.tsx'),
] satisfies RouteConfig;
