FROM node:16.13.2-alpine as build

ARG SOURCE
ARG COMMIT_HASH
ARG COMMIT_ID
ARG BUILD_TIME
LABEL source=${SOURCE}
LABEL commit_hash=${COMMIT_HASH}
LABEL commit_id=${COMMIT_ID}
LABEL build_time=${BUILD_TIME}

# Can be passed during Docker build as build time environment.
ARG container_user=mosip
ARG container_user_group=mosip
ARG container_user_uid=1001
ARG container_user_gid=1001

ENV work_dir=/app

WORKDIR /home/${container_user}

# Now, copy the app
COPY . ./

RUN addgroup -g ${container_user_gid} ${container_user} && \
    adduser ${container_user} -G ${container_user} -u ${container_user_uid} --disabled-password && \
    mkdir -p ${work_dir} && \
    chown -R ${container_user}:${container_user} ${work_dir} && \
    apk add --no-cache shadow && \
    apk add --no-cache libc6-compat && \
    npm install && \
    npm cache clean --force

USER ${container_user_uid}:${container_user_gid}

EXPOSE ${PORT}

CMD ["node", "./app.js"]
