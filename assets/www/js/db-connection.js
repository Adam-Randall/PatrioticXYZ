//add listener when device ready
//var dbPath = "C:\\Users\\Randy\\workspace\\PatrioticXYZ\\assets\\www\\patrioticXYZ.db";
var db = window.openDatabase("path", "1.0", "patrioticXYZ", 65535); //will create database Dummy_DB or open it


//create table and insert some record
function create_table() 
{ 
  db.transaction (function (transaction) 
  {
    var sql = "CREATE TABLE song " +
        "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        "country text NOT NULL, " + 
		"option_value text NOT NULL, " + 
		"national_anthem text NOT NULL, " +
		"anthem_name text NOT NULL, " +
        "anthem text NOT NULL, " +
		"anthem_midi text NOT NULL )"
    transaction.executeSql (sql, undefined, function ()
    { 
      //alert ("Table created");
    }, error);
  });
}

function insert_data(country, option_value, national_anthem, anthem_name, anthem, anthem_midi) 
{ 
  db.transaction (function (transaction){
    var sql = "INSERT INTO SONG (country, option_value, national_anthem, anthem_name, anthem, anthem_midi) VALUES (?,?,?,?,?,?)";
    transaction.executeSql (sql, [country, option_value, national_anthem, anthem_name, anthem, anthem_midi], function ()
    { 
      //alert ("Song inserted");
    }, error);
  });
};

function drop_all() 
{
    db.transaction (function (transaction) 
  {
    var sql = "DROP TABLE SONG"
    transaction.executeSql (sql, undefined, function ()
    { 
      //alert ("Table Dropped");
    }, error);
  });
}

function delete_all() 
{
  db.transaction (function (transaction) 
  {
    var sql = "DELETE FROM SONG"
    transaction.executeSql (sql, undefined, function ()
    { 
      //alert ("Songs Deleted");
    }, error);
  });
  
    db.transaction (function (transaction) 
  {
    var sql = "DELETE FROM \"sqlite_sequence\" where name='SONG'"
    transaction.executeSql (sql, undefined, function ()
    { 
      //alert ("Sequence Deleted");
    }, error);
  });
}



/*$("#remove").bind ("click", function (event)
{
  if (!confirm ("Delete table?", "")) return;;
  db.transaction (function (transaction) 
  {
    var sql = "DROP TABLE customers";
    transaction.executeSql (sql, undefined, ok, error);
  });
});*/



function ok ()
{
}

function error (transaction, err) 
{
  alert ("DB error : " + err.message);
  return false;
}

