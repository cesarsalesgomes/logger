# LOGGER

Custom logger that defines custom path and levels 

### Installing

npm install

### Example

const logger = require('./logger')('events', ['event1', 'event2']);

logger.event1('Just info');
logger.event2('Just info');