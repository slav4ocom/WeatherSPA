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
    ReadTextFile("http://192.168.0.107:8080/showdata/sofia,bg",
        function (text) {
            data = JSON.parse(text);
            console.log(data.weather[0].icon);
            container.innerHTML = "<img src=" + data.weather[0].icon + ".png>" + cityName;
        });

}


function SetCityData(cityName) {
    var data;
    ReadTextFile("http://192.168.0.107:8080/showdata/" + cityName + ",bg",
        function (text) {
            data = JSON.parse(text);
            //console.log(data.main.temp);
            var icon = data.weather[0].icon;
            var city = document.getElementById(cityName);
            var image = city.getElementsByTagName('img')[0];
            var temp = city.getElementsByTagName('div')[0];
            temp.innerHTML = Math.round(data.main.temp);
            //console.log(temp);
            image.setAttribute('src', 'nice_icons/' + icon + '.png');
        }
    );

}

function SetCitiesData() {
    const cities = ['sofia', 'plovdiv', 'varna', 'bourgas', 'rousse', 'pleven', 'tarnovo'];
    var timeout = 0;
    cities.forEach(element => {
        setTimeout(SetCityData, timeout += 100, element);
    });
}

setInterval(SetCitiesData, 1 * 60 * 1000);