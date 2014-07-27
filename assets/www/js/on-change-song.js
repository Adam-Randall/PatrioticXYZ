function create_table()
{
	$("#anthem1").bind ("click", function (event)
	{
	  var anthem_name = document.getElementById('anthem1').getAttribute("value"); 
	  alert(anthem_name);
	  db.transaction (function (transaction) 
	  {
		var sql = "SELECT * FROM SONG WHERE anthem_name='" + anthem_name + "'";

		alert(sql);
		transaction.executeSql (sql, undefined, 
		function (transaction, result)
		{
			
		   //var html = "<ul>";
		   if (result.rows.length)
		   {
			 for (var i = 0; i < result.rows.length; i++) 
			 {
				//alert(row.anthem_name);
			   var row = result.rows.item (i);
			   var anthem = row.anthem;
				 
			   var html = "<p>"+anthem+"</p>";
			 }
		   }
		   else
		   {
			 html = "<p> No Lyics </p>";
		   }
		  
		   //html += "</ul>";
		   alert(html);
		  
		   $("#win3").unbind ().bind ("pagebeforeshow", function ()
		   {
			 var $content = $("#win3 div:jqmData(role=content)");
			 $content.html (html);
			 //var $ul = $content.find ("ul");
			 //$ul.listview ();
		   });

		  $.mobile.changePage ($("#win3"));
		  
		}, error);
	  });
	});
}