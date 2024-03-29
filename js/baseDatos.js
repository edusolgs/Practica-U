// JavaScript Document
// global variables


//$(document).on("click", "#datosBD" ,function (event) {
   
//$.mobile.changePage("#listadogeneral");

// global variables
var db;
var shortName = 'BdAutos';
var version = '1.0';
var displayName = 'BdAutos';
var maxSize = 65535;

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   alert("DEBUGGING: success");

}

function nullHandler(){};

// called when the application loads


// This alert is used to make sure the application is loaded correctly
// you can comment this out once you have the application working
alert("DEBUGGING: we are in the onBodyLoad() function");

 if (!window.openDatabase) {
   // not all mobile devices support databases  if it does not, the following alert will display
   // indicating the device will not be albe to run this application
   alert('Databases are not supported in this browser.');

 }

// this line tries to open the database base locally on the device
// if it does not exist, it will create it and return a database object stored in variable db
db = openDatabase(shortName, version, displayName,maxSize);

// this line will try to create the table User in the database justcreated/openned
 db.transaction(function(tx){

  // you can uncomment this next line if you want the User table to beempty each time the application runs
  // tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);

  // this line actually creates the table User if it does not existand sets up the three columns and their types
  // note the UserId column is an auto incrementing column which isuseful if you want to pull back distinct rows
  // easily from the table.
   tx.executeSql( 'CREATE TABLE IF NOT EXISTS Modelo(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, Precio TEXT NOT NULL)', [],nullHandler,errorHandler);
 },errorHandler,successCallBack);



// list the values in the database to the screen using jquery toupdate the #lbUsers element
function ListDBValues() {

 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return;
 }

// this line clears out any content in the #lbUsers element on thepage so that the next few lines will show updated
// content and not just keep repeating lines
 $('#lbUsers').html('');
$("#notas").empty();
// this next section will select all the content from the User tableand then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers elementon the page
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM Modelo;', [],
     function(transaction, result) {
		 $("#notas").empty();
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          //$('#lbUsers').append('<br>' + row.UserId + '. ' +row.FirstName+ ' ' + row.LastName);
		  $("#notas").append('<li data-inset="true" value="'+row.UserId+'">'+row.FirstName+' ' + row.Precio+'</li>');
		  $("#notas").listview("refresh");
        }
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {

 if (!window.openDatabase) {
   alert('Databases are not supported in this browser.');
   return;
 }

// this is the section that actually inserts the values into the User table
 db.transaction(function(transaction) {
   transaction.executeSql('INSERT INTO Modelo(FirstName, Precio) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()], nullHandler,errorHandler);
   $('#txFirstName').val("");
$('#txLastName').val("");
   });

// this calls the function that will show what is in the User table in the database


 ListDBValues();

 return false;

}


var itemlis;
//modifique valores de la lista por medio del value
$(document).on("click", "#notas li" ,function(event) {
	  itemlis= $(this).val();
	//alert(itemlis);
	
	//Borrar(1,itemlis);
	$.mobile.changePage("#mesajito", {transition: 'flip', role: 'dialog'});
}); 



$(document).on("click", "#aceptar" ,function(event) {
	
	alert(itemlis);
	
	eliminar(1,itemlis);
	//$.mobile.changePage("#mesajito", {transition: 'flip', role: 'dialog'});
}); 



function eliminar(n,itemId) {
    ItemId = itemId;
		//alert("eliminar"+ItemId);
    switch(n)
    {
    case 1:
        db.transaction(BorrarItem, errorHandler);
      break;
    default:
 
    }
}
 
function BorrarItem(tx) {
    tx.executeSql('DELETE FROM Modelo WHERE UserId=?', [ItemId], successCB, errorHandler);
}

function successCB() {
    //if (ItemId > 0) {
    alert('El Item fue eliminado.');
    $('#notas' + ItemId).remove();
	ListDBValues();
	$.mobile.changePage("#iniciar");
 
}


