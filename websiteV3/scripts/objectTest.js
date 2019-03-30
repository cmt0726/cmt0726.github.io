define(["fuzzball"], function(fuzzball) {
    fuzz = require('fuzzball');    
    const PizzaParse = {
        pizzaArr: function(input) {
            fetch('http://127.0.0.1:5500/data.json')
            .then(function(response){
                return response.json();
            })
            .then(function(myJson){                
                let matches = [];
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
                return matches;
            }
            )
        }
    }

    const locFinder = {

        zip: function() {
            let input = document.getElementById("zaddress").value;
            exportZip: function(input){
            
                let Json = JSON.stringify(input);
                return localStorage.setItem("locFinder", Json);
            }
        
    }

    }

    document.getElementById("button2").addEventListener("click", locFinder.zip());

});