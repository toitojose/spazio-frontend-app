import { createI18n } from 'vue-i18n';
import esEC from './es-EC.json';

// Define el esquema de mensajes basados en el archivo JSON
type MessageSchema = typeof esEC;

// Función para normalizar el idioma del navegador
function getNormalizedLocale(): string {
  const browserLocale = navigator.language || 'es-EC'; // Idioma del navegador
  if (browserLocale.startsWith('es')) {
    return 'es-EC'; // Redirige todos los "es-*" a "es-EC"
  }
  return 'es-EC'; // Idioma predeterminado si no es soportado
}

// Crea la instancia de i18n con el esquema de mensajes y claves personalizadas
export const i18n = createI18n<{ 'es-EC': MessageSchema }, 'es-EC'>({
  legacy: false,
  locale: getNormalizedLocale(), // Usar el idioma normalizado
  fallbackLocale: 'es-EC', // Respaldo en caso de que no se encuentre el idioma
  messages: {
    'es-EC': esEC, // Tus traducciones para español ecuatoriano
  },
});
