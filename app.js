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
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;
    
    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals:{
        exp: 0,
        inc: 0
    }
}
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            //creating a new ID
            console.log("THE LENGTH BEFORE ADDING ANYTHING IS " + data.allItems[type].length);
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1]+1;
            } else {
                 ID = 0;
            }
           
            //checking if the new addition is an expense or an income 
            console.log('TYPE GIVEN IN IS' + type);
            if (type==="exp"){
                newItem = new Expense(ID, des, val);
            } else if (type==="inc"){
                newItem = new Income(ID, des, val);
            }
            
            //pushing it onto the data structure
            console.log("THE NEW ITEM BEING ADDED IS :");
            console.log(newItem);
            data.allItems[type].push(newItem);
            console.log('NOW THE LENGTH OF THE LIST IS ' + data.allItems[type].length);
            return newItem
        }, 
        testing : function(){
        console.log(data)
    }
        
    }
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
        var input = UICtrl().getInput();
        console.log(input);
        
        // add data to the budget controller
        var newItem = budgetController().addItem(input.type, input.description, input.value);
        
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