interface ImportMetaEnv {
	// GENERAL
	readonly NEXT_PUBLIC_APP_NAME: string;
	readonly NODE_ENVIRONMENT: string;
	readonly NEXT_PUBLIC_NODE_ENVIRONMENT: string;
	readonly PROCESS_NAME: string;
	readonly VITE_HOST_URL: string;

	// Appwrite
	readonly VITE_APPWRITE_PROJECT_ID: string;
	readonly VITE_APPWRITE_PROJECT_NAME: string;
	readonly VITE_APPWRITE_ENDPOINT: string;
	readonly VITE_APPWRITE_DATABASE_API_KEY: string;

	// SMTP MAIL
	readonly MAIL_HOST: string;
	readonly MAIL_PORT: string;
	readonly MAIL_USERNAME: string;
	readonly MAIL_PASSWORD: string;
	readonly MAIL_SECURE: string;
	readonly MAIL_SENDER: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
