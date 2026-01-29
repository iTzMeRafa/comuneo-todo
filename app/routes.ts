import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
	index('./pages/home/home.tsx'),
	route('test', './pages/test/test.tsx'),
	route('signup', './pages/signup/signup.tsx'),
	route('login', './pages/login/login.tsx'),
	route('verify-email', './pages/verify-email/verifyEmail.tsx'),
	route('settings', './pages/settings/settings.tsx'),
] satisfies RouteConfig;
