New-Item -ItemType Directory -Path "last-run" -Force | Out-Null

docker run `
    --rm `
    --name "jmeter-test" `
    -v "./:/host" `
    --network "host" `
    jmeter-test-exp `
    -n `
    -t "/host/register-payments.jmx" `
    -l "/host/last-run/results" `
    -e `
    -o "/host/last-run/report" `
    -Jthreads_num="100" `
    -Jramp_up_seconds="10" `
    -Jloops="30" `
    -Jduration="600" `
    -Jloop_duration="250" `
    -Jhost="host.docker.internal" `
    -Jport="8887"