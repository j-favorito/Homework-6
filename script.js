$(document).ready(function () {
    let displayBox = $("#displayBox");
    let searchBox = $("#searchBox");
    let cityHistory = [];

    function cityDisplay() {
        event.preventDefault();
        displayBox.empty();
        var city = $(this).attr("data-name")
        let apiKey = "2581276e35dac7feffd988cd42741110";
        let cityName = $("#citySearchBox").val().trim();
        let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
        let j = 4;
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function (response) {
            let cityElement = $("<h3>");
            let tempElement = $("<p>");
            let humidElement = $("<p>");
            let windElement = $("<p>");
            let uvElement = $("<p>");
            let longitude = response.coord.lon;
            let latitude = response.coord.lat;
            let iconElement = $("<img>");
            iconElement.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            cityElement.text(city);
            tempElement.text("Temperature: " + response.main.temp);
            humidElement.text("Humidity: " + response.main.humidity + "%");
            windElement.text("Wind Speed: " + response.wind.speed + " MPH");
            let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;
            console.log(uvURL);
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                let uvColor=response.value;
                if(uvColor>0 && uvColor<2){
                    uvElement.addClass("low");
                }
                else if(uvColor>2 && uvColor<5){
                    uvElement.addClass("moderate");
                }
                else if(uvColor>5 && uvColor<7){
                    uvElement.addClass("high");
                }
                else if(uvColor>7 && uvColor<10){
                    uvElement.addClass("veryHigh");
                }
                else{
                    uvElement.addClass("risk");
                }
                uvElement.text("UV Index: " + uvColor);
                console.log(response);
            })
            displayBox.append(cityElement, iconElement, tempElement, humidElement, windElement, uvElement);
            console.log(response);
        })
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            let forecastBox = $("<div>");
            let forecastHeader=$("<h5>");
            let rowElement = $("<div>");
            forecastHeader.text("Your 5 day forecast");
            rowElement.attr("class", "row")
            console.log(response);
            for (let i = 0; i < 5; i++) {
                let colElement = $("<div>");
                colElement.attr("class", "col-sm-2 foreCol");
                let dateElement = $("<h5>");
                dateElement.text(moment().add(i + 1, 'days').format('l'));
                let iconElement = $("<img>");
                iconElement.attr("src", "http://openweathermap.org/img/w/" + response.list[j].weather[0].icon + ".png")
                let tempElement = $("<p>");
                tempElement.text("Temp: " + response.list[j].main.temp)
                let humidElement = $("<p>");
                humidElement.text("Humidity: " + response.list[j].main.humidity + "%");
                colElement.append(dateElement, iconElement, tempElement, humidElement);
                rowElement.append(colElement);
                j += 8;
                console.log(j);
            }
            forecastBox.append(rowElement);
            displayBox.append(forecastHeader,forecastBox);
        });
    }
    function cityBtns() {
        $(searchBox).empty();
        for (let i = 0; i < cityHistory.length; i++) {
            let cityPage = $("<p>");
            cityPage.addClass("city row");
            cityPage.attr("data-name", cityHistory[i]);
            cityPage.text(cityHistory[i]);
            $(searchBox).append(cityPage);
        }
    }
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        displayBox.empty();
        let apiKey = "2581276e35dac7feffd988cd42741110";
        let cityName = $("#citySearchBox").val().trim();
        let currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
        let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
        let j = 4;
        cityHistory.push(cityName);
        cityBtns();
        $.ajax({
            url: currentURL,
            method: "GET"
        }).then(function (response) {
            let cityElement = $("<h3>");
            let tempElement = $("<p>");
            let humidElement = $("<p>");
            let windElement = $("<p>");
            let uvElement = $("<p>");
            let longitude = response.coord.lon;
            let latitude = response.coord.lat;
            let iconElement = $("<img>");
            iconElement.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            cityElement.text(cityName);
            tempElement.text("Temperature: " + response.main.temp);
            humidElement.text("Humidity: " + response.main.humidity + "%");
            windElement.text("Wind Speed: " + response.wind.speed + " MPH");
            let uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;
            console.log(uvURL);
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                let uvColor=response.value;
                if(uvColor>0 && uvColor<2){
                    uvElement.addClass("low");
                }
                else if(uvColor>2 && uvColor<5){
                    uvElement.addClass("moderate");
                }
                else if(uvColor>5 && uvColor<7){
                    uvElement.addClass("high");
                }
                else if(uvColor>7 && uvColor<10){
                    uvElement.addClass("veryHigh");
                }
                else{
                    uvElement.addClass("risk");
                }
                uvElement.text("UV Index: " + uvColor)
                console.log(response);
            })
            displayBox.append(cityElement, iconElement, tempElement, humidElement, windElement, uvElement);
            console.log(response);
        })
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            let forecastHeader=$("<h5>");
            let forecastBox = $("<div>");
            let rowElement = $("<div>");
            forecastHeader.text("Your 5 day forecast");
            rowElement.attr("class", "row")
            console.log(response);
            for (let i = 0; i < 5; i++) {
                let colElement = $("<div>");
                colElement.attr("class", "col-sm-2 foreCol");
                let dateElement = $("<h5>");
                dateElement.text(moment().add(i + 1, 'days').format('l'));
                let iconElement = $("<img>");
                iconElement.attr("src", "http://openweathermap.org/img/w/" + response.list[j].weather[0].icon + ".png")
                let tempElement = $("<p>");
                tempElement.text("Temp: " + response.list[j].main.temp)
                let humidElement = $("<p>");
                humidElement.text("Humidity: " + response.list[j].main.humidity + "%");
                colElement.append(dateElement, iconElement, tempElement, humidElement);
                rowElement.append(colElement);
                j += 8;
                console.log(j);
            }
            forecastBox.append(rowElement);
            displayBox.append(forecastHeader,forecastBox);
        });
    });

    $(document).on("click", ".city", cityDisplay);


});
