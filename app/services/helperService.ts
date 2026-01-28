export const extractJWTFromCookie = (cookie: string): string | null => {
	const match = cookie.match(/a_session_[^=]+=([^;]+)/);
	return match ? match[1] : null;
};
