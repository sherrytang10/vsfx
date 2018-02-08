require('babel-core/register')({
    "presets": ["env"],
    "plugins": [
        "transform-decorators-legacy"
    ]
})
require('./bin/app');
// require('./test/app');