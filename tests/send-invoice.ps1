New-Item -ItemType Directory -Path "last-run" -Force | Out-Null

docker run `
    -v "./:/host" `
    --network "host" `
    jmeter-test `
    -n `
    -t "/host/send-invoice.jmx" `
    -l "/host/last-run/results" `
    -e `
    -o "/host/last-run/report" `
    -Jthreads_num="10" `
    -Jramp_up_seconds="10" `
    -Jloops="10" `
    -Jhost="host.docker.internal" `
    -Jport="8887"