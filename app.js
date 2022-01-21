const apiKey = "12ab99a374msh86888c209888997p1c34b3jsn3c4215e0734c";

function ReadTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    //rawFile.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    //rawFile.setRequestHeader("X-RapidAPI-Key", apiKey);
    //rawFile.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    //rawFile.setRequestHeader("Cache-Control", "no-cache");
    rawFile.timeout = 0;
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send();
}


function FillTextContainer(textData) {
    var container = document.getElementById('tex-container');
    container.innerHTML = textData;
}


function ShowResponse(cityName, containerName) {
    //var container = document.getElementById('containerName');
    var container = document.getElementById('varna');
    var data;
    //ReadTextFile("http://localhost:17424/weatherforecast",
    ReadTextFile("http://192.168.0.107:8080/weather",
        function (text) {
            data = JSON.parse(text);
            console.log(data.weather[0].icon);
            container.innerHTML = "<img src=" + data.weather[0].icon + ".png>" + cityName;
        });

}

function SetCityImage(cityName, imageName) {
    var city = document.getElementById(cityName);
    var image = city.getElementsByTagName('img')[0];
    image.setAttribute('src', imageName);
    //console.log(image);
}

function SetCityData() {
    SetCityImage('sofia', '01n.png');
    SetCityImage('plovdiv', '01n.png');
    SetCityImage('varna', '01n.png');
    SetCityImage('burgas', '01n.png');
    SetCityImage('ruse', '01n.png');
    SetCityImage('pleven', '01n.png');
    SetCityImage('tarnovo', '01n.png');
}