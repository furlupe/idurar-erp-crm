New-Item -ItemType Directory -Path "last-run" -Force | Out-Null

docker run `
    --rm `
    --name "jmeter-test" `
    -v "./:/host" `
    --network "host" `
    jmeter-test `
    -n `
    -t "/host/send-invoice.jmx" `
    -l "/host/last-run/results" `
    -e `
    -o "/host/last-run/report" `
    -Jthreads_num="100" `
    -Jramp_up_seconds="10" `
    -Jloops="50" `
    -Jduration="800" `
    -Jhost="host.docker.internal" `
    -Jport="8887"