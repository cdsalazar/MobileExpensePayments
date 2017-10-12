document.addEventListener("deviceready", init, false);
function init() {
    
    function onSuccess(imageData) {
        console.log(imageData);
        window.location = 'expensionForm.html?pic_url=' + imageData
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
    //Use from Camera
    document.querySelector("#takepic").addEventListener("touchend", function() {
            navigator.camera.getPicture(onSuccess, onFail, {
                                        quality: 50,
                                        sourceType: Camera.PictureSourceType.CAMERA,
                                        destinationType: Camera.DestinationType.FILE_URI});
                                                            });
    
    //Use from Library
    document.querySelector("#choosepic").addEventListener("touchend", function() {
           navigator.camera.getPicture(onSuccess, onFail, {
                                       quality: 50,
                                       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                       destinationType: Camera.DestinationType.FILE_URI});
   });
    
}
