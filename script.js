$(document).ready(function () {

    var currUrl = window.location.pathname;
    var currFilename = currUrl.substring(currUrl.lastIndexOf('/') + 1);
    if (currFilename === "search-results.html") {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var srchTerm = urlParams.get('q');
        $('#enter-search').val(srchTerm);
        var srchFmt = urlParams.get('format')
        if (srchFmt != "") {
            $('.dropdown-toggle').html(srchFmt);
            $('.dropdown-toggle').attr('fmt', srchFmt);
        } 
        if (srchTerm == null) {
            location.replace("./index.html")

        } 
        $('#search-term').html(srchTerm);
        $('#results').empty();
        getResults();
    }

    $('#goBack').on('click', function () {
        location.replace("./index.html");
    });

    $('.dropdown-menu').on('click', 'a', function () {
        var text = $(this).html();
        var fmt = $(this).attr('format');
        var htmlText = text;
        $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);
        $(this).closest('.dropdown').find('.dropdown-toggle').attr('fmt', fmt);
        //srchFmt = fmt;
        //srchTerm = $('#enter-search').val();
    });


    $('#search').on('click', function () {
        srchTerm = $('#enter-search').val();
        srchFmt = $('#dropdownMenuButton').attr('fmt') || "";
        if (currFilename === "index.html") {
            if (srchTerm != "") {
                location.replace("./search-results.html?q=" + srchTerm + "&format=" + srchFmt);
            } else { alert("Please enter a search criteria at minimum") }
        } else {
            $('#results').empty();
            getResults();
        }
    });


    function getResults() {
        //console.log(srchTerm);
        if (srchFmt != "") {
            var requestUrlMain = "https://www.loc.gov/" + srchFmt + "/?q=" + srchTerm + "&fo=json";
        } else {
            var requestUrlMain = "https://www.loc.gov/search" + "?q=" + srchTerm + "&fo=json";
        }
        //console.log(requestUrlMain);
        fetch(requestUrlMain)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                var searchResults = data.results;
                //console.log(searchResults);
                $.each(searchResults, function (i, val) {
                    var titleEl = this.title;
                    var urlEl = this.url;
                    //console.log(titleEl +" "+urlEl);
                    var cardSearch = $('<div>');
                    cardSearch.addClass('card text-blue border my-4');
                    cardSearch.attr('id', "searchCards");
                    var cardSearchBody = $('<div>');
                    cardSearchBody.addClass('card-body');
                    var cardSearchTitle = $('<h3>');
                    cardSearchTitle.text("Title: " + titleEl);
                    var cardSearchUrl = $('<p>');
                    cardSearchUrl.text("Url: " + urlEl);
                    var urlButton = $('<a>');
                    urlButton.addClass('btn btn-info');
                    urlButton.text("Visit Url");
                    urlButton.attr('href', urlEl);
                    cardSearchBody.append(cardSearchTitle);
                    cardSearchBody.append(cardSearchUrl);
                    cardSearchBody.append(urlButton);
                    cardSearch.append(cardSearchBody);
                    $('#results').append(cardSearch);
                });
            })
    }


});