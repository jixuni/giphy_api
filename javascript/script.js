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
              }).prependTo(".container");  
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
                console.log(searchData);
                console.log(response);
                
                for(var i = 0; i < searchData.length; i++){
                    
                    var htmlDiv = $("<div>");
                    //var parentDownload = $("<a>", {
                       // href: searchData[i].images.fixed_height.url,
                    //});
                    var download = $("<button>",{
                        text: "download",
                        class: "downloadGif",
                        //onclick: "downloadResource()",
                        href: searchData[i].images.fixed_height.url,
                    });
                    var favorite = $("<button>",{
                        text: "favorite",
                        class: "favoriteBtn",
                        value: searchData[i].title,
                        disable: false,
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
    
    function fav (){
        var classes = $(this).val();
        var stopBtn = $(this).attr("disable");
        console.log(stopBtn);
        
        if (stopBtn === false){
            favGifs.push(classes);
            //$(this).attr("disable", true);
            
        } 
        console.log(favGifs);
        
    }
    $(document).on("click", ".favoriteBtn", fav);

    // function forceDownload(blob, filename) {
    //     var a = document.createElement('a');
    //     a.download = filename;
    //     a.href = blob;
    //     $(".downloadGif").append(a);
    //   }
      
    //   // Current blob size limit is around 500MB for browsers
    //   function downloadResource(url, filename) {
    //     if (!filename) filename = url.split('\\').pop().split('/').pop();
    //     fetch(url, {
    //         headers: new Headers({
    //           'Origin': location.origin
    //         }),
    //         mode: 'cors'
    //       })
    //       .then(response => response.blob())
    //       .then(blob => {
    //         let blobUrl = window.URL.createObjectURL(blob);
    //         forceDownload(blobUrl, filename);
    //       })
    //       .catch(e => console.error(e));
    //   }
      


    //   downloadResource('https://media2.giphy.com/media/l4JyX0UySGvX3SdJ6/200.gif');





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
           class: "giphyCall"
       }).prependTo(".container");
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

    $(document).on("click", "img", pausePlay);
    $(document).on("click", ".giphyCall", giphyApi);


});
    

 