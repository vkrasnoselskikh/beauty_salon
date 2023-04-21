FROM php:8.0
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN apt-get update && apt-get -y install libzip-dev libicu-dev curl
RUN docker-php-ext-install pdo pdo_mysql zip
RUN pecl install xdebug-3.0.3 &&  \
    echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host = host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN docker-php-ext-enable xdebug