/*
Second project made during a series of lectures
focussed on learning JavaScript.

Application name : Budgety
Purpose : A simple budget management application 
JavaScript coded by : Sultan Sidhu
Created by learning from a Udemy Course by Jonas Schmedtmann
*/

// BUDGET CONTROLLER
var budgetController = (function(){
    // code
});


// UI CONTROLLER
var UIController = (function(){
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description', 
        inputValue: '.add__value', 
        inputButton: '.add__btn'
    };
    
    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        }, 
        getDomStrings: function(){
            return DOMStrings;
        }
    };
    
    
});



// GLOBAL APP CONTROLLER
var Controller = (function(budgetController, UICtrl){
    
    var setupEventListeners = function(){
        
        var DOM = UICtrl().getDomStrings();
        
        document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem); // adds item if button is clicked
    
        document.addEventListener("keypress", function(event){ // adds item if enter key is pressed
            if (event.keyCode === 13 || event.which === 13){
                console.log("Enter was pressed!");
                ctrlAddItem();
        }
        
    });
                                
        
    var ctrlAddItem = function(){
        // get field item data
        var input = UICtrl.getInput();
        console.log(input);
        
        // add data to the budget controller
        
        
        // add data to the ui controller
        
        // calculate the budget
        
        // display the budget on the ui
        
    }
        };
    
    return {
        init: function(){
        console.log('The application has started.');
        setupEventListeners();
        }
    
    };
    
})(budgetController, UIController);


Controller.init();