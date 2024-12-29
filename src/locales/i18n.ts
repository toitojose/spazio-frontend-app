import { createI18n } from 'vue-i18n';
import esEC from './es-EC.json';

// Define el esquema de mensajes basados en el archivo JSON
type MessageSchema = typeof esEC;

// Crea la instancia de i18n con el esquema de mensajes y claves personalizadas
export const i18n = createI18n<{ 'es-EC': MessageSchema }, 'es-EC'>({
  locale: 'es-EC',
  fallbackLocale: 'es-EC',
  messages: {
    'es-EC': esEC,
  },
});
