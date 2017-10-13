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
            return (((1+Math.random())*0x10000)|0).toString(10).substring(1);
        };
        return (S4() + "-" + S4() + S4());
    }
    
    function Proceed(index){
        if(index == 1){
            result = guidGenerator();
            window.location = 'main.html?transaction=' + all_transactions + ';' + result;
        }
    }
    
    function Submit(){
        navigator.notification.confirm("Confirm submission.", Proceed, "Submit");
    }
    
    
    var itemx = ['Samsung HD TV 32 inches', 'Samsung HD TV 36 inches', 'Samsung HD TV 78 inches',
                 'Samsung HD TV 50 inches', '3-Button USB Wired Mouse (Black)', '3-Outlet Surge Protector with 2 USB Ports', 'Ventilated Adjustable Laptop Stand', 'Air Ticket'];
    var totalprice = 0;
    Number.prototype.formatMoney = function(c, d, t){
        var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    
    function generateItems(){
        item_index = Math.floor(Math.random() * itemx.length);
        target = itemx[item_index];
        price = Math.floor(Math.random() * 3000);
        totalprice = totalprice + price;
        row = document.createElement("div");
        row.className = "divTableRow";
        
        ename = document.createElement("div");
        ename.className = "divTableCell";
        ename.innerHTML = target;
        edate = document.createElement("div");
        edate.className = "divTableCell";
        edate.innerHTML = "10/13/2017";
        eprice = document.createElement("div");
        eprice.className = "divTableCell";
        eprice.innerHTML = "$ " + price.formatMoney(2);
        row.appendChild(ename);
        row.appendChild(edate);
        row.appendChild(eprice);
        return row;
    }
    
    
    image_list = extractAllImage(pic_urls);
    image_list.forEach(function (item){
                       var image = document.createElement("img");
                       image.src = item;
                       image.className = "card";
                       document.querySelector("#myImage").appendChild(image);
                       document.querySelector("#main_body").appendChild(generateItems());
                       document.querySelector("#total_amount").innerHTML = "$ " + totalprice.formatMoney(2);
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


