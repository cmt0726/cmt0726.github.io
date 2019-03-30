
    fetch('http://127.0.0.1:5500/data.json')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            let item = 76;

            let prices = (myJson)
            //Generates the Pizza elements with it's name and price    
            function createPizza(i) {
                //sets the element based off the JSON file
                let pizza = prices['Items'][item + i] + ' ' + 
                            prices['Prices'][item + i];
                return pizza
            }
            //a General image function
            function makeImage(url, width, height, id) {
                let image = document.createElement("IMG");
                    image.setAttribute("src", url);
                    image.setAttribute("width", width);
                    image.setAttribute("height", height);
                    document.getElementById(id).appendChild(image);
            }
            //a General element production function
            function createElem(id, times, element) {           
            //TODO: fix ascii characters
            //TODO: maybe make this it's own function? 
            for(let i = 0; i < times; i++) {
                    makeImage("pizza_PNG44086.png", "100", "100", id);
                    //initializes the element   
                    let item = document.createElement(element);
                    //calls createPizza() to edit innerText
                    item.innerText = createPizza(i);
                    var result = document.getElementById(id).appendChild(item);
                    //Adds a new line so page flows better
                    //probably garbage who knows lol
                    let lineBreak = document.createElement("br");
                    document.getElementById(id).appendChild(lineBreak);
                }
                return result;
            };
            getZipMatches();
            //createElem("sidebar_r", 5, "P");
    });
    