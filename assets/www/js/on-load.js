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
		   html +=  "<li><a href=\"#\" data-transition=\"slidefade\" id=\"countries"+row.option_value+"\" value=\""+row.option_value+"\"><h1><img src=\"images/icons/"+row.option_value+".png\"> "+row.country+"</h1></a></li>"
		   
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
  setTimeout(disable_splash, 10000);  
	
});

function enable_splash(){
	var $contentTohide = $("#main");
	$contentTohide.css('display', 'none');
		
	var $body = $("#body");	
	$body.css('background-image', 'url(images/background/splash-bg-xy.png)');
	$body.css('background-repeat', 'repeat-x');
	$body.css('background-size', 'contain');
	
	
	var $contentToDisplay = $("#splash-screen");
	$contentToDisplay.css('padding-top', '15%');
	$contentToDisplay.css('display', 'block');
	
	var $contentToDisplayHeader =  $("#header");
	$contentToDisplayHeader.css('margin-left', 'auto');
	$contentToDisplayHeader.css('margin-right', 'auto');
	$contentToDisplayHeader.css('display', 'block');
	
	var $contentToDisplayHeader =  $("#loading");
	$contentToDisplayHeader.css('margin-left', 'auto');
	$contentToDisplayHeader.css('margin-right', 'auto');
	$contentToDisplayHeader.css('margin-top', '-65px');
	$contentToDisplayHeader.css('display', 'block');
}

function disable_splash(){

	var $body = $("#body");	
	$body.removeAttr( 'style' );
	
	var $contentTohide = $("#splash-screen");
	$contentTohide.css('display', 'none');
	
	var $contentToDisplay = $("#main");
	$contentToDisplay.css('display', 'block');
}

function bind_anthem(option_value){
	$("#countries"+option_value).bind ("click", function (event){ list_anthems(option_value); });
}