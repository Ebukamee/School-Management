# 1. Use PHP 8.2
FROM php:8.2-fpm

# 2. Install Node.js 20 and system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 4. Install PHP Extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# 5. Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Set working directory
WORKDIR /var/www

# 7. Copy project files
COPY . .

# 8. Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# 9. Install Node dependencies & Build Inertia
RUN npm ci
RUN npm run build

# 10. Fix permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 11. Start the server
EXPOSE 8080
CMD php artisan serve --host=0.0.0.0 --port=8080