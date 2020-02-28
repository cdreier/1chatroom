require('jest-styled-components')
require('@testing-library/jest-dom/extend-expect')

var IntlPolyfill    = require('intl');
Intl.NumberFormat   = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
