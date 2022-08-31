FROM nginx:1.23.1
MAINTAINER BetaLab

RUN apt-get update -y && \
    apt-get install -y python3 && \
    apt-get clean

COPY ./configs/container/start.sh /start.sh
COPY ./configs/container/env_setup.py /env_setup.py
COPY ./configs/container/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html

CMD ["/bin/bash", "/start.sh"]
