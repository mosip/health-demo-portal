FROM node:16.13.2-alpine as build

ARG SOURCE
ARG COMMIT_HASH
ARG COMMIT_ID
ARG BUILD_TIME
LABEL source=${SOURCE}
LABEL commit_hash=${COMMIT_HASH}
LABEL commit_id=${COMMIT_ID}
LABEL build_time=${BUILD_TIME}

# can be passed during Docker build as build time environment.
ARG container_user=mosip
ARG container_user_group=mosip
ARG container_user_uid=1001
ARG container_user_gid=1001

ARG idp_api_url
ARG idp_aud_url
ARG client_private_key
ARG userinfo_response_type
ARG jwe_userinfo_private_key

ENV work_dir=/app

WORKDIR /home/${container_user}

RUN addgroup -g ${container_user_gid} ${container_user} && \
    adduser ${container_user} -G ${container_user} -u ${container_user_uid} --disabled-password && \
    chown -R ${container_user}:${container_user} ${work_dir} && \
    chown -R ${container_user}:${container_user} ${HOME_DIR} && \
    apk add --no-cache shadow && \
    apk add --no-cache libc6-compat && \
    npm install && \
    npm cache clean --force

# Now, copy the app
COPY . ./

USER ${container_user_uid}:${container_user_gid}

EXPOSE ${PORT}

CMD ["node", "./app.js"]
