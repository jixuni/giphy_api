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
                class: "giphyCall"
              }).prependTo(".topButtons");  
        }
    }
    initialButton();
    // function for ajax call to the giphy api
    function giphyApi() {

        //Had this code below which cause a minor bug where it require 2 clicks for the function
        //$("button").on("click", function(){


            var currentAnswer = $(this).val();
            var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + currentAnswer + apiKey + "&limit=10";
            
            
            //console.log(currentAnswer);
            //console.log(queryUrl);

            $.ajax({
                url: queryUrl,
                method: "GET",
            }).then(function(response){
                var searchData = response.data;
                //console.log(searchData);
                //console.log(response);
                
                for(var i = 0; i < searchData.length; i++){
                    
                    var htmlDiv = $("<div>");
                    //var parentDownload = $("<a>", {
                       // href: searchData[i].images.fixed_height.url,
                    //});
                    var download = $("<button>",{
                        text: "download",
                        class: "downloadGif",
                        value: searchData[i].images.fixed_height.url,
                        onclick: downloadResource("https://media0.giphy.com/media/OmQ9fnEshXtOU/200.gif"),
                    });
                    var favorite = $("<button>",{
                        text: "favorite",
                        class: "favoriteBtn",
                        value: searchData[i].title,
                        disable: "on",
                    })
                    var gifs = $("<img>", {
                        src: searchData[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-animate": searchData[i].images.fixed_height.url,
                        "data-still": searchData[i].images.fixed_height_still.url,
                        class: "download",
                    });


                    var ratings = $("<p>");
                    var lineBreak = $("<br>");
                    ratings.html(searchData[i].title + "<br>"+  "Rating: " + searchData[i].rating);
                    
                    //gifs.attr({"src": searchData[i].images.fixed_height.url});
                    //parentDownload.append(download);
                    $(".gifHere").prepend(htmlDiv);
                    htmlDiv.prepend(ratings);
                    htmlDiv.append(gifs);
                    htmlDiv.append(lineBreak);
                    htmlDiv.append(download);
                    htmlDiv.append(favorite);
                    
                    //htmlDiv.append(parentDownload);
                    
                }
                $("p").css("font-weight", "bold");
            })
            
        //})
    }

    var favGifs = [];
    // function for favorite turns the button yellow 
    function fav (){
        var classes = $(this).val();
        //console.log(classes);
        var stopBtn = $(this).attr("disable");
        //console.log(stopBtn);
        
        if (stopBtn === "on"){
            favGifs.push(classes);
            $(this).attr("disable", "off"); 
            $(this).css("background-color", "yellow");
            $(this).css("color", "black");
            console.log(favGifs)
        } else {
            // use the splice method to remove the specific string in array
            favGifs.splice(favGifs.indexOf(classes),1);
            $(this).attr("disable", "on")
            $(this).css("background-color", "black");
            $(this).css("color", "white");
            console.log(favGifs)
        }
        
    }

    //console.log(favGifs);
    $(document).on("click", ".favoriteBtn", fav);




    // function below works for force download, but the function only allows for https. 
    // Something to do with cross orgin download browser will not let me download from json object.
   /*  function forceDownload(blob, filename) {
        var a = document.createElement('a');
        a.download = filename;
        a.href = blob;
        $(".downloadGif").click();
      }
      
      // Current blob size limit is around 500MB for browsers
      function downloadResource(url, filename) {
        if (!filename) filename = url.split('\\').pop().split('/').pop();
        fetch(url, {
            headers: new Headers({
              'Origin': location.origin
            }),
            mode: 'cors'
          })
          .then(response => response.blob())
          .then(blob => {
            let blobUrl = window.URL.createObjectURL(blob);
            forceDownload(blobUrl, filename);
          })
          .catch(e => console.error(e));
      }
      
      
    
     */    

     

     




      // function for append new buttons to the DOM along with add attr to the button at the same time.
    $("#addButton").on("click", function(event){
        event.preventDefault();
       var inputVal = $("#searchTerm").val();
       searchTerm.push(inputVal);
        //console.log(inputVal);
        //console.log(searchTerm);
       $("<button>", {
           text: inputVal,
           id: "btn_" + inputVal,
           value: inputVal,
           class: "giphyCall"
       }).prependTo(".topButtons");
    })
    // pause play function for gifs, replace the gif with img
      function pausePlay(){
        var state = $(this).attr("data-state");
        //console.log(state);
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", "img", pausePlay);
    $(document).on("click", ".giphyCall", giphyApi);


});
    

 