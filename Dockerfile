FROM node:20
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY .babelrc ./

# Instalar dependencias incluyendo devDependencies para el build
RUN npm install

# Copiar código fuente
COPY src/ ./src/
COPY deploy/ ./deploy/

# Build el proyecto
RUN npm run build

# Limpiar devDependencies después del build
RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"]