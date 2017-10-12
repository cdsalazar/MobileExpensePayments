document.addEventListener("deviceready", init, false);
console.log('duak')
function init() {
    console.log('test log.')
    
    function onSuccess(imageData) {
        console.log('success');
        var image = document.getElementById('myImage');
        image.src = imageData;
        console.log(imageData);
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    console.log('test log2')
    //Use from Camera
    document.querySelector("#takePicture").addEventListener("touchend", function() {
                                                            console.log('clicked!')
                                                            navigator.camera.getPicture(onSuccess, onFail, {
                                                                            quality: 50,
                                                                            sourceType: Camera.PictureSourceType.CAMERA,
                                                                            destinationType: Camera.DestinationType.FILE_URI
                                                                                        });
                                                            
                                                            });
    
    //Use from Library
    document.querySelector("#usePicture").addEventListener("touchend", function() {
                                                           navigator.camera.getPicture(onSuccess, onFail, {
                                                                                       quality: 50,
                                                                                       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                                                                       destinationType: Camera.DestinationType.FILE_URI
                                                                                       });
                                                           });
    
}
