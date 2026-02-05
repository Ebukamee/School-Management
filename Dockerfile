FROM php:8.2-fpm

# 1. Install System Dependencies (Includes Postgres)
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 2. Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Install PHP Extensions (Includes Postgres Driver)
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Setup Working Directory
WORKDIR /var/www
COPY . .

# 5. Build Backend
RUN composer install --no-dev --optimize-autoloader

# 6. Build Frontend
# (Make sure your VITE variable is passed in deploy args if needed)
ARG VITE_ADMIN_SECURITY_CODE
ENV VITE_ADMIN_SECURITY_CODE=$VITE_ADMIN_SECURITY_CODE
RUN npm ci && npm run build

# 7. Permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 8. Start Server (WITH MIGRATION)
EXPOSE 8080
CMD sh -c "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8080"