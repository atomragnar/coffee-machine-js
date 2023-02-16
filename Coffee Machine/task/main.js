// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')


const waterFillPrompt = 'Write how many ml of water you want to add: '
const milkFillPrompt = 'Write how many ml of milk you want to add: '
const beansFillPrompt = 'Write how many grams of coffee beans you want to add: '
const cupsFillPrompt = 'Write how many disposable cups you want to add: '

const products = [
    {name: 'espresso',properties:{water: 250, milk: 0, coffeeBeans: 16, price: 4}},
    {name: 'latte', properties:{ water: 350, milk: 75, coffeeBeans: 20, price: 7}},
    {name: 'cappuccino', properties:{water: 200, milk: 100, coffeeBeans: 12, price: 6}}
];


let coffeeMachine = {
    water: 400,
    milk: 540,
    coffeeBeans: 120,
    disposableCups: 9,
    money: 550
}

function printCoffeeMachine() {
    console.log(`The coffee machine has:`)
    console.log(`${coffeeMachine.water} ml of water`)
    console.log(`${coffeeMachine.milk} ml of milk`)
    console.log(`${coffeeMachine.coffeeBeans} g of coffee beans`)
    console.log(`${coffeeMachine.disposableCups} disposable cups`)
    console.log(`$${coffeeMachine.money} of money`)
}

function chooseAction() {
    const actionPrompt = 'Write action (buy, fill, take, remaining, exit):\n'
    return input(actionPrompt)
}

function take() {
    console.log(`I gave you $${coffeeMachine.money}`)
    coffeeMachine['money'] = 0;
}

function fill() {
    coffeeMachine['water'] = coffeeMachine['water'] + Number(input(waterFillPrompt))
    coffeeMachine['milk'] = coffeeMachine['milk'] + Number( input(milkFillPrompt))
    coffeeMachine['coffeeBeans'] = coffeeMachine['coffeeBeans'] + Number(input(beansFillPrompt))
    coffeeMachine['disposableCups'] = coffeeMachine['disposableCups'] + Number(input(cupsFillPrompt))
}

function checkResources(product) {
    let bool = true
    products.forEach(p => {
        if (p.name === String(product)) {
           if (coffeeMachine.water < p.properties.water) {
               console.log('Sorry, not enough water!')
               bool = false
               return
           }
           if (coffeeMachine.milk < p.properties.milk) {
               console.log('Sorry, not enough milk!')
               bool = false
               return
           }
           if (coffeeMachine.coffeeBeans < p.properties.coffeeBeans) {
               console.log('Sorry, not enough coffee beans!')
               bool = false
               return
           }
           if (coffeeMachine.disposableCups < 1) {
               console.log('Sorry, not enough disposable cups!')
               bool = false
               return
           }
        }
    });
    if (bool) {
        console.log('I have enough resources, making you a coffee!')
        return true
    }
}

function updateCoffeeMachine(product) {
   products.forEach(p => {
       if (p.name === String(product)) {
           coffeeMachine['water'] = coffeeMachine['water'] - p.properties.water;
           coffeeMachine['milk'] = coffeeMachine['milk'] - p.properties.milk;
           coffeeMachine['coffeeBeans'] = coffeeMachine['coffeeBeans'] - p.properties.coffeeBeans;
           coffeeMachine.disposableCups--;
           coffeeMachine['money'] = coffeeMachine['money'] + p.properties.price;
       }
   })
}

function buyOperation(product) {
    if (checkResources(product)) {
        updateCoffeeMachine(product)
    }
}

function buy() {
    let buyPrompt = 'What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino,  back - to main menu:'
    let choice = input(buyPrompt)
    if  (choice === 'back') {
        return
    }
    if (Number(choice) === 1) {
        buyOperation('espresso')
        return;
    }
    if (Number(choice) === 2) {
        buyOperation('latte')
        return;
    }
    if (Number(choice) === 3) {
        buyOperation('cappuccino')
    }
}


let isProgramOn = true;

while (isProgramOn) {
    let action = String(chooseAction())
    switch (action) {
        case 'buy': buy(); break;
        case 'fill': fill(); break;
        case 'take': take(); break;
        case 'remaining': printCoffeeMachine(); break;
        case 'exit': isProgramOn = false; break;
        default: break;
    }
}

