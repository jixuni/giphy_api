$(document).ready(function(){
    var apiKey = "&api_key=CSVLtD5yUhGbAN3xPW6Wg98pg17Flcqo";
    
    
    //var searchParam = $("#searchTerm").val();
    var searchTerm = ["apple", "banana", "kiwi", "pineapple", "blueberry", "orange"];

    // sets the initial buttons for the page
    function initialButton(){
        for(var i = 0; i < searchTerm.length; i++){
            $('<button>', {
                text: searchTerm[i], 
                id: 'btn_' + i,
                value: searchTerm[i],
              }).prependTo("body");  
        }
    }
    initialButton();
    // function for ajax call to the giphy api
    function giphyApi() {

        //Had this code below which cause a minor bug where it require 2 clicks for the function
        //$("button").on("click", function(){


            var currentAnswer = $(this).val();
            var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + currentAnswer + apiKey + "&limit=10";
            
            
            console.log(currentAnswer);
            console.log(queryUrl);

            $.ajax({
                url: queryUrl,
                method: "GET",
            }).then(function(response){
                var searchData = response.data;
                //console.log(searchData);
                //console.log(response);
                for(var i = 0; i < searchData.length; i++){
                    
                    var htmlDiv = $("<div>");
                    
                    var gifs = $("<img>", {
                        src: searchData[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-animate": searchData[i].images.fixed_height.url,
                        "data-still": searchData[i].images.fixed_height_still.url,
                        class: "gifs",
                    });

                    var ratings = $("<p>");

                    ratings.text("Rating: " + searchData[i].rating);

                    //gifs.attr({"src": searchData[i].images.fixed_height.url});

                    htmlDiv.append(ratings);

                    htmlDiv.append(gifs);

                    $(".gifHere").prepend(htmlDiv);
                }
                $("p").css("font-weight", "bold");
            })
        //})
    }

    $("#addButton").on("click", function(event){
        event.preventDefault();
       var inputVal = $("#searchTerm").val();
       searchTerm.push(inputVal);
        console.log(inputVal);
        console.log(searchTerm);
       $("<button>", {
           text: inputVal,
           id: "btn_" + inputVal,
           value: inputVal,
       }).prependTo("body");
    })

      function pausePlay(){
        var state = $(this).attr("data-state");
        console.log(state);
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".gifs", pausePlay);
    $(document).on("click", "button", giphyApi);


});
    

 