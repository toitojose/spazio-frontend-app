# Proyecto SPAZIO <img src="https://vitejs.dev/logo.svg" alt="Vite Logo" width="60" />


Este proyecto utiliza Vue 3, Pinia, TypeScript, Vite y PrimeVue para construir una aplicación frontend moderna y escalable. A continuación, se presentan los pasos para configurar, personalizar y ejecutar el proyecto.

## Requisitos previos

- Node.js v22.12.0.
- npm v8.0.0 o superior.
- Editor de texto recomendado: Visual Studio Code.

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/spazio-frontend-app.git
   cd spazio-frontend-app
   ```

2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

## Configuración del entorno

1. Crear un archivo `.env` en la raíz del proyecto y configurar las variables de entorno necesarias:
   ```env
   VITE_APP_NAME=Spazio
   VITE_API_BASE_URL=https://api.spazio.com
   VITE_FRONTEND_PORT=8090
   ```

2. Configuración del entorno local a través de `spazio-local-dev`:
    - Asegúrate de que el entorno local está configurado para levantar la base de datos y el backend. Sigue las instrucciones específicas de `spazio-local-dev` para iniciar los servicios necesarios.
    - Para levantar el entorno local, usa los scripts disponibles en `spazio-local-dev` que gestionan la base de datos y el backend.
    - Asegúrate de que las variables de entorno para conectarte al backend local estén configuradas correctamente en el archivo `.env`.

3. Configuración de rutas en el archivo `router/i18n.ts`. Se han dividido en rutas públicas y privadas. Las rutas de autenticación se encuentran en `router/public/backoffice-routes.ts`.

## Ejecución del proyecto

La aplicación estará disponible en [http://localhost:8090](http://localhost:8090).

- **Construcción para producción:**
  ```bash
  npm run build
  ```

  Los archivos construidos estarán en la carpeta `dist/`.

- **Vista previa de producción:**
  ```bash
  npm run preview
  ```

## Linter y formateo

Se ha configurado ESLint con reglas personalizadas para Vue y TypeScript, incluyendo soporte para Prettier:

- **Ejecutar ESLint:**
  ```bash
  npm run lint
  ```

- **Modo desarrollo:**
  ```bash
  npm run dev
  ```

## Tema de PrimeVue

El proyecto utiliza el tema `Aura` de PrimeVue sin personalizaciones adicionales. Esto asegura una integración estable y sencilla.

### Configuración del tema

1. En `main.ts`, se aplica el tema directamente:
   ```ts
   import PrimeVue from "primevue/config";
   import Aura from "@primevue/themes/aura";

   app.use(PrimeVue, {
       theme: {
           preset: Aura,
       },
   });
   ```

## Estructura del proyecto

```
spazio-frontend-app/
├── public/                # Archivos públicos
├── src/
│   ├── assets/            # Archivos estáticos
│   ├── components/        # Componentes reutilizables
│   ├── router/            # Configuración de rutas
│   ├── store/             # Gestión de estado con Pinia
│   ├── ui/                # Vistas y estilos
│   └── main.ts            # Punto de entrada principal
├── eslint.config.js       # Configuración de ESLint
├── vite.config.ts         # Configuración de Vite
└── package.json           # Dependencias y scripts del proyecto
```

## Contribuciones

Por favor sigue los pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad o corrección de errores: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza los cambios y commitea: `git commit -m "Agrega nueva funcionalidad"`.
4. Haz un push a la rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.
