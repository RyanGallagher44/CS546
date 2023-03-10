(function ($) {
    window.onload = function() {
        $('#homeLink').hide();
        $('#show').hide();

        var requestConfig = {
            method: 'GET',
            url: 'http://api.tvmaze.com/shows'
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            responseMessage.forEach((show) => {
                $('#showList').append(`<li><a class="show-link" href="${show._links.self.href}">${show.name}</a></li>`);
            });
        });

        $('#showList').show();
    };

    $('#searchForm').submit(function (event) {
        event.preventDefault();

        if ($('#search_term').val().trim().length === 0) {
            $('#error-p').show();
            return false;
        } else {
            $('#error-p').hide();
        }

        $('#showList').empty();
        $('#showList').hide();
        $('#show').hide();
        
        var requestConfig = {
            method: 'GET',
            url: `http://api.tvmaze.com/search/shows?q=${$('#search_term').val()})`
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            if (responseMessage.length === 0) {
                $('#shows-not-found').show();
            } else {
                $('#shows-not-found').hide();
                responseMessage.forEach((show) => {
                    $('#showList').append(`<li><a class="show-link" href="${show.show._links.self.href}">${show.show.name}</a></li>`);
                });
            }
        });

        $('#homeLink').show();
        $('#showList').show();
    });

    $(document).on('click', '.show-link', function(event) {
        event.preventDefault();

        $('#error-p').hide();
        $('#shows-not-found').hide();
        $('#showList').hide();
        $('#show').empty();

        var requestConfig = {
            method: 'GET',
            url: this.href
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            var showName = responseMessage.name;
            var imageSrc = responseMessage.image;
            var lang = responseMessage.language;
            var genres = responseMessage.genres;
            var rating = responseMessage.rating.average;
            var network = responseMessage.network
            var summary = responseMessage.summary;


            $('#show').append(`<h1>${showName}</h1>`);

            if (!imageSrc) {
                $('#show').append(`<img alt="show-image" src="/public/no_image.jpeg"/>`)
            } else {
                $('#show').append(`<img alt="show-image" src="${imageSrc.medium}"/>`)
            }

            $('#show').append(`<dl id="d-list"></dl>`);

            $('#d-list').append('<dt>Language</dt>');

            if (!lang) {
                $('#d-list').append('<dd>N/A</dd>');
            } else {
                $('#d-list').append(`<dd>${lang}</dd>`);
            }

            $('#d-list').append('<dt>Genres</dt>');
            $('#d-list').append('<dd><ul id="genres-list"></ul></dd>');

            if (genres.length > 0) {
                genres.forEach((genre) => {
                    $('#genres-list').append(`<li>${genre}</li>`);
                });
            } else {
                $('#genres-list').append('<li>N/A</li>');
            }
            
            $('#d-list').append('<dt>Average Rating</dt>');
            
            if (!rating) {
                $('#d-list').append('<dd>N/A</dd>');
            } else {
                $('#d-list').append(`<dd>${rating}</dd>`);
            }

            $('#d-list').append('<dt>Network</dt>');
            
            if (!network) {
                $('#d-list').append('<dd>N/A</dd>');
            } else {
                $('#d-list').append(`<dd>${network.name}</dd>`);
            }

            $('#d-list').append('<dt>Summary</dt>');
            
            if (!summary) {
                $('#d-list').append('<dd>N/A</dd>');
            } else { 
                $('#d-list').append(`<dd>${summary}</dd>`);
            }

            $('#show').show();
            $('#homeLink').show();
        });

    });
})(window.jQuery);