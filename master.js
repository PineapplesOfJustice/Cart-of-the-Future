/*
Remember to use innerHTML instead of innerHMTL

For quantity, use input with id of (subject + option + "quantity") and button with id of (subject + option + "quantityButton");
make sure input field have onblur and onfocus to hide/display button

If I want to make multi-selection, simply use a string like this ("2345"). Then, it can be read char by char in the checkOut.
If string = "", then string = "false", not hard at all. Uasble for government assistance if I want to.

If I want to merge quantity and multi-selection, make a back-up javscript file first. It will be similar to the transformation of adding cartQuantity. It just need to improvised. Essesntially, there will be three blocs. 1)Single selection 2)Yes/No selection 3)Multiple Selection

This page used the idea of being able to select options, like a quiz of-sort. Another alternative will be the adding to cart method, but deleting items will be a bit trickier.
*/

/*
if(!sessionStorage.college){ sessionStorage.setItem("college", false); }
if(!sessionStorage.creditHealth){ sessionStorage.setItem("creditHealth", false); }
if(!sessionStorage.creditAuto){ sessionStorage.setItem("creditAuto", false); }
if(!sessionStorage.familySpouse){ sessionStorage.setItem("familySpouse", false); }
if(!sessionStorage.familyChildren){ sessionStorage.setItem("familyChildren", false); }
if(!sessionStorage.familyPet){ sessionStorage.setItem("familyPet", false); }
if(!sessionStorage.lifestyleHouse){ sessionStorage.setItem("lifestyleHouse", false); }
if(!sessionStorage.lifestyleCar){ sessionStorage.setItem("lifestyleCar", false); }
if(!sessionStorage.career){ sessionStorage.setItem("career", false); }

var options = { college: sessionStorage.options.college,
                creditHealth: sessionStorage.options.creditHealth,
                creditAuto: sessionStorage.options.creditAuto,
                familySpouse: sessionStorage.options.familySpouse,
                familyChildren: sessionStorage.options.familyChildren,
                familyPet: sessionStorage.options.familyPet,
                lifestyleHouse: sessionStorage.options.lifestyleHouse,
                lifestyleCar: sessionStorage.options.lifestyleCar,
                career: sessionStorage.options.career };
*/

/*
The subject and option parameters are determined when the function is called using the HTML code. It is put into a cycle where calling the selectOption will change the onclick into the removeOption next and vice versa. The function store the input into the tab memory and is used to calculate the checkOut.
*/

var priceOptions = ["college",
                    "family_Spouse",
                    "family_Children",
                    "family_Pet",
                    "luxury_Home",
                    "luxury_Automobile",
                    "luxury_Insurance",
                    "budget_Food",
                    "budget_Utility",
                    "budget_Transportation",
                    "retirement",];

if(sessionStorage.college == undefined){
  for(x in priceOptions){
    sessionStorage.setItem(priceOptions[x], "false");  
  }
}

var salaryOptions = ["career",
                     "military",
                     "scholarship",
                     /*"government_Assistance",*/];
 
if(sessionStorage.career == undefined){
  for(x in salaryOptions){
    sessionStorage.setItem(salaryOptions[x], "false");  
  }
}

//var divisionLine = 8;
var subjectValue = "";
var price = 0;
var priceTotal = 0;
var salary = 0;
var salaryTotal = 0;
var donation = 0;
var donationTotal = 0;

//One Option
function selectOption(subject, option){
  subjectValue = sessionStorage.getItem(subject);  
  if(subjectValue != "false"){ 
    //console.log(subject+subjectValue)  
    document.getElementById(subject + subjectValue).setAttribute("class", "col-md-3 notActive");  
    document.getElementById(subject + subjectValue).setAttribute("onclick", "selectOption('"+ subject + "', " +  + subjectValue + ")"); 
  }
  sessionStorage.setItem(subject, option);  
  subjectValue = sessionStorage.getItem(subject); 
  sessionStorage.setItem(subject + "Price", document.getElementById(subject + subjectValue + "price").innerHTML.split('<')[0]);
  sessionStorage.setItem(subject + "Option", document.getElementById(subject + subjectValue + "option").innerHTML);
  document.getElementById(subject + subjectValue).setAttribute("class", "col-md-3 optionActive"); 
  document.getElementById(subject + subjectValue).setAttribute("onclick", "removeOption('"+ subject + "', " + subjectValue + ")"); 
  
  if(document.getElementById(subject + "ButtonInput")){
    document.getElementById(subject + "ButtonInput").value = sessionStorage.getItem(subject + "Price");
    document.getElementById(subject + "Button").click();  
  }
    
  if(subject == "career"){
    document.getElementById("jobSalary").innerHTML = "Salary: " + Number(sessionStorage.getItem(subject + "Price")).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    document.getElementById("planContribution").innerHTML = "Contribution: " + (sessionStorage.getItem(subject + "Price")/10).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }
  if(document.getElementById(subject + option + "quantity")){ 
    sessionStorage.setItem(subject + "Quantity", document.getElementById(subject + option + "quantity").value);  
    if(document.getElementById(subject + option + "price").innerHTML.includes("<")){    
      sessionStorage.setItem(subject + "Price", document.getElementById(subject + option + "price").innerHTML.split('<')[0]);
    }
    else{   
      sessionStorage.setItem(subject + "Price", document.getElementById(subject + option + "price").innerHTML);
    }  
  }
}

function removeOption(subject, option){
  subjectValue = sessionStorage.getItem(subject);  
  document.getElementById(subject + subjectValue).setAttribute("class", "col-md-3 notActive");
  document.getElementById(subject + subjectValue).setAttribute("onclick", "selectOption('"+ subject + "', " + subjectValue + ")");
  sessionStorage.setItem(subject, "false");
  
  if(document.getElementById(subject + "ButtonInput")){
    document.getElementById(subject + "ButtonInput").value = 0;
    document.getElementById(subject + "Button").click();  
  }
  
  //to neutralize yes/no button of scholarship;
  if(subject == "college"){
    document.getElementById("scholarship1option").setAttribute("class", "undecidedButton");
    document.getElementById("scholarship2option").setAttribute("class", "undecidedButton");  
    sessionStorage.setItem("scholarship", false);  
  }  
  else if(subject == "career"){
    sessionStorage.setItem(subject + "Price", 0);  
    document.getElementById("jobSalary").innerHTML = "Salary: " + Number(sessionStorage.getItem(subject + "Price")).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    document.getElementById("planContribution").innerHTML = "Contribution: " + (sessionStorage.getItem(subject + "Price")/10).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }
}

function reSelectOption(subject){
  subjectValue = sessionStorage.getItem(subject); 
  if(subjectValue != "false"){  
  document.getElementById(subject + subjectValue).setAttribute("class", "col-md-3 optionActive"); 
  document.getElementById(subject + subjectValue).setAttribute("onclick", "removeOption('"+ subject + "', " + subjectValue + ")");
  }
    
  if(subject == "career"){
    document.getElementById("jobSalary").innerHTML = "Salary: " + Number(sessionStorage.getItem(subject + "Price")).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    document.getElementById("planContribution").innerHTML = "Contribution: " + (sessionStorage.getItem(subject + "Price")/10).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }
}

//One of Two Options
function yesNoOptions(subject, option){
  if(subject == "scholarship" && sessionStorage.getItem("college") == "false"){}  
  else if(option == 1){  
    document.getElementById(subject + option + "option").setAttribute("class", "yesButton");
    document.getElementById(subject + "2option").setAttribute("class", "undecidedButton");  
    sessionStorage.setItem(subject, option);  
    subjectValue = sessionStorage.getItem(subject);
    sessionStorage.setItem(subject + "Price", document.getElementById(subject + subjectValue + "price").innerHTML.split('<')[0]);
    sessionStorage.setItem(subject + "Option", document.getElementById(subject + subjectValue + "option").innerHTML);
  }
  else if(option == 2){  
    document.getElementById(subject + "1option").setAttribute("class", "undecidedButton");
    document.getElementById(subject + option + "option").setAttribute("class", "noButton");  
    sessionStorage.setItem(subject, option);    
    subjectValue = sessionStorage.getItem(subject);
    sessionStorage.setItem(subject + "Price", document.getElementById(subject + subjectValue + "price").innerHTML.split('<')[0]);
    sessionStorage.setItem(subject + "Option", document.getElementById(subject + subjectValue + "option").innerHTML);
  }
}

function reSelectYesNoOptions(subject){
  var subjectValue = sessionStorage.getItem(subject);  
  if(subjectValue == 1){  
    document.getElementById(subject + "1option").setAttribute("class", "yesButton");
    document.getElementById(subject + "2option").setAttribute("class", "undecidedButton");
  }
  else if(subjectValue == 2){  
    document.getElementById(subject + "1option").setAttribute("class", "undecidedButton");
    document.getElementById(subject + "2option").setAttribute("class", "noButton");  }
}

//Able to Select Multiple Options
function selectMultipleOptions(subject, option){
  subjectValue = sessionStorage.getItem(subject);  
  subjectValue += option;  
  console.log(subjectValue);  
  sessionStorage.setItem(subject, subjectValue);
  sessionStorage.setItem(subject + "Price" + option, document.getElementById(subject + option + "price").innerHTML.split('<')[0]);
  sessionStorage.setItem(subject + "Option" + option, document.getElementById(subject + option + "option").innerHTML);
  document.getElementById(subject + option).setAttribute("class", "col-md-3 optionActive"); 
  document.getElementById(subject + option).setAttribute("onclick", "removeOneOption('" + subject + "', " + option + ")");        
}

function removeOneOption(subject, option){
  subjectValue = sessionStorage.getItem(subject);
  subjectValue = subjectValue.replace(option, "");
  console.log(subjectValue);  
  sessionStorage.setItem(subject, subjectValue);
  document.getElementById(subject + option).setAttribute("class", "col-md-3 notActive");
  document.getElementById(subject + option).setAttribute("onclick", "selectMultipleOptions('" + subject + "', " + option + ")");
}

function reSelectMultipleOptions(subject){
  subjectValue = sessionStorage.getItem(subject);  
  if(subjectValue != "false"){  
    subjectValue = subjectValue.replace("false", "");   
  for(var i=0, length=subjectValue.length; i<length; i++){ 
      document.getElementById(subject + subjectValue.charAt(i)).setAttribute("class", "col-md-3 optionActive"); 
      document.getElementById(subject + subjectValue.charAt(i)).setAttribute("onclick", "removeOneOption('" + subject + "', " + subjectValue.charAt(i) + ")");
    }
  }
}

//use onblur and onfocus event to display/hide function button;
//*Note: Above comment failed.

//Set Cart Quantity (only apply to certain options)
function cartQuantity(subject, option, originalValue){
  var inputValue = Math.abs(Math.floor(Number(document.getElementById(subject + option + "quantity").value)));
  if(inputValue == 0 || inputValue == NaN){
    inputValue = 1;
    document.getElementById(subject + option + "quantity").value = 1;  
  }  
  sessionStorage.setItem(subject + "Quantity", inputValue);
  if(document.getElementById(subject + option + "price").innerHTML.includes("<")){   
    var spanText = document.getElementById(subject + option + "price").innerHTML.split('<')[1];
    var newPrice = originalValue * inputValue;
    document.getElementById(subject + option + "price").innerHTML = "" + newPrice + "<" + spanText;  
    sessionStorage.setItem(subject + "Price", document.getElementById(subject + option + "price").innerHTML.split('<')[0]);
  }
  else{   
    var newPrice = originalValue * inputValue;
    document.getElementById(subject + option + "price").innerHTML = "" + newPrice;  
    sessionStorage.setItem(subject + "Price", document.getElementById(subject + option + "price").innerHTML);
  }  
}

function reLoadCartQuantity(subject){
  if(sessionStorage.getItem(subject + "Quantity") && sessionStorage.getItem(subject) != "false"){
    subjectValue = sessionStorage.getItem(subject); 
    document.getElementById(subject + subjectValue + "quantity").value = "" + sessionStorage.getItem(subject + "Quantity");
    document.getElementById(subject + subjectValue + "price").innerHTML = "" + sessionStorage.getItem(subject + "Price");  
  }
}

//Random function that log the console.
function checkOut(){
  priceTotal = 0;  
  for(x in priceOptions){
    subjectValue = sessionStorage.getItem(priceOptions[x]);  
    if(subjectValue != "false"){
      price = Number(sessionStorage.getItem(priceOptions[x] + "Price"));
      priceTotal += price;  
      console.log(priceOptions[x] + ": $" + price);       
    }  
  }  
  console.log("Price_Total: $" + price);
  salaryTotal = 0;  
  for(x in salaryOptions){
    subjectValue = sessionStorage.getItem(salaryOptions[x]);  
    if(subjectValue != "false"){
      salary = Number(sessionStorage.getItem(salaryOptions[x] + "Price"));
      salaryTotal += salary;  
      console.log(salaryOptions[x] + ": $" + salary);       
    }  
  }  
  console.log("Salary_Total: $" + salary);
}

//Load the price of the CheckOut page.
function loadPage(){
  document.getElementById("nameSpace").innerHTML = "<h2>Article</h2>";
  document.getElementById("optionSpace").innerHTML = "<h2>Selected</h2>";
  document.getElementById("moneySpace").innerHTML = "<h2>Price</h2>";
  document.getElementById("nameSpace2").innerHTML = "";
  document.getElementById("optionSpace2").innerHTML = "<h2 class='small'>Total:</h2>";
  document.getElementById("moneySpace2").innerHTML = "";
  document.getElementById("nameSpace3").innerHTML = "<h2>Source</h2>";
  document.getElementById("optionSpace3").innerHTML = "<h2>Selected</h2>";
  document.getElementById("moneySpace3").innerHTML = "<h2>Salary</h2>";
  document.getElementById("nameSpace4").innerHTML = "";
  document.getElementById("optionSpace4").innerHTML = "<h2 class='small'>Total:</h2>";
  document.getElementById("moneySpace4").innerHTML = "";
  
  //nameSpace
  for(x in priceOptions){ 
    subjectValue = sessionStorage.getItem(priceOptions[x]);
    if(subjectValue != "false" && subjectValue.includes("false")){
      subjectValue = subjectValue.replace("false", "");
      for(var i=0,length=subjectValue.length; i<length; i++){
        document.getElementById("nameSpace").innerHTML += "<p>" + priceOptions[x].charAt(0).toUpperCase() + priceOptions[x].slice(1).replace("_", ": ") + "</p><br>";  
      }
    }
    else{  
      document.getElementById("nameSpace").innerHTML += "<p>" + priceOptions[x].charAt(0).toUpperCase() + priceOptions[x].slice(1).replace("_", ": ") + "</p><br>";
    }
  }      
  //optionSpace  
  for(x in priceOptions){
    subjectValue = sessionStorage.getItem(priceOptions[x]);  
    if(subjectValue != "false" && subjectValue.includes("false")){
      subjectValue = subjectValue.replace("false", "");
      for(var i=0,length=subjectValue.length; i<length; i++){
        document.getElementById("optionSpace").innerHTML += "<p>" + sessionStorage.getItem(priceOptions[x] + "Option" + subjectValue.charAt(i)).replace(":", "") + "</p><br>";  
      }
    }
    else if(subjectValue != "false"){  
      if(sessionStorage.getItem(priceOptions[x] + "Quantity")){
        document.getElementById("optionSpace").innerHTML += "<p>" + sessionStorage.getItem(priceOptions[x] + "Option").replace(":", "") + " (" + sessionStorage.getItem(priceOptions[x] + "Quantity") + ")</p><br>";    
      }
      else{  
        document.getElementById("optionSpace").innerHTML += "<p>" + sessionStorage.getItem(priceOptions[x] + "Option").replace(":", "") + "</p><br>";     
      }
    } 
    else{
      document.getElementById("optionSpace").innerHTML += "<p></p><br>";       
    } 
  }
  //moneySpace    
  priceTotal = 0;      
  for(x in priceOptions){
    subjectValue = sessionStorage.getItem(priceOptions[x]);
    if(subjectValue != "false" && subjectValue.includes("false")){
      subjectValue = subjectValue.replace("false", "");
      for(var i=0,length=subjectValue.length; i<length; i++){
        price = Number(sessionStorage.getItem(priceOptions[x] + "Price" + subjectValue.charAt(i)));
        priceTotal += price;  
        document.getElementById("moneySpace").innerHTML += "<p>" + price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p><br>"; 
      }
    }
    else if(subjectValue != "false"){
      if(priceOptions[x] == "retirement" && sessionStorage.getItem("career") != "false"){  
        price = Number(sessionStorage.getItem("careerPrice"))/10;
        priceTotal += price;  
        document.getElementById("moneySpace").innerHTML += "<p>" + price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p><br>";
      }
      else{  
        price = Number(sessionStorage.getItem(priceOptions[x] + "Price"));
        priceTotal += price;  
        document.getElementById("moneySpace").innerHTML += "<p>" + price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p><br>";  
      }
    } 
    else{
      document.getElementById("moneySpace").innerHTML += "<p></p><br>";       
    }  
  }
  //moneySpace2  
  document.getElementById("moneySpace2").innerHTML += "<p>" + priceTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p>";
  
  //nameSpace3
  for(x in salaryOptions){  
    document.getElementById("nameSpace3").innerHTML += "<p>" + salaryOptions[x].charAt(0).toUpperCase() + salaryOptions[x].slice(1).replace("_", " ") + "</p><br>";  
  }      
    
  //optionSpace3  
  for(x in salaryOptions){  
    subjectValue = sessionStorage.getItem(salaryOptions[x]);  
    if(subjectValue != "false"){
      if(sessionStorage.getItem(salaryOptions[x] + "Quantity")){
        document.getElementById("optionSpace3").innerHTML += "<p>" + sessionStorage.getItem(salaryOptions[x] + "Option").replace(":", "") + "(" + sessionStorage.getItem(salaryOptions[x] + "Quantity") + ")</p><br>";    
      }
      else{  
        document.getElementById("optionSpace3").innerHTML += "<p>" + sessionStorage.getItem(salaryOptions[x] + "Option").replace(":", "") + "</p><br>";  
      }
    } 
    else{
      document.getElementById("optionSpace3").innerHTML += "<p></p><br>";       
    }
  }
  
  //moneySpace3          
  salary = 0;
  salaryTotal = 0;
  for(x in salaryOptions){
    subjectValue = sessionStorage.getItem(salaryOptions[x]);  
    if(subjectValue != "false"){
      salary = Number(sessionStorage.getItem(salaryOptions[x] + "Price"));
      salaryTotal += salary;  
      document.getElementById("moneySpace3").innerHTML += "<p>" + salary.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p><br>";  
    } 
    else{
      document.getElementById("moneySpace3").innerHTML += "<p></p><br>";       
    }
  }
  
  //moneySpace4  
  document.getElementById("moneySpace4").innerHTML += "<p>" + salaryTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p>";
  
  //donationRequest
  var roundFactor = 0;
  if(priceTotal < 10000){
    roundFactor = 1000;  
  }
  else if(priceTotal < 100000){
    roundFactor = 10000;  
  }
  else if(priceTotal < 1000000){
    roundFactor = 100000;  
  }
  else if(priceTotal => 1000000){
    roundFactor = 100000;  
  }
  if(priceTotal != 0){  
    console.log(priceTotal);
    console.log(roundFactor);  
    donationTotal = (Math.floor(priceTotal/roundFactor)+1)*roundFactor;
    donation = donationTotal - priceTotal; 
    document.getElementById("donationRequest").innerHTML = "One can make the willing decision to be a giver, will you be one? Adding just " + donation.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " can save a life. Will you round the price total?"; 
  }
  else{
    document.getElementById("donationSpace").setAttribute("style", "display: none");  
  }
}

//Load the comment of the CheckOut page.
function loadComment(){  
  document.getElementById("commentSpace").innerHTML = "&emsp;";
  document.getElementById("commentSpace2").innerHTML = "&emsp;";  
  //commentSpace   
  if(sessionStorage.getItem("college") == "false"){
    document.getElementById("commentSpace").innerHTML += "You aren't going to college? Fine. ";    
  }
  else{
    document.getElementById("commentSpace").innerHTML += "Good. I can agree with " + sessionStorage.getItem("collegeOption").replace(":", "") + ". I hope you have fun overthere. ";
  }
  if(sessionStorage.getItem("luxury_Insurance") == "false"){
    document.getElementById("commentSpace").innerHTML += "Are you sure you don't want to have insurance? ";
  }
  if(sessionStorage.getItem("luxury_Home") == "false" || sessionStorage.getItem("luxury_Car") == "false"){
    document.getElementById("commentSpace").innerHTML += "I don't suggest living in a mobile trashcan. That will be terribly effective at keeping at bay. ";  
  }
  if(sessionStorage.getItem("family_Children") == "false"){
    document.getElementById("commentSpace").innerHTML += "It is fine to not have children. ";  
  }
  else{
    document.getElementById("commentSpace").innerHTML += "Interesting, how many children do you plan to have? ";
    document.getElementById("commentSpace").innerHTML += sessionStorage.getItem("family_ChildrenQuantity") + ". Not bad, that is a big family.";
  }
  if(sessionStorage.getItem("family_Pet") == "false"){
    document.getElementById("commentSpace").innerHTML += "Do you want a pet? ";  
  }
  else{
    document.getElementById("commentSpace").innerHTML += "Especially since you want to have some pets. ";
  }
  if(sessionStorage.getItem("budget_Food") == "false"){
    document.getElementById("commentSpace").innerHTML += "Not eating is going to raise that medical bill faster than one may think. ";  
  }
  else if(Number(sessionStorage.getItem("budget_Food")) == 1){
    document.getElementById("commentSpace").innerHTML += "Instant noodle is not good for your health, although one must agree that they taste great. ";  
  }
  
  var goodPlan = (priceOptions.length + salaryOptions.length)-2;  //Only need College or Military.
  var goodPlanChecker = goodPlan;  
  for(x in priceOptions){
    subjectValue = sessionStorage.getItem(priceOptions[x]);
    if(subjectValue == "false"){ 
      goodPlan -= 1;  
    }      
  }
  for(x in salaryOptions){
    subjectValue = sessionStorage.getItem(salaryOptions[x]);
    if(subjectValue == "false"){ 
      goodPlan -= 1;  
    }      
  }
  if(goodPlan <= (goodPlanChecker/3)){
    document.getElementById("commentSpace").innerHTML += "Well, I hope you will expand your plan soon. Right now, it is utter trash. Sorry, for my direct vocabulary. ";  
  }
  else if(goodPlan <= (goodPlanChecker/2)){
    document.getElementById("commentSpace").innerHTML += "Not a bad plan, but I will advocate that you think some more. These choices we made now can have huge impacts later on. ";  
  }
  else{
    document.getElementById("commentSpace").innerHTML += "I like this cart. You are making excellent choices! But don't stop now, it will change as you become more experienced. So check back every so often! ";  
  }  
  
  //commentSpace2
  if(salaryTotal == 0){
    document.getElementById("commentSpace2").innerHTML += "You won't be able to woo anybody with that salary! Find what you want to do! And living off of your parents' basement doesn't really satisfy the cut. ";  
  }  
  else if(salaryTotal < priceTotal){
    document.getElementById("commentSpace2").innerHTML += "Hmm, your salary is lower than your dream plan. Well, you won't be rich like Bill Gate, but who want to be like him anyway? Always buzzed by men and women of every class. Sometime, we just want the peace and quiet. By the way, don't worry about it, this numbers doesn't consider the fact that we generally paid a car over the course of several years. ";  
  }   
  else if(salaryTotal == priceTotal){
    document.getElementById("commentSpace2").innerHTML += "Amazing, you are making the same amount that you are spending. And this number is something you should be paying over a few years! Just how rich do you want to be? ";  
  }
  else if(salaryTotal > priceTotal){
    document.getElementById("commentSpace2").innerHTML += "Wow, you want to make some big bucks with that job! I hope you will enjoy it and live your life well. That is the biggest hope from any parents. ";  
  }
}

//Add Donation to the CheckOut page.
function acceptDonation(){
  document.getElementById("donationComment").innerHTML = "Thank You. The money had been sent and the child is now eating bread. Wait what, the bread is poisoned? I am sorry, but your kind donation had been wasted.";  
  document.getElementById("acceptDonation").setAttribute("class", "yesButton");
  document.getElementById("acceptDonation").removeAttribute("onclick");  
  document.getElementById("declineDonation").removeAttribute("onclick");
  document.getElementById("acceptDonation").setAttribute("style", "cursor: initial;");
  document.getElementById("declineDonation").setAttribute("style", "cursor: initial;");
  document.getElementById("acceptDonation").removeAttribute("id");  
  document.getElementById("declineDonation").removeAttribute("id");
    
  document.getElementById("nameSpace").innerHTML += "<p>Miscellaneous</p><br>"; 
  document.getElementById("optionSpace").innerHTML += "<p>Donation</p><br>"; 
  document.getElementById("moneySpace").innerHTML += "<p>" + donation.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p><br>";  
  document.getElementById("moneySpace2").innerHTML = "<p>" + donationTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + "</p>";  
  document.getElementById("finalComment").innerHTML = "You are a kind one and I hope you lead a good life. This world is what you make it to be. Every decision, every choices matter. When something doesn't seem right, speak up for yourself. If you are oppressed, the one that will be responsible is only yourself. You are in charge and lead it well!<br>";  
  window.scrollTo(0,document.body.scrollHeight);
}

//Decline Donation at the CheckOut page.
function declineDonation(){
  document.getElementById("donationComment").innerHTML = "Oh, you are a mean one aren't you? Thank you for your time and may you return one day.";
  document.getElementById("declineDonation").setAttribute("class", "noButton");
  document.getElementById("acceptDonation").removeAttribute("onclick");  
  document.getElementById("declineDonation").removeAttribute("onclick");  
  document.getElementById("acceptDonation").setAttribute("style", "cursor: initial;");
  document.getElementById("declineDonation").setAttribute("style", "cursor: initial;");
  document.getElementById("acceptDonation").removeAttribute("id");  
  document.getElementById("declineDonation").removeAttribute("id");
  document.getElementById("finalComment").innerHTML = "You are a mean one, but you are money-wise. In this era, the kind ones aren't given any special privileges. You matter to yourself; however, please understand that others matter too. No one should be above anyone. Decisions now can affect others down the line. It will be a cruel world if no one was willing to help the others. Make your choices well and respect them. Don't look back.<br>";
  window.scrollTo(0,document.body.scrollHeight);
}

//Below codes depended on W3SCHOOL as resource

//When the user scrolls down 50px from the top of the document, this function display the to top button
window.addEventListener('scroll', scrollFunction);
function scrollFunction(){
  if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
    document.getElementById("scrollButton").style.display = "block";
  }
  else{
    document.getElementById("scrollButton").style.display = "none";
  }
}

//scroll to the top of the document whene the button is click
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Open the popup, when the "popup" <div> is clicked
function popupFunction(subject, option) {
    var popup = document.getElementById(subject + option + "PopupText");
    popup.classList.toggle("show");
    document.getElementById(subject + option).click();
}

//Made the Carousel "stick" to top of the home page.
function fixCarousel(){
  if(document.body.scrollTop > 70 || document.documentElement.scrollTop > 70){
    document.getElementById("carouselId").setAttribute("style", "position: fixed; top: 78px; left: 55px;");  
  }  
  else{
    document.getElementById("carouselId").setAttribute("style", "position: relative; top: 10px; left: -50px;");  
  }  
}

//Used to replicate the concept of clicking a button by pressing enter in the input field.
document.addEventListener('keypress', pressButton);
function pressButton(event){  
  if(event.key == "Enter"){
    var focused = document.activeElement.id;
    var checkFocused = focused.includes("ButtonInput");
    if(checkFocused == true){
      focused = focused.replace("Input", "");  
      document.getElementById(focused).click();
    }
    else if(focused.includes("quantity")){
      focused = focused.concat("Button");  
      document.getElementById(focused).click();
    }
  }
}

//Master for all the input calculators. Separated by subject. Not as clean as putting the script directly below the calculator, but this take less function. Maybe.
function calculateInput(subject){
  if(document.getElementById(subject + "ButtonInput")){  
    var inputValue = Number(document.getElementById(subject + "ButtonInput").value);
  }
  if(subject == "college"){  
    document.getElementById(subject + "ButtonOutput").innerHTML = "True Cost: " + (inputValue*4).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ";";  
  }
  else if(subject == "military" || subject == "career"){  
    document.getElementById(subject + "ButtonOutput").innerHTML = "Net Salary: " + (inputValue*0.835).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per year;<br>";    
    document.getElementById(subject + "ButtonOutput").innerHTML += "Gross Salary: " + (inputValue/12).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per month;<br>";    
    document.getElementById(subject + "ButtonOutput").innerHTML += "Net Salary: " + (inputValue/12*0.835).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per month;";  
  }
  else if(subject == "family"){
    var priceTotal = 0;  
    if(sessionStorage.getItem("family_Spouse") != "false"){
      priceTotal += Number(sessionStorage.getItem("family_SpousePrice"));
      //console.log(priceTotal);  
    }
    if(sessionStorage.getItem("family_Children") != "false"){
      priceTotal += Number(sessionStorage.getItem("family_ChildrenPrice"));  
      //console.log(priceTotal);
    }
    if(sessionStorage.getItem("family_Pet") != "false"){
      subjectValue = sessionStorage.getItem("family_Pet");  
      subjectValue = subjectValue.replace("false", "");   
      for(var i=0, length=subjectValue.length; i<length; i++){
        priceTotal += Number(sessionStorage.getItem("family_Pet" + "Price" + subjectValue.charAt(i)));  
        //console.log(priceTotal);  
      }
    }
    document.getElementById("familyButtonOutput").innerHTML = "Price: " + priceTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per year;";  
  }
  if(subject == "food"){  
    document.getElementById(subject + "ButtonOutput").innerHTML = "True Cost: " + (inputValue/365/3).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ";";  
  }
  else if(subject == "utility"){
    var priceTotal = 0;  
    if(sessionStorage.getItem("budget_Utility") != "false"){
      subjectValue = sessionStorage.getItem("budget_Utility");  
      subjectValue = subjectValue.replace("false", "");   
      for(var i=0, length=subjectValue.length; i<length; i++){
        priceTotal += Number(sessionStorage.getItem("budget_Utility" + "Price" + subjectValue.charAt(i)));  
        //console.log(priceTotal);  
      }
    }
    document.getElementById("utilityButtonOutput").innerHTML = "Price: " + priceTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per year;";  
  }
  else if(subject == "luxury_Home" || subject == "luxury_Automobile"){
    var price = Number(document.getElementById(subject + "PriceInput").value);
    var downPayment = Number(document.getElementById(subject + "DownPaymentInput").value)/100;
    var time = Number(document.getElementById(subject + "TimeInput").value);
    var interestRate = Number(document.getElementById(subject + "InterestInput").value)/100;
    var principal = price-(price*downPayment)
    var trueCost = 1+(interestRate/12);  
    trueCost = principal*Math.pow(trueCost, time);
    var averagePrice = trueCost/time;  
    document.getElementById(subject + "ButtonOutput").innerHTML = "-Result-<br><br>";    
    document.getElementById(subject + "ButtonOutput").innerHTML += "Down Payment: " + (price*downPayment).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ";<br>";    
    document.getElementById(subject + "ButtonOutput").innerHTML += "Monthly Price: " + (averagePrice).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ";<br>";    
    document.getElementById(subject + "ButtonOutput").innerHTML += "True Total: " + (trueCost+(price*downPayment)).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + ";";    
  }
  else if(subject == "insurance"){
    var priceTotal = 0;  
    if(sessionStorage.getItem("luxury_Insurance") != "false"){
      subjectValue = sessionStorage.getItem("luxury_Insurance");  
      subjectValue = subjectValue.replace("false", "");   
      for(var i=0, length=subjectValue.length; i<length; i++){
        priceTotal += Number(sessionStorage.getItem("luxury_Insurance" + "Price" + subjectValue.charAt(i)));  
        //console.log(priceTotal);  
      }
    }
    document.getElementById("insuranceButtonOutput").innerHTML = "Price: " + priceTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + " per year;";  
  }
    
  //Check
  var outputChecker = document.getElementById(subject + "ButtonOutput").innerHTML;  
  if(outputChecker == "True Cost: NaN;" || outputChecker == "True Cost: $0.00;" || outputChecker == "Price: NaN per year;" || outputChecker == "Price: $0.00 per year;"){
    document.getElementById(subject + "ButtonOutput").innerHTML = "<br>";  
  }
  else if(outputChecker == "Net Salary: NaN per year;<br>Gross Salary: NaN per month;<br>Net Salary: NaN per month;" || outputChecker == "Net Salary: $0.00 per year;<br>Gross Salary: $0.00 per month;<br>Net Salary: $0.00 per month;"){
    document.getElementById(subject + "ButtonOutput").innerHTML = "<br><br><br>";    
  }
}

//Used to cancel out the selectOption event. However, it will unclick any other active div.
document.addEventListener('click', unclickDiv);
function unclickDiv(event){ 
/*    
  console.log(document.activeElement.className)
  console.log(document.activeElement.id)  
*/
/*
  if(document.activeElement.className.includes("popup")){  
    var focused = document.activeElement.firstChild.id;
    console.log(document.activeElement.firstChild.id)  
    if(focused.includes("popupText")){
      focused = focused.replace("popupText", "");  
      document.getElementById(focused).click();
    }
  }
*/    
  if(document.activeElement.className.includes("normalLink") && document.activeElement.querySelector("h4").id){  
    var focused = document.activeElement.querySelector("h4").id;  
    if(focused.includes("option")){
      focused = focused.replace("option", "");  
      document.getElementById(focused).click();
    }
  }
  else if(document.activeElement.id){  
    var focused = document.activeElement.id;  
    if(focused.includes("quantityButton")){
      focused = focused.replace("quantityButton", "");  
      document.getElementById(focused).click();
    }
    else if(focused.includes("quantity")){
      focused = focused.replace("quantity", "");  
      document.getElementById(focused).click();        
    }  
/*
    else if(focused.includes("option")){
      focused = focused.replace("option", "");  
      document.getElementById(focused).click();
    }  
*/
  }
}