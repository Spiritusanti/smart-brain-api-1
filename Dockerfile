FROM node:12.18.4


WORKDIR /usr/src/smart-brain-api
ARG PORT=3000
ENV PORT=$PORT


COPY ./ ./

RUN npm install

EXPOSE $PORT

CMD ["/bin/bash"]