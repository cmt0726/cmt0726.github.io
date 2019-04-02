define(["fuzzball"], function(fuzzball) {
    fuzz = require('fuzzball');
    function getPizzaMatches() {
    
    fetch('http://127.0.0.1:5500/websiteV3/data.json')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            
            let matches = [];
            let input = document.getElementById("faddress").value;
            Object.values(myJson).forEach(element => {               
                for(let i = 0; i < element.length; i++) {
                    let split = element[i].split(' ');
                    for(let j=0; j < split.length; j++) {
                        if(fuzz.ratio(input, split[j]) >= 95) {
                            matches.push(element[i])
                        }
                    }
                }  
            });

            myJsonArray = Object.values(myJson);
            //TODO: verify pizza
            function pizzaFilter(pizzaArray, filterParam) {
                return pizzaArray.filter(item => item.includes(filterParam));
            }

            let prices = (myJson);

            function createPizza(i) {
                //sets the element based off the JSON file
                let pizza = prices['Items'][i] + ' ' + 
                            prices['Prices'][i];
                return pizza
            }

            function makeImage(url, width, height, id) {
                let image = document.createElement("IMG");
                    image.setAttribute("src", url);
                    image.setAttribute("width", width);
                    image.setAttribute("height", height);
                    document.getElementById(id).appendChild(image);
            }

            function createElem(id, array, element, url) {
                //create container for Pizza Elements
                let rDiv = document.createElement("div");
                rDiv.id = "rBox"
                //appends this container to sidebar_r
                document.getElementById(id).appendChild(rDiv);
                //resets the elements to nothing
                document.getElementById("rBox").innerText = '';
                //sets the page height
                let height = 1000; 
                document.getElementById("main_content").style.height = `${ height }px`;

                for(let i = 0, j=100; i < array.length; i++, j+=200) {
                    //creates the pizza image
                    makeImage(url, "100", "100", 'rBox');
                    let line = document.createElement("hr");
                    document.getElementById("rBox").appendChild(line);
                    //initializes the element   
                    let item = document.createElement(element);
                    //calls createPizza() to edit innerText
                    item.innerText = createPizza(array[i]);

                    var result = document.getElementById("rBox").appendChild(item);
                    //adds new line
                    let lineBreak = document.createElement("br");
                    document.getElementById("rBox").appendChild(lineBreak);
                    //adds extra height for each element
                    document.getElementById("main_content").style.height = `${ height + j }px`;
                    hasItems = true;
                }
                return result;
            };

            function arrayIndex(array, json) {
                let index = [];
                for(let i = 0; i < array.length; i++) {
                    if(json.indexOf(array[i]) > -1) {
                        index.push(json.indexOf(array[i]));
                    }
                }
                return index;
            }

            if(matches.length > 0) {
                var matchedIndex = (arrayIndex(pizzaFilter(matches, "Large"), myJsonArray[0]))
                createElem("sidebar_r", matchedIndex, "P", "pizza_PNG44086.png");
            } else {
                document.getElementById("sidebar_r").innerText = ''; 
                console.log("No Matches!");
            };
        });
        
};
document.getElementById("button1").addEventListener("click", getPizzaMatches);


});  
