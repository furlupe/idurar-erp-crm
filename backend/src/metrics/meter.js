const prometheus = require('prom-client');

class InvoiceMeter {
    constructor() {
        this._counter = new prometheus.Counter({
            name: 'invoice_email_sent',
            help: 'Invoice email sent',
            labelNames: ['status']
        });
    }

    trackInvoiceSuccess() {
        this._counter.inc({ status: 'success' });
    }

    trackInvoiceFailure() {
        this._counter.inc({ status: 'failure' });
    }
}

exports.meter = new InvoiceMeter();