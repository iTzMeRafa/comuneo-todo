import * as yup from 'yup';
import { de } from 'yup-locales';
import { setLocale } from 'yup';

declare module 'yup' {
	interface StringSchema {}

	interface NumberSchema {}
}

setLocale(de);

export const yupClient = yup;
