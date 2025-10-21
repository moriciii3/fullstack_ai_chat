FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de dependencias primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Luego copiamos el resto del código
COPY . .

# Exponemos el puerto donde Vite sirve la app
EXPOSE 8080

# Comando por defecto
CMD ["npm", "run", "dev"]
