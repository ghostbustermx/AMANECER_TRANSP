# Guía de despliegue en producción — Amanecer Transportation

Este documento describe cómo desplegar el sitio en producción.

Dominio de producción: **https://amanecertransportation.com** (sin subdominios).

Repositorio: `https://github.com/ghostbustermx/AMANECER_TRANSP.git` (rama `main`).

---

## 1. Arquitectura en producción

```
Navegador
  │  https://amanecertransportation.com
  ▼
Nginx Proxy Manager  (contenedor, red externa "npm-network", SSL/TLS)
  │  proxy_pass -> amanecer-app:3001
  ▼
Contenedor Docker "amanecer-app"  (127.0.0.1:3001, red interna "app-network")
  ├─ Express (server/emailServer.mjs)
  │    ├─ Sirve el frontend compilado desde /app/dist
  │    └─ API: POST /api/send-booking, POST /api/send-booking-details
  └─ Volumen de solo lectura: ./server/emailConfig.js  (credenciales de correo)
```

Puntos clave:

- Un **único contenedor** sirve el frontend (build de Vite) y la API de correo.
- El frontend llama a la API usando rutas relativas (`/api/...`), por lo que **no** hay CORS entre frontend y API en producción (mismo origen vía Nginx Proxy Manager).
- El proxy inverso (Nginx Proxy Manager) ya está configurado con el dominio y el certificado SSL.
- `server/emailConfig.js` **no** está en Git ni dentro de la imagen; se monta como volumen. Contiene las contraseñas de correo.

---

## 2. Prerrequisitos

**En el VPS:**

- Docker
- Docker Compose (plugin `docker compose`, v2)
- Git
- El repositorio ya clonado (ver sección 3)

**En la máquina local:**

- Node.js y npm (para validar el build antes de subir)

---

## 3. Configuración inicial (solo la primera vez)

> Si el sitio ya fue desplegado alguna vez, salta directamente a la sección 4.

1. Clonar el repositorio en el VPS:

   ```bash
   cd <RUTA_DEL_REPO>        # ruta donde vive el repo en el VPS
   git clone https://github.com/ghostbustermx/AMANECER_TRANSP.git
   cd AMANECER_TRANSP
   ```

2. Crear la red externa compartida con Nginx Proxy Manager (solo una vez por VPS):

   ```bash
   docker network create npm-network
   ```

3. Crear el archivo de configuración de correo a partir de la plantilla y rellenar las credenciales reales:

   ```bash
   cp server/emailConfig.example.js server/emailConfig.js
   nano server/emailConfig.js       # poner app passwords y correos reales
   ```

   Este archivo no se sube a Git. Debe existir en el VPS porque se monta como volumen.

4. Verificar en la interfaz de Nginx Proxy Manager que el proxy host del dominio apunta al contenedor:

   - Domain: `amanecertransportation.com` (y `www.amanecertransportation.com`)
   - Forward Hostname / IP: `amanecer-app`
   - Forward Port: `3001`
   - Scheme: `http`
   - SSL: certificado Let's Encrypt activo y "Force SSL" habilitado
   - Red Docker del proxy: `npm-network`

---

## 4. Despliegue estándar (paso a paso)

### 4.1 En la máquina local

```bash
# 1. Validar que no haya errores
npm run lint
npm run build

# 2. Subir los cambios
git add .
git commit -m "descripcion del cambio"
git push origin main
```

### 4.2 En el VPS (por SSH)

```bash
ssh <usuario>@<ip-del-vps>
cd <RUTA_DEL_REPO>

# 1. Traer los cambios
git pull origin main

# 2. Reconstruir la imagen y reiniciar el contenedor
docker compose up -d --build

# 3. Ver el arranque
docker compose logs -f
```

`docker compose up -d --build` compila el frontend dentro de la imagen, por lo que **no** hace falta ejecutar `npm run build` en el VPS.

---

## 5. Ajuste único de `server/emailConfig.js` en el VPS

El archivo `server/emailConfig.js` del VPS no está versionado en Git, por lo que hay que actualizarlo a mano una sola vez. Editar el archivo:

```bash
nano server/emailConfig.js
```

### 5.1 Copia oculta (BCC) desde Gmail

El bloque `to` debe quedar así (la copia oculta se envía desde la misma cuenta Gmail con su app password):

```js
  // A quien llegan las solicitudes de reserva
  to: {
    recipients: ['info@amanecertransportation.com'],
    // Copia oculta (CCO / BCC): cada correo recibe una copia enviada
    // desde la misma cuenta Gmail (smtp) con su app password.
    bcc: ['webmaster@venadoblanco.com'],
  },
```

Y **eliminar por completo** la opción `deliverBcc` y el bloque `hostinger` si siguen presentes en el archivo.

### 5.2 Orígenes CORS

Si aún contiene `https://amanecer.sayulitatravel.com` en `security.corsOrigins`, hay que quitarlo. El bloque debe quedar así:

```js
  security: {
    corsOrigins: [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://amanecertransportation.com',
      'https://www.amanecertransportation.com',
    ],
  },
```

### 5.3 Aplicar y comprobar

Aplicar los cambios reiniciando el contenedor:

```bash
docker compose up -d
```

Comprobación (ninguno de los dos debe devolver nada):

```bash
grep -i sayulitatravel server/emailConfig.js
grep -i hostinger server/emailConfig.js
```

---

## 6. Verificación posterior al despliegue

```bash
# 1. El contenedor debe estar "Up" y luego "healthy"
docker ps

# 2. Estado de salud (esperado: 400, porque el body va vacío)
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST http://127.0.0.1:3001/api/send-booking \
  -H "Content-Type: application/json" -d '{}'

# 3. Revisar logs ante cualquier duda
docker compose logs --tail=100
```

En el navegador:

- Abrir `https://amanecertransportation.com` (debe cargar con HTTPS y candado válido).
- Probar el formulario de reserva (barra de reserva del hero y modal) y confirmar que llega el correo.
- Confirmar que el sitio responde bien también en `https://www.amanecertransportation.com`.

---

## 7. Rollback (volver a una versión anterior)

Si una versión rompe producción, volver al commit anterior y reconstruir:

```bash
cd <RUTA_DEL_REPO>

# Ver el historial
git log --oneline -10

# Volver temporalmente a un commit anterior (sin tocar el historial remoto)
git checkout <commit-anterior>

# Reconstruir y reiniciar con esa versión
docker compose up -d --build

docker compose logs -f
```

Para volver a la rama principal una vez resuelto:

```bash
git checkout main
git pull origin main
docker compose up -d --build
```

---

## 8. Solución de problemas

**`network npm-network declared as external, but could not be found`**
La red compartida no existe. Crearla:
```bash
docker network create npm-network
docker compose up -d --build
```

**El contenedor arranca pero el correo no se envía**
Falta el archivo `server/emailConfig.js` o tiene credenciales incorrectas. Revisar:
```bash
docker compose logs --tail=100
ls -l server/emailConfig.js
```

**Error 502 Bad Gateway desde el navegador**
Nginx Proxy Manager no encuentra el contenedor. Verificar que el contenedor está `Up` (`docker ps`), que escucha en `3001` y que el proxy host apunta a `amanecer-app:3001` en la red `npm-network`.

**El contenedor aparece como `unhealthy`**
El healthcheck hace `POST /api/send-booking` esperando un `400`. Si falla:
```bash
docker inspect --format '{{json .State.Health}}' amanecer-app
docker compose logs --tail=100
```

**El sitio muestra una versión vieja**
La imagen no se reconstruyó. Forzar:
```bash
docker compose up -d --build --force-recreate
```

---

## 9. Notas de seguridad

- `server/emailConfig.js` contiene contraseñas de aplicación y **nunca** debe subirse a Git (ya está en `.gitignore` y en `.dockerignore`).
- No exponer el puerto `3001` al público: el contenedor se enlaza solo a `127.0.0.1:3001`; todo el tráfico entra por Nginx Proxy Manager.
- Tras cambiar cualquier credencial en `server/emailConfig.js`, reiniciar el contenedor con `docker compose up -d`.
