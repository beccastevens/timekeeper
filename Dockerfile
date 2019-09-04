FROM php:7-fpm

MAINTAINER Becca Stevens <christensen.rebeccaa@gmail.com>

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
