const _ = require('lodash');

EasingFunctions = {
    linear: function (t) { return t },
    
    easeInQuad: function (t) { return t*t },
    easeOutQuad: function (t) { return t*(2-t) },
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

    easeInCubic: function (t) { return t*t*t },
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

    easeInQuart: function (t) { return t*t*t*t },
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

    easeInQuint: function (t) { return t*t*t*t*t },
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

    easeInSine: function (t) { return Math.cos(t * (Math.PI/2)); },
	easeOutSine: function (t) { return Math.sin(t * (Math.PI/2)); },
    easeInOutSine: function (t) { return Math.cos(Math.PI*t) - 1; },
    
    easeInExpo: function (t) { return (t==0) ? 0 : Math.pow(2, 10 * (t - 1)); },
	easeOutExpo: function (t) { return (t==1.0) ? 1.0 : (-Math.pow(2, -10 * t) + 1); },
	easeInOutExpo: function (t) {
		if (t==0) return 0;
		if (t==1.0) return 1.0;
        if ((t/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
        else return 1/2 * (-Math.pow(2, -10 * --t) + 2);
	},
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