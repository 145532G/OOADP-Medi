const moment = require('moment');
module.exports = {
    formatDate: function (date, targetFormat) {
        return moment(date).format(targetFormat);
    },
    radioCheck: function (value, radioValue) {
        if (value == radioValue) {
            return 'checked';
        } else {
            return '';
        }
    },
    ifEquals: function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    },
    ifNotEquals: function (a, b, options) {
        if (a != b) { return options.fn(this); }
        else {
            return options.inverse(this);
        }
    }
}