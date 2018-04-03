var addUser= document.getElementById("addU");   //Add more grabbed. Now as user clicks, more children will be appended to the form.
var form2=document.getElementById("form");    //Form grabbed. Now we can append children as user wants.
var sub= document.getElementById("submit");
var res= document.getElementById("resetBut");
var fnameInput= document.createElement("input");
var lnameInput= document.createElement("input");
var brdInput= document.createElement("input");
var emailInput= document.createElement("input");
var myDiv;

var ogDiv= document.getElementById("ogDiv");
var isPressed= false;

//Get actual default values for each of the field.
var tempNameField= document.createElement("input");
tempNameField.type="text";
var fnameDef= tempNameField.defaultValue;
var lnameDef= tempNameField.defaultValue;
var brdTempField= document.createElement("input");
brdTempField.type="date";
var brdDef= brdTempField.defaultValue;
var emailTempField= document.createElement("input");
emailTempField.type="email";
var emailDef= emailTempField.defaultValue;
var addEmailInput;
var count=1;
function addEmailFunc()
{
  var addEmailLabel= document.createElement("label");
  addEmailLabel.for= "email";
  addEmailLabel.innerHTML= "Additional Email: ";

  addEmailInput= document.createElement("input");
  addEmailInput.name= "email"+count;
  addEmailInput.id= "email";
  addEmailInput.type="email";
  addEmailInput.setAttribute("oninput", "changeCall(event)");
  addEmailInput.className= "emailClass";

  ogDiv.innerHTML+= "<br>"
  ogDiv.appendChild(addEmailLabel);
  ogDiv.appendChild(addEmailInput);
}
function addEmailTemp(event)
{

    var addEmailLabel= document.createElement("label");
    addEmailLabel.for= "email";
    addEmailLabel.innerHTML= "Additional Email: ";

    addEmailInput= document.createElement("input");
    addEmailInput.name= "email"+count;
    addEmailInput.id= "email";
    addEmailInput.type="email";
    addEmailInput.setAttribute("oninput", "changeCall(event)");
    addEmailInput.className= "emailClass";
    event.target.parentNode.appendChild(addEmailLabel);
    event.target.parentNode.appendChild(addEmailInput);

}
addUser.addEventListener('click', createform2);
function numUsers() {
  window.alert("Total number of users are: "+count);
}
function resetValues()
{
  var allfnameVal= document.getElementsByClassName("firstNameClass");
  for(var f=0; f<allfnameVal.length; f++)
  {
    allfnameVal[f].value= fnameDef;
  }
  var alllnameVal= document.getElementsByClassName("lastNameClass");
  for(var l=0; l<alllnameVal.length; l++)
  {
    alllnameVal[l].value= lnameDef;
  }
  var allbrdVal= document.getElementsByClassName("birthdayClass");
  for(var b=0; b<allbrdVal.length; b++)
  {
    allbrdVal[b].value= brdDef;
  }
  var allemailVal= document.getElementsByClassName("emailClass");
  for(var q=0; q<allemailVal.length; q++)
  {
    allemailVal[q].value= emailDef;
  }
}
function changeCall(event)
{
  event.target.defaultValue= event.target.value;
}
function addFeatures()
{
  window.alert("Features: \n\n 1) Number of users generated can be checked by pressing the associated button. \n\n 2) All the users entered are sorted lexographically (by their first names). \n\n 3) Reset: All values can be reset to default. NOTE: If more users are added, the original values are returned to help the user fill original values.\n\n 4) Direct links to JSON file and Users HTML page.  ");
}
function createform2()
{
  count++;
  myDiv= document.createElement("div");
  myDiv.id= count;
  if(sub!==null)
  {
    form2.removeChild(sub);
    form2.removeChild(res);
  }
  //Creating labels for fiels to append to already existing form.
  var fnameLabel= document.createElement("label");
  fnameLabel.for="firstName";
  fnameLabel.innerHTML= "First Name: ";
  fnameInput.id="firstName";
  fnameInput.type="text";
  fnameInput.name="firstName"+count;
  fnameInput.setAttribute("oninput", "changeCall(event)");
  fnameInput.className= "firstNameClass";
  myDiv.appendChild(fnameLabel);
  myDiv.appendChild(fnameInput);
  myDiv.innerHTML +="<br>";

  var lnameLabel= document.createElement("label");
  lnameLabel.for="lastName";
  lnameLabel.innerHTML= "Last Name: ";
  lnameInput.id="lastName";
  lnameInput.type="text";
  lnameInput.name="lastName"+count;
  lnameInput.setAttribute("oninput", "changeCall(event)");
  lnameInput.className= "lastNameClass";
  myDiv.appendChild(lnameLabel);
  myDiv.appendChild(lnameInput);
  myDiv.innerHTML +="<br>";

  var brdLabel= document.createElement("label");
  brdLabel.for="birthday";
  brdLabel.innerHTML= "Birthday: ";
  brdInput.id="birthday";
  brdInput.type="date";
  brdInput.name="birthday"+count;
  brdInput.setAttribute("oninput", "changeCall(event)");
  brdInput.className= "birthdayClass";
  myDiv.appendChild(brdLabel);
  myDiv.appendChild(brdInput);
  myDiv.innerHTML +="<br>";

  var emailLabel= document.createElement("label");
  emailLabel.for="email";
  emailLabel.innerHTML= "Email: ";
  emailInput.id="email";
  emailInput.type="email";
  emailInput.name="email"+count;
  emailInput.setAttribute("oninput", "changeCall(event)");
  emailInput.className= "emailClass";
  var addButt= document.createElement("button");
  addButt.innerHTML= "+";
  addButt.setAttribute("onclick", "addEmailTemp(event)");
  addButt.setAttribute("type", "button");
  myDiv.appendChild(emailLabel);
  myDiv.appendChild(emailInput);
  myDiv.appendChild(addButt);
  myDiv.innerHTML +="<br>";
  form2.innerHTML+="<br>";
  form2.innerHTML+="<br>";

  form2.appendChild(myDiv);

  sub= document.createElement("input");
  sub.id="submit";
  sub.type="submit";
  form2.appendChild(sub);

  res= document.createElement("button")
  res.type="button";
  res.id="resetBut";
  res.setAttribute("onclick", "resetValues()");
  res.innerHTML= "Reset";
  form2.appendChild(res);

  document.body.appendChild(form2);
}
