document.addEventListener("deviceready", init, false);
console.log('expense form')
function init() {
    
    function findGetParameter(parameterName) {
        var result = null,
        tmp = [];
        location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
                 tmp = item.split("=");
                 if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
                 });
        return result;
    }
    pic_url = findGetParameter('pic_url')
    print(pic_url)
    var image = document.getElementById('myImage');
    image.src = pic_url;
}


