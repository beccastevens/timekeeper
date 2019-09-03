FROM nginx

MAINTAINER Becca Stevens <christensen.rebeccaa@gmail.com>

RUN apt-get install php-fpm
RUN systemctl status php7.0-fpm.service

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /var/www/html
ADD . /var/www/html
