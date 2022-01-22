
function ReadTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.timeout = 0;
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send();
}


function SetCityData(cityName) {
    var data;
    ReadTextFile("http://192.168.0.107:8080/showdata/" + cityName + ",bg",
        function (text) {
            data = JSON.parse(text);
            
            var icon = data.weather[0].icon;
            var city = document.getElementById(cityName);
            var image = city.getElementsByTagName('img')[0];
            var temp = city.getElementsByTagName('div')[0];
            temp.innerHTML = Math.round(data.main.temp);
            image.setAttribute('src', 'icons/' + icon + '.png');
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

SetCitiesData();
setInterval(SetCitiesData, 1 * 60 * 1000);