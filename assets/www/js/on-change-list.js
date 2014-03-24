$("#back-anthem").bind ("click", function (event)
{
	var option_val = document.getElementById("anthem_lyrics").getAttribute("value");
	list_anthems(option_val);
});

function list_anthems(option_val){
	
  //alert(option_val);
  db.transaction (function (transaction) 
  {
    var sql = "SELECT * FROM SONG WHERE option_value='" + option_val + "' ORDER BY national_anthem DESC";

	//alert(sql);
    transaction.executeSql (sql, undefined, 
    function (transaction, result)
    {
		
       var html = "<ul>";
	   var main_anthem = "";
	   var remaining_anthems = "";
	   
       if (result.rows.length)
       {
         for (var i = 0; i < result.rows.length; i++) 
         {
			//alert(row.anthem_name);
           var row = result.rows.item (i);
           var anthem_name = row.anthem_name;
		   var id = row.id;
		   var national_anthem = row.national_anthem;
		   
		   if (national_anthem == 'true')
		   {
				main_anthem += "<li><a href=\"#\" id=\"anthem"+id+"\" value=\""+anthem_name+"\"><h1>"+ anthem_name+" *</h1></a></li>";
		   }
		   else 
		   {
				remaining_anthems += "<li><a href=\"#\" id=\"anthem"+id+"\" value=\""+anthem_name+"\"><h1>"+ anthem_name+"</h1></a></li>";
		   }		   
         }
       }
       else
       {
         html += "<li> No Songs </li>";
       }
      
	   html += main_anthem;
	   html += remaining_anthems;
       html += "</ul>";
	   //alert(html);
      
       $("#win2").unbind ().bind ("pagebeforeshow", function ()
       {
         var $content = $("#win2 div:jqmData(role=content)");
         $content.html (html);
         var $ul = $content.find ("ul");
         $ul.listview ();
       });

      $.mobile.changePage ($("#win2"));	  
	  
	  for (var j = 0; j < result.rows.length; j++) 
	  {
		var song_id = result.rows.item(j).id;
		change_song(song_id);
	  }
	  
    }, error);
  });
}

function change_song(song_id)
{ 
	//alert(song_id);
	$("#anthem"+song_id).bind ("click", function (event)
	{
	  db.transaction (function (transaction) 
	  {
		var sql = "SELECT anthem_name, anthem, option_value FROM SONG WHERE id=" + song_id;

		//alert(sql);
		transaction.executeSql (sql, undefined, 
		function (transaction, result)
		{
		   if (result.rows.length)
		   {
			   var html = "<p id=\"anthem_lyrics\" value=\""+result.rows.item(0).option_value+"\">"+result.rows.item(0).anthem+"</p>";
		   }
		   else
		   {
			 html = "<p> No Lyics </p>";
		   }

		   $("#win3").unbind ().bind ("pagebeforeshow", function ()
		   {
			 document.getElementById("win3-anthem-header").innerHTML=result.rows.item(0).anthem_name;
			 var $content = $("#win3 div:jqmData(role=content)");
			 $content.css('background-image', 'url(images/background/'+result.rows.item(0).option_value+'.png)');
			 $content.html (html);
		   });

		  $.mobile.changePage ($("#win3"));
		  
		}, error);
	  });
	});
}

