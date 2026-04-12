FROM eclipse-temurin:24-jdk-alpine AS installer

ARG JMETER_DISTR_FILE=apache-jmeter-5.6.3
ARG JMETER_DISTR_LINK=https://dlcdn.apache.org/jmeter/binaries/${JMETER_DISTR_FILE}.tgz

RUN apk add --no-cache wget

RUN wget $JMETER_DISTR_LINK \
    && mkdir -p /downloads \
    && tar -xzf $JMETER_DISTR_FILE.tgz -C downloads

RUN mv downloads/$JMETER_DISTR_FILE /jmeter \
    && rm -r downloads

RUN jlink \
        --add-modules java.se \
        --strip-debug \
        --no-man-pages \
        --no-header-files \
        --compress=2 \
        --output /jre

FROM alpine:3.22.1 AS runtime
COPY --from=installer /jre /jre
COPY --from=installer /jmeter /jmeter

ENV JAVA_HOME=/jre
ENV PATH=/jre/bin:${PATH}

ENTRYPOINT ["java", "-jar", "/jmeter/bin/ApacheJMeter.jar"]
CMD ["--help"]