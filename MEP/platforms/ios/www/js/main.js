document.addEventListener("deviceready", init, false);
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
    
    submitted_transaction = findGetParameter('transaction');
    
    function onSuccess(imageData) {
        console.log(imageData);
        window.location = 'expensionForm.html?pic_url=' + imageData + '&transaction=' + submitted_transaction;
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    
    
    
    function getAllTxns(transactions){
        return transactions.split(';')
    }
    
    
    
    
    if (submitted_transaction != ''){
        txn_list = getAllTxns(submitted_transaction)
        txn_list.forEach(function(item){
            if(item != ''){
                txn = document.createElement('div');
                txn.innerHTML = item + ' has been submitted.';
                document.querySelector("#recent").appendChild(txn)
             }
        });
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
