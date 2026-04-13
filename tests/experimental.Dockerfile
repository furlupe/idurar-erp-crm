FROM alpine:3.22.1 AS installer

ARG JMETER_DISTR_FILE=apache-jmeter-5.6.3
ARG JMETER_DISTR_LINK=https://dlcdn.apache.org/jmeter/binaries/${JMETER_DISTR_FILE}.tgz

RUN apk add --no-cache wget

RUN wget $JMETER_DISTR_LINK \
    && mkdir -p /downloads \
    && tar -xzf $JMETER_DISTR_FILE.tgz -C downloads

RUN mv downloads/$JMETER_DISTR_FILE /jmeter \
    && rm -r downloads

FROM eclipse-temurin:25.0.2_10-jre-noble AS runtime
COPY --from=installer /jmeter /jmeter

ENTRYPOINT ["java", "-jar", "/jmeter/bin/ApacheJMeter.jar"]
CMD ["--help"]