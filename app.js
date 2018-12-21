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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
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
    },
        budget: 0,
        percentage: -1
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

        calculateBudget: function(){
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc  -  data.totals.exp;
            data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
        },

        getBudget: function(){
            return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
            };
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
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        budgetIncomeVal: '.budget__income--value',
        budgetExpVal: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage'
    };

    return {
        getInput: function(){
            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            var html, element;
            // creating placeholders
            if (type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }



            // replacing placeholder data with actual data
            newHTML = html.replace("%id%", obj.id);
            newHTML = newHTML.replace("%description%", obj.description);
            newHTML = newHTML.replace("%value%", obj.value);


            // updating the UI with the replaced data
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ", " + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            })
        },

        displayBudget: function(obj){
          document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
          document.querySelector(DOMStrings.budgetIncomeVal).textContent = obj.totalInc;
          document.querySelector(DOMStrings.budgetExpVal).textContent = obj.totalExp;
          if (obj.percentage > 0){
            document.querySelector(DOMStrings.percentage).textContent = obj.percentage + "%";
          } else {
            document.querySelector(DOMStrings.percentage).textContent = "---";
          }
        },

        getDomStrings: function(){
            return DOMStrings;
        }
    };


});



// GLOBAL APP CONTROLLER
var Controller = (function(budgetController, UICtrl){

    var setupEventListeners = function(){

        var DOM = UICtrl.getDomStrings();

        //document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem); // adds item if button is clicked
        document.querySelector(DOM.inputButton).addEventListener('click', function(){
            var input = UICtrl.getInput();
            console.log(input);
            console.log("THE BUTTON PRESSING WORKS");
            var newItem = budgetController.addItem(input.type, input.description, input.value);
        });

        document.addEventListener("keypress", function(event){ // adds item if enter key is pressed
            if (event.keyCode === 13 || event.which === 13){
                console.log("Enter was pressed!");
                ctrlAddItem();
        }

    });

    var updateBudget = function(){
        // calculate the budget
        budgetController.calculateBudget();
        // return the budget
        var budget = budgetController.getBudget();
        // display it on the UI
        UICtrl.displayBudget(budget);
    }


    var ctrlAddItem = function(){
        // get field item data
        var input = UICtrl.getInput();
        console.log(input);

        // add data to the budget controller
        var newItem = budgetController.addItem(input.type, input.description, input.value);
        if (input.description!=="" && !isNaN(input.value)){

            // add data to the ui controller

            UICtrl.addListItem(newItem, input.type);

        } else {
            console.log("fill out all info pls.")
        }


        // clear the fields
        UICtrl.clearFields();

        // calculate and update budget
        updateBudget();

    }
        };

    return {
        init: function(){
        console.log('The application has started.');
        UICtrl.displayBudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1 
        })
        setupEventListeners();
        }

    };

})(budgetController(), UIController());


Controller.init();
