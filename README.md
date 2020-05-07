# Node Red Contrib Easing

A node that animates a value between a start and end value using an easing function. Outputs values over time or an array.

## Installation

### In Node-RED
* Via Manage Palette -> Search for *node-red-contrib-easing*

### In a shell
* go to the Node-RED installation folder, in OS X it's usually: `~/.node-red`
* run `npm install node-red-contrib-easing`

## Usage


### Node Configuration

### Input


### Output


### Further information
Check Node-REDs info panel to see more information on how to use the easing node.


## Examples


### Example Flow

![](assets/flow.png)


```json
[{"id":"80f5ed1.a1e731","type":"easing","z":"875d4c17.95deb","name":"","easingType":"linear","duration":1000,"interval":50,"x":770,"y":340,"wires":[["4efd24e4.f8e30c"]]},{"id":"455d1386.fddebc","type":"inject","z":"875d4c17.95deb","name":"no payload","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":570,"y":240,"wires":[["80f5ed1.a1e731"]]},{"id":"3aa76239.fa47ee","type":"inject","z":"875d4c17.95deb","name":"{\"from\":10,\"to\":20,\"duration\":1000}","topic":"","payload":"{\"from\":10,\"to\":20,\"duration\":1000}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":490,"y":340,"wires":[["80f5ed1.a1e731"]]},{"id":"a510aa50.7efea8","type":"inject","z":"875d4c17.95deb","name":"","topic":"5.0","payload":"","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":590,"y":440,"wires":[["80f5ed1.a1e731"]]},{"id":"ff180091.9f123","type":"inject","z":"875d4c17.95deb","name":"","topic":"1.0","payload":"","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":590,"y":480,"wires":[["80f5ed1.a1e731"]]},{"id":"5e89b174.fc32f","type":"comment","z":"875d4c17.95deb","name":"no payload will ramp the value between 0.0 and 1.0","info":"","x":440,"y":200,"wires":[]},{"id":"681e5b0e.fcf714","type":"comment","z":"875d4c17.95deb","name":"specifing a json payload will ramp between the two specified values","info":"","x":390,"y":300,"wires":[]},{"id":"20d90e2a.b623a2","type":"comment","z":"875d4c17.95deb","name":"specifing a number as payload, will ramp to the value from the last value","info":"","x":380,"y":400,"wires":[]},{"id":"4efd24e4.f8e30c","type":"debug","z":"875d4c17.95deb","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":960,"y":340,"wires":[]}]
```  

