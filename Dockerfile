FROM node:18 AS builder

# Define ARGs
ARG NEXT_PUBLIC_API_URL

# Use ARGs in ENV
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy all files and build the app
COPY . .

# 
RUN npm run build

# Stage 2: Create a production image
FROM node:18 AS runner
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production --legacy-peer-deps

# Copy the built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public


# Expose the port the app runs on
EXPOSE 8080

# Run the Next.js app
CMD ["npm", "start"]