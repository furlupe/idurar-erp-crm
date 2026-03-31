class Logger {
    constructor(impl = console.log, time = () => new Date()) {
        this._impl = impl;
        this._time = time;
    }

    info(msg) {
        this.log("INFO", msg)
    }

    warn(msg) {
        this.log("WARN", msg)
    }

    log(level, msg) {
        this._impl({
            msg,
            "@timestamp": this._time(),
            level
        })
    }
}

exports.logger = new Logger();