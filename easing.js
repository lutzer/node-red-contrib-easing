const _ = require('lodash');

EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity 
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity 
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration 
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity 
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity 
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration 
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

function stopInterval(interval) {
    if (interval != null)
        clearInterval(interval)
    interval = null;
}

module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        // validate settings
        if (config.interval <= 0 || config.duration <= 0) {
            node.error("duration and interval need to be bigger than 0.");
            return;
        }

        if (config.numberOfValues <= 0) {
            node.error("array size must be bigger than 0");
            return;
        }

        config.interval = _.toNumber(config.interval);
        config.duration = _.toNumber(config.duration);
        config.numberOfValues = _.toNumber(config.numberOfValues);

        // holds interval
        var interval = null;

        var lastValue = 0;

        node.on('input', function(msg) {

            var startValue, endValue;

            // if payload is a number, use that as endValue 
            if (_.isNumber(msg.payload)) {
                startValue = lastValue;
                endValue = msg.payload;
            // else check if payload has to and from values
            } else if (_.isObject(msg.payload)) {
                startValue = _.has(msg.payload,'from') ? msg.payload.from : lastValue;
                endValue = _.has(msg.payload,'to') ? msg.payload.to : 1.0;
            } else {
                startValue = 0.0;
                endValue = 1.0
            }

            if (config.outputType === "asArray") {

                let size = _.has(msg.payload, 'size') ? msg.payload.size : config.numberOfValues;

                let values = _.map(_.range(0,1.0, 1.0/size), (t) => {
                    return startValue + EasingFunctions[config.easingType](t) * (endValue - startValue);
                });
                values.push(endValue);

                lastValue = endValue;

                msg.payload = values;
                node.send(msg);

            } else if (config.outputType === "overTime") {

                let duration = _.has(msg.payload, 'duration') ? msg.payload.duration : config.duration;
                let elapsed = 0;

                // clear previous interval
                stopInterval(interval);

                //send start value
                msg.payload = startValue
                node.send(msg);

                // start interval
                interval = setInterval( () => {
                    elapsed += config.interval;

                    let t = Math.min(1.0, elapsed / duration) 
                    let val = startValue + EasingFunctions[config.easingType](t) * (endValue - startValue);

                    lastValue = val;

                    msg.payload = val
                    node.send(msg);

                    if (t >= 1.0) {
                        stopInterval(interval);
                    }
                }, config.interval)
            }
            
        });

        node.on('close', () => {
            stopInterval(interval);
        })
    }
    RED.nodes.registerType("easing",LowerCaseNode);
}