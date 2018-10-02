function checkCashRegister(price, cash, cid) {
    //this is our object to return
    let objectToReturn = {};

    let values = {//in cents for easy calculations
      'PENNY': 1,
      'NICKEL': 5,
      'DIME': 10,
      'QUARTER': 25,
      'ONE': 100,
      'FIVE': 500,
      'TEN': 1000,
      'TWENTY': 2000,
      'ONE HUNDRED' : 10000
    }
    //we gonna need that object to refference values

    cash = cash * 100;
    price = price * 100;
 
    let change = cash - price,
        changeLeft = change;

    let cashInRegister = (cid) => {
        var total = 0;
        for (var i = 0; i < cid.length; i++) {
            total += cid[i][1] * 100;
        }
        return total;
    }
 
    let changeToReturn =[];

    // Handle exact change
    if (cashInRegister(cid) === change) {
      objectToReturn['status'] = 'CLOSED';
      objectToReturn['change'] = cid;
      return objectToReturn;
    }else if(cashInRegister(cid) < change) {// Handle obvious insufficient funds
      objectToReturn['status'] = 'INSUFFICIENT_FUNDS';
      objectToReturn['change'] = [];
      return objectToReturn;
    }

 
    //next we are going to be building what we should return;
    for (var i = cid.length - 1; i >= 0; i--) {
        var coinName = cid[i][0],
            coinTotal = cid[i][1] * 100,
            coinValue = values[coinName],
            coinAmount = coinTotal / coinValue,
            toReturn = 0;
 
        while (changeLeft >= coinValue && coinAmount > 0) {
            changeLeft -= coinValue;            
            coinAmount--;
            toReturn++;
        }
 
        if (toReturn > 0) {
            changeToReturn.push([coinName, toReturn * (coinValue / 100)]);
        }
    }
 
    // We make use of the getTotalCid method that we created earlier to see how much money we are actually returning.
    // If it's not equal to the original change, it means that we can't return that exact amount with the current cash-in-register.
    if (cashInRegister(changeToReturn) != change) {
        objectToReturn['status'] = 'INSUFFICIENT_FUNDS';
        objectToReturn['change'] = [];
        return objectToReturn;// Return early.
    }

    objectToReturn['status'] = 'OPEN';
    objectToReturn['change'] = changeToReturn;

    console.log(objectToReturn);

    return objectToReturn;  // and this is the object we should return!
}

//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])// should return {status: "INSUFFICIENT_FUNDS", change: []}.

//checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);// should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);// should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);// should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.