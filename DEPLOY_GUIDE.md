# Guía de Despliegue en Vercel con Firebase

## 1. Configuración de Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Crea un nuevo proyecto.
3. Habilita **Authentication** (Email/Password).
4. Habilita **Firestore Database** (Modo producción).
5. Copia las reglas de seguridad de `FIREBASE_RULES.md` y pégalas en la pestaña "Rules" de Firestore.
6. Ve a Configuración del Proyecto -> General -> Tus apps -> Web App.
7. Copia la configuración del SDK.

## 2. Configuración Local (Entorno de Desarrollo)
1. Crea un archivo llamado `.env.local` en la raíz del proyecto.
2. Copia el contenido de `.env.example` dentro de `.env.local`.
3. Reemplaza los valores de ejemplo con tus credenciales reales de Firebase.

Ejemplo de `.env.local`:
```env
VITE_API_KEY=AIzaSy...
VITE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_PROJECT_ID=tu-proyecto
VITE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_SENDER_ID=123456...
VITE_APP_ID=1:12345...
```

## 2. Configuración de Vercel
1. Ve a tu proyecto en Vercel.
2. Ve a **Settings** -> **Environment Variables**.
3. Agrega las siguientes variables con los valores de tu configuración de Firebase:

| Variable | Valor (Ejemplo) |
|----------|-----------------|
| `VITE_API_KEY` | `AIzaSy...` |
| `VITE_AUTH_DOMAIN` | `tu-proyecto.firebaseapp.com` |
| `VITE_PROJECT_ID` | `tu-proyecto` |
| `VITE_STORAGE_BUCKET` | `tu-proyecto.appspot.com` |
| `VITE_SENDER_ID` | `123456...` |
| `VITE_APP_ID` | `1:12345...` |

## 3. Despliegue
Una vez configuradas las variables, haz un nuevo push a tu repositorio o redepliega manualmente desde Vercel para que tome los cambios.

## 4. Primer Usuario (Admin)
1. Regístrate en la aplicación (`/register`).
2. Ve a Firebase Console -> Firestore -> colección `users`.
3. Busca tu usuario y cambia manualmente:
   - `role`: de `"user"` a `"admin"`
   - `status`: de `"pending"` a `"approved"`
4. Recarga la aplicación y tendrás acceso total.
