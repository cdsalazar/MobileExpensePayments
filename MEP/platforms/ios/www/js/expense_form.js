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
    
    function extractAllImage(urls){
        return urls.split(";");
    }
    
    function Cancel(){
        console.log('here');
        window.location = 'main.html';
    }
    
    function Submit(){
        navigator.notification.confirm("Confirm submission.", Cancel, "Submit");
    }
    
    pic_urls = findGetParameter('pic_url');
    image_list = extractAllImage(pic_urls);
    image_list.forEach(function (item){
                       var image = document.createElement("img");
                       image.src = item;
                       document.querySelector('#myImage').appendChild(image)
                       });

    // Setup back and submit button
    document.querySelector('#cancel').addEventListener('touchend', Cancel);
    document.querySelector('#submit').addEventListener('touchend', Submit);
    //Use from Library
    
    function onSuccess(imageData) {
        console.log(imageData);
        var new_url = pic_urls + ';' + imageData;
        console.log(new_url);
        window.location = 'expensionForm.html?pic_url=' + new_url;
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
    document.querySelector("#choosepic").addEventListener("touchend", function() {
                                                          console.log('click');
                                                          navigator.camera.getPicture(onSuccess, onFail, {
                                                                                      quality: 50,
                                                                                      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                                                                      destinationType: Camera.DestinationType.FILE_URI});
                                                          });
    
}


