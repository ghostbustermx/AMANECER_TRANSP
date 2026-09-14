# ============================================================
# BUILD STAGE - compila el frontend con Vite
# ============================================================
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ============================================================
# RUNTIME STAGE - sirve dist + API (emailServer.mjs)
# ============================================================
FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY server ./server

ENV PORT=3001
EXPOSE 3001

# La ruta /api/send-booking existe; con payload vacio responde 400 (no 404)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD ["node", "-e", "const p = process.env.PORT || 3001; fetch('http://127.0.0.1:' + p + '/api/send-booking', { method: 'post', headers: { 'content-type': 'application/json' }, body: '{}' }).then(r => process.exit(r.status === 400 ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server/emailServer.mjs"]