document.addEventListener("deviceready", init, false);
console.log('expense form')
function init() {
    
    function findGetParameter(parameterName) {
        var result = '',
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
    
    pic_urls = findGetParameter('pic_url');
    all_transactions = findGetParameter('transaction');
    
    function extractAllImage(urls){
        return urls.split(";");
    }
    
    function Cancel(){
        console.log('here');
        window.location = 'main.html';
    }
    
    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    
    function Proceed(){
        result = guidGenerator();
        window.location = 'main.html?transaction=' + all_transactions + ';' + result;
    }
    
    function Submit(){
        navigator.notification.confirm("Confirm submission.", Proceed, "Submit");
    }
    
    
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


