## Building the image

```bash
docker build -t $IMAGE_NAME .
# e.g. docker build -t jmeter-test .
```

## Running the tests

Use the following command to run a test plan when checked out to its containing directory.

```bash
docker run \
    -v "./:/host" \
    --network "$NETWORK" \
    $IMAGE_NAME \
    -n \
    -e \
    -t "/host/$TEST_PLAN.jmx" \
    -l "/host/$RESULTS_OUTPUT_FILE" \
    -o "/host/$REPORT_OUTPUT_DIRECTORY"
```

### Parameters

To configure the test run one can supply defined parameters using `-J` argument like:

```bash
-J$ARGUMENT_NAME=$ARGUMENT_VALUE
# e.g. -Jthreads_num=1
```

### Examples

#### Docker Desktop + Powershell

This example will run the `send-invoice` test plan. It will send one request per second for ten seconds and place test run results in a `last-run` directory within currently checked out.

```bash
mkdir -Force last-run \
&& docker run \
    -v "./:/host" \
    --network "host" \
    jmeter-test \
    -n \
    -t "/host/send-invoice.jmx" \
    -l "/host/last-run/results" \
    -e \
    -o "/host/last-run/report" \
    -Jthreads_num="10" \
    -Jramp_up_seconds="10" \
    -Jloops="1" \
    -Jhost="host.docker.internal" \
    -Jport="8887"
```

These commands can also be made into scripts for convenience (e.g. `send-invoice.ps1`).
