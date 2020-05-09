# Node Red Contrib Easing

A node that ramps up a value from a start to an end value using an easing function. Outputs values over time or an array.
Typical use cases for this are smoothing value changes over time to avoid too large steps.
![node-appearance](assets/node-appearance.png)  
**Fig. 1:** Node appearance

<a name="installation"></a>
## Installation

<a name="installation_in_node-red"></a>
### In Node-RED
* Via Manage Palette -> Search for *node-red-contrib-easing*

<a name="installation_in_a_shell"></a>
### In a shell
* go to the Node-RED installation folder, in OS X it's usually: `~/.node-red`
* run `npm install node-red-contrib-easing`

<a name="usage"></a>
## Usage

<a name="node_conifguration"></a>
### Node Configuration

![node-settings](assets/node-settings.png)  
**Fig. 2:** Node properties

#### Easing function
The transition from the start to the end value follows a functional behaviour. These transiton functions are divided into three categories depending on the easing function name:
* easeIn...: These are functions where the starting section is very smooth and the ending section contains a sharp bend.
* easeOut...: These are functions where the starting section contains a sharp bend and the ending section is very smooth.
* easeInOut...: These are functions where starting and ending sections are quite smooth.

The behaviour of these three categories is shown by the means of the sine function in Figure xxx
![easingInOut](assets/easingInOut.png)  
**Fig. 3:** Easing function categories (In, Out, InOut)


Several easing funtions are selectable in the node configuration. These are:
* linear
* 2nd order / parabolic (easeIn, easeOut, easeInOut)
* 3rd order / cubic (easeInCubic, easeOutCubic, easeInOutCubic)
* 4th order (easeInQuart, easeOutQuart, easeInOutQuart)
* 5th order (easeInQuint, easeOutQuint, easeInOutQuint)
* sinusodial (easeInSine, easeOutSine, easeInOutSine)
* exponential (easeInExpo, , easeOutExpo, easeInOutExpo)
* bouncing (bounceIn, bounceOut, bounceInOut)

The curves of these functions are shown below. See chapter "Transition curves of the easing functions" for details.


<a name="input"></a>
### Input


payload number

If the payload is a number, the node will ramp from its last value to this number using the specified easing function.
If the payload contains a json object in the format: { "from" : 1, "to" : 10, "duration": 200 }, it will ramp between these two values.
If the payload contains a json object in the format: { "from" : 1, "to" : 10, "size": 10 }, it will ramp between these two values, giving an array of 10 values
        In any other case, the function will ramp from 0.0 to 1.0.




<a name="output"></a>
### Output

#### Output - Values over time vs. array data


#### Output - Values over time
Duration: Sets duration of the easing function. 
Interval: Sets interval in which values are emitted. 
(in ms)
xxx Erläuterung: Interval: Stufigkeit, Duration/Interval: Stufenanzahl


#### Output - Array
Size: Selects number of elements if output is set to array. 



<a name="further_information"></a>
### Further information
Check Node-REDs info panel to see more information on how to use the easing node.

<a name="examples"></a>
## Examples

xxx Beispiele mit 


<a name="example_flow"></a>
### Example Flow

xxx no payload -> "no payload"

![](assets/flow.png)  
**Fig. xxx:** Example flow

```json
[{"id":"80f5ed1.a1e731","type":"easing","z":"875d4c17.95deb","name":"","easingType":"linear","duration":1000,"interval":50,"x":770,"y":340,"wires":[["4efd24e4.f8e30c"]]},{"id":"455d1386.fddebc","type":"inject","z":"875d4c17.95deb","name":"no payload","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":570,"y":240,"wires":[["80f5ed1.a1e731"]]},{"id":"3aa76239.fa47ee","type":"inject","z":"875d4c17.95deb","name":"{\"from\":10,\"to\":20,\"duration\":1000}","topic":"","payload":"{\"from\":10,\"to\":20,\"duration\":1000}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":490,"y":340,"wires":[["80f5ed1.a1e731"]]},{"id":"a510aa50.7efea8","type":"inject","z":"875d4c17.95deb","name":"","topic":"5.0","payload":"","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":590,"y":440,"wires":[["80f5ed1.a1e731"]]},{"id":"ff180091.9f123","type":"inject","z":"875d4c17.95deb","name":"","topic":"1.0","payload":"","payloadType":"num","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":590,"y":480,"wires":[["80f5ed1.a1e731"]]},{"id":"5e89b174.fc32f","type":"comment","z":"875d4c17.95deb","name":"no payload will ramp the value between 0.0 and 1.0","info":"","x":440,"y":200,"wires":[]},{"id":"681e5b0e.fcf714","type":"comment","z":"875d4c17.95deb","name":"specifing a json payload will ramp between the two specified values","info":"","x":390,"y":300,"wires":[]},{"id":"20d90e2a.b623a2","type":"comment","z":"875d4c17.95deb","name":"specifing a number as payload, will ramp to the value from the last value","info":"","x":380,"y":400,"wires":[]},{"id":"4efd24e4.f8e30c","type":"debug","z":"875d4c17.95deb","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":960,"y":340,"wires":[]}]
```  

<a name="transition_curves"></a>
## Transition curves of the easing functions

![FunctionsPolynomial](assets/functionsPolynomial.png)  
**Fig. xxx:** Polynomial easing functions

![FunctionsSinoideExponential](assets/functionsSinoideExponential.png)  
**Fig. xxx:** Sinoide and exponential easing functions

![FunctionsBouncing](assets/functionsBouncing.png)  
**Fig. xxx:** Sinoide and exponential easing functions

