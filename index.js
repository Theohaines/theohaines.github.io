//Sub menus
const tradeinMenu = document.getElementById("tradeinMenu");
const cashbackMenu = document.getElementById("cashbackMenu");
const ccvMenu = document.getElementById("ccvMenu");
const advancedBreakdownMenu = document.getElementById("advancedBreakdownMenu");

//Select menus
const tradeinSelected = document.getElementById("tradeinSelected");
const cashbackType = document.getElementById("cashbackType");
const ccvUsed = document.getElementById("CCVUsed");
const advancedBreakdownSelection = document.getElementById("advancedBreakdownSelection");

//Menus
const breakdownScreen = document.getElementById("breakdown-screen");

//Inputs
const simFCost = document.getElementById("simFCost");
const contractMonthlyCost = document.getElementById("contractMonthlyCost");
const contractUpfrontCost = document.getElementById("contractUpfrontCost");

const tradeinAmount = document.getElementById("tradeinAmount");
const cashbackAmount = document.getElementById("cashbackAmount");
const ccvAmount = document.getElementById("ccvAmount");
const simoAmount = document.getElementById("simoAmount");

//Outputs
const youSaveText = document.getElementById("youSaveText");
const costOfContractTotalAfterText = document.getElementById("costOfContractTotalAfterText");
const costOfContractTotalText = document.getElementById("costOfContractTotalText");
const costOfHandsetInContractText = document.getElementById("costOfHandsetInContractText");

function hideAllMenus(){
    tradeinMenu.style.display = "none";
    cashbackMenu.style.display = "none";
    ccvMenu.style.display = "none";
    advancedBreakdownMenu.style.display = "none";
}

function tradeinMenuChecker(){
    if (tradeinSelected.options[tradeinSelected.selectedIndex].value == "none"){
        tradeinMenu.style.display = "none";
    } else if (tradeinSelected.options[tradeinSelected.selectedIndex].value == "tradein") {
        tradeinMenu.style.display = "flex";
    } else {
        tradeinMenu.style.display == "none";
    }

    //console.log(tradeinSelected.options[tradeinSelected.selectedIndex].value)
}

function cashbackMenuChecker(){
    if (cashbackType.options[cashbackType.selectedIndex].value == "none" || cashbackType.options[cashbackType.selectedIndex].value == "giftcard"){
        cashbackMenu.style.display = "none";
    } else if (cashbackType.options[cashbackType.selectedIndex].value == "bacs") {
        cashbackMenu.style.display = "flex";
    } else {
        cashbackMenu.style.display == "none";
    }

    //console.log(cashbackType.options[cashbackType.selectedIndex].value)
}

function ccvMenuChecker(){
    if (ccvUsed.options[ccvUsed.selectedIndex].value == "no"){
        ccvMenu.style.display = "none";
    } else if (ccvUsed.options[ccvUsed.selectedIndex].value == "yes") {
        ccvMenu.style.display = "flex";
    } else {
        ccvMenu.style.display == "none";
    }

    //console.log(ccvUsed.options[tradeinSelected.selectedIndex].value)
}

function advancedBreakdownMenuChecker(){
    if (advancedBreakdownSelection.options[advancedBreakdownSelection.selectedIndex].value == "no"){
        advancedBreakdownMenu.style.display = "none";
    } else if (advancedBreakdownSelection.options[advancedBreakdownSelection.selectedIndex].value == "yes") {
        advancedBreakdownMenu.style.display = "flex";
    } else {
        advancedBreakdownMenu.style.display == "none";
    }

    //console.log(advancedBreakdownSelection.options[advancedBreakdownSelection.selectedIndex].value)
}

async function calculateContract(){
    let validated = await validateRequiredFields();

    if (!validated){
        alert("ERR: Not all fields are filled out!");
    }

    //Standard calculations
    var contractCostOver24M = (contractMonthlyCost.valueAsNumber * 24) + contractUpfrontCost.valueAsNumber;
    var contractCostOver24MIncTradeinAmount = (contractCostOver24M - tradeinAmount.value);
    var contractCostOver24MIncCashbackAmount = (contractCostOver24MIncTradeinAmount - cashbackAmount.value);
    var contractCostOver24MFull = (contractCostOver24MIncCashbackAmount - ccvAmount.value);

    var youSaveAmount = simFCost.valueAsNumber - contractCostOver24MFull;

    console.log(parseFloat(youSaveAmount))

    //Advanced calculations
    var costOfHandsetInContract = simoAmount.value - contractMonthlyCost.value; 

    //Display cool maths stuff
    youSaveText.textContent = "YOU SAVE: £" + Math.round(youSaveAmount * 100) / 100;    
    costOfContractTotalText.textContent = "Total cost of contract (before reductions): £" + Math.round(contractCostOver24M * 100) / 100;
    costOfContractTotalAfterText.textContent = "Total cost of contract (after reductions): £" + Math.round(contractCostOver24MFull * 100) / 100;
    costOfHandsetInContractText.textContent = ("Cost of handset in contract: £" + Math.round(costOfHandsetInContract * 100) / 100).replace("-", "");
}

async function validateRequiredFields(){
    if (simFCost <= 0 || contractMonthlyCost <= 0 || contractUpfrontCost < 0){
        return false;
    }

    if(tradeinSelected.options[tradeinSelected.selectedIndex].value == "tradein" && tradeinAmount.value <= 0){
        return false;
    }

    if(cashbackType.options[cashbackType.selectedIndex].value == "bacs" && cashbackAmount.value <= 0){
        return false;
    }

    if(ccvUsed.options[ccvUsed.selectedIndex].value == "yes" && ccvAmount.value <= 0){
        return false;
    }

    if(advancedBreakdownSelection.options[advancedBreakdownSelection.selectedIndex].value == "yes" && simoAmount.value <= 0){
        return false;
    }

    return true;
}

function init(){
    hideAllMenus();
}

init()