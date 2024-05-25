let total = 0;
let state = 0; 
let previousOperator;

const counting = document.querySelector('.countings');

function buttonClicked(value){
    if(isNaN(value)){
        symbols(value);
    }else{
        numbers(value);
    }
    counting.innerText = state;
}

function symbols(symbol){
    switch(symbol){
        case 'AC' :
            state = '0';
            total = 0;
            break;
        
        case '=':
            if(previousOperator === null){
                return
            }
            doOperation(parseInt(state));
            previousOperator =  null;
            state = total;
            total = 0;
            break;
        
        case '←':
            if(state.length === 1){
                state = '0';
            }else{
                state = state.substring(0, state.length - 1);
            }
            break;

        case '+':   
        case '×':
        case '−':
        case '÷':
            doMath(symbol);
            break;
    }
}

function doMath(symbol){
    if(state === '0'){
        return;
    }

    const intState = parseInt(state);

    if(total === 0){
        total = intState;
    }else{
        doOperation(intState);
    }
    previousOperator = symbol;
    state = '0';
}

function doOperation(intState){
    if(previousOperator === '+'){
        total += intState;
    }else if(previousOperator === '−'){
        total -= intState;
    }else if(previousOperator === '×'){
        total *= intState;
    }else if(previousOperator === '÷'){
        total /= intState;
    }
}

function numbers(numberString){
    if(state === '0'){
        state = numberString;
    }else{
        state += numberString;
    }
}

function calculate(){
    document.querySelector('.buttons').addEventListener('click', function(event){
        buttonClicked(event.target.innerText);
    });
}

calculate();