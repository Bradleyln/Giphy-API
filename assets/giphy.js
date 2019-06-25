var somethingArray=["Harry Potter","Twilight","Misery","Artemis Fowl","The Hunger Games","Goosebumps"];

function renderButtons(){

	console.log(somethingArray);
	$(".row2").empty();
	//looping through the array 
	for(var i = 0; i < somethingArray.length; i++){
		var button = $("<button>");
		button.addClass("somethingButton");
		button.attr("data-something",somethingArray[i]);
		button.text(somethingArray[i]);

		$(".row2").append(button);
	}
} 


$("#add-something").on("click", function(event) {

	event.preventDefault();
	var somthing = $("#something-input").val().trim();
	
	somethingArray.push(somthing);
	$("#something-input").val("");

	renderButtons();

}); 



//fetching gifs from api
function fetchSomethingGifs() {
  
  var somethingName = $(this).attr("data-something");
  var somethingStr = somethingName.split(" ").join("+");	
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4eJQrGXdfJkDc8dOBDvaIRdL9yt7z3uhttps://api.giphy.com/v1/gifs/trending?api_key=4eJQrGXdfJkDc8dOBDvaIRdL9yt7z3u3&limit=25&rating=PG3=" + somethingStr + "&limit=25&offset=0&rating=G&lang=en";

  //var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    method: "GET",
    url: queryURL,
  }).done(function( results ) {
  	
  	var dataArray = results.data;

  	$(".row3").empty();
    for (var i = 0; i < dataArray.length; i++) {

    	var newDiv = $("<div>");
      	newDiv.addClass("somethingGif");

      	var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
     	newDiv.append(newRating);

     	var img = $("<img>");
     	 img.attr("src", dataArray[i].images.fixed_height_still.url);
      	 img.attr("data-still", dataArray[i].images.fixed_height_still.url);
     	 img.attr("data-animate", dataArray[i].images.fixed_height.url);
     	 img.attr("data-state", "still");
     	 newDiv.append(img);

      
      $(".row3").append(newDiv);
    }

  });

}


function animateGifs() {
  
  var state = $(this).find("img").attr("data-state");

  if (state === "still") 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } 
  else 
  {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }

}

$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".somethingButton", fetchSomethingGifs);

$(document).on("click", ".somethingGif", animateGifs);