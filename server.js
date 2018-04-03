var httpObj= require('http');
var fs= require('fs');
var path= require('path');
var qs= require('querystring');      //Used to parse the body of request messages.
var url = require('url');


var newFile= "users.json";
var dataFol= "data";
var filepath= path.join(__dirname,dataFol, newFile);      //newFile will be added to current directory.*/
var myForm= fs.readFileSync('./form.html');
var myFormcss= fs.readFileSync('./asn2Style.css');
var myFormScript= fs.readFileSync('./asn2script.js');
var server= httpObj.createServer();

var emptyArray= new Array();
emptyArray= JSON.stringify(emptyArray);

server.on('request', function(req, res) {
if(req.url ==='/' && req.method !== "POST")    //client is on the root.
{
  res.writeHead(200, {"content-type":"text/html"});
  res.write(myForm);
  res.end();
}
else if(req.method === 'POST')      //Form is submitted.
{
  var body= "";
  req.on('data', function(data)   //Going to body section of request message.
  {
    body+=data.toString();
  });
  req.on('end', function()      //Body of post request is empty.
  {
    var query= qs.parse(body);     //qs will parse string to an object.
    var allUsers= separateUsers(query);

    fs.exists('./data/users.json', function(exists)
    {
      if(exists)
      {
        var readExistingJson= fs.readFileSync(filepath);
        readExistingJson= JSON.parse(readExistingJson);
        for(var t=0; t<allUsers.length; t++)
        {
          var toPush= allUsers[t];
          readExistingJson.push(toPush);
        }
        readExistingJson= JSON.stringify(readExistingJson);
        fs.writeFileSync(filepath, readExistingJson);
        res.end();
      }
      else
      {
        allUsers= JSON.stringify(allUsers);
        fs.writeFileSync(filepath, allUsers);
        res.end();
      }
  });
});
}
else if(req.url==='/asn2script.js')
{
  res.writeHead(200, {"content-type":"application/javascript"});
  res.write(myFormScript);
  res.end();
}
else if(req.url==='/asn2Style.css')
{
  res.writeHead(200,{"content-type":"text/css"} );
  res.write(myFormcss);
  res.end();
}
else if(req.url=== '/data/users.json')
{
  fs.exists('./data/users.json', function(exists)
  {
    if(exists)
    {
      var jsonFile= fs.readFileSync('./data/users.json');
      res.writeHead(200, {"content-type":"application/json"});
      res.write(jsonFile);
      res.end();
    }
    else
    {
      fs.writeFileSync(filepath, emptyArray);
      var tempFile= fs.readFileSync(filepath);
      res.writeHead(200, {"content-type":"application/json"});
      res.write(tempFile);
      res.end();

    }
 });
}
else if(req.url==="/users.html")
{
  var dispUsers= fs.readFileSync('./users.html');
  res.writeHead(200, {"content-type":"text/html"});
  res.write(dispUsers);
  res.end();
}
else
{
  res.writeHead(404);
  res.write("404 Error");
  res.end();
}
});
function separateUsers(queryObject)
{
  var numberProperties=0;
  for(property in queryObject)
  {
    numberProperties++;     //Count total properties in queryObject.
  }
/*  var getProp= Object.keys(queryObject);      //Returns an array all the keys (fname1,.....emailn)
  console.log(getProp);
  var getNum= getProp[getProp.length-1];    //Returns the last key (has to be email. We want the number after email. )
  var numberUser= parseInt(getNum.charAt(getNum.length-1));*/
  var numberUser= numberProperties/4;
  var userArray= new Array(numberUser);     //numberProperties/4= total users.
  for(var k=0; k<numberUser; k++)
  {
    userArray[k]= new Object();
  }
  for(property in queryObject)
  {
    var index= parseInt(property.charAt(property.length-1));      //returns 1, 2, etc.
    userArray[index-1][property.substring(0,property.length-1)]= queryObject[property];
  }
  return userArray;
}
server.listen(33108);
