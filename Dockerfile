FROM node:12.18.4


WORKDIR /usr/src/smart-brain-api
ENV PORT=$PORT


COPY ./ ./

RUN npm install

EXPOSE $PORT

CMD ["/bin/bash"]