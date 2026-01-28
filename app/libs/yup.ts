import * as yup from 'yup';
import { de } from 'yup-locales';
import { setLocale } from 'yup';

setLocale(de);

export const yupClient = yup;
