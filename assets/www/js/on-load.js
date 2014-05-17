//List Countries
$( document ).ready(function() {
  	
	//view splash screen
	enable_splash();
	
	drop_all();
	create_table();
	insert_values();
	
  db.transaction (function (transaction) 
  {
    var sql = "SELECT DISTINCT country, option_value FROM SONG ORDER BY country";

	//alert(sql);
    transaction.executeSql (sql, undefined, 
    function (transaction, result)
    {
		
       var html = "<ul data-role=\"listview\" data-inset=\"true\" data-theme=\"c\" data-dividertheme=\"b\">";
       if (result.rows.length)
       {
         for (var i = 0; i < result.rows.length; i++) 
         {
           var row = result.rows.item (i);
		   html +=  "<li><a href=\"#\" id=\"countries"+row.option_value+"\" value=\""+row.option_value+"\"><h1><img src=\"images/icons/"+row.option_value+".png\"> "+row.country+"</h1></a></li>"
		   
		 }
       }
       else
       {
         html += "<li> No Countries Exist </li>";
       }
      
       html += "</ul>";
	   //alert(html);
      

	   var $content = $("#home div:jqmData(role=content)");
	   $content.html (html);
	   var $ul = $content.find ("ul");
	   $ul.listview ();
	  
		for (var j = 0; j < result.rows.length; j++) 
		{
			var row = result.rows.item (j);
			bind_anthem(row.option_value);
		}
		
    }, error);
	
  });

  //inial loading done, disable splash screen
  setTimeout(disable_splash, 5000);  
	
});

function enable_splash(){
	document.getElementById('main').setAttribute('class', 'hidden');
	document.getElementById('splash-screen').setAttribute('class', 'visible');
}

function disable_splash(){
	document.getElementById('splash-screen').setAttribute('class', 'hidden');
  	document.getElementById('main').setAttribute('class', 'visible');
}

function bind_anthem(option_value){
	$("#countries"+option_value).bind ("click", function (event){ list_anthems(option_value); });
}