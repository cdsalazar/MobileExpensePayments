document.addEventListener("deviceready", init, false);
console.log('ready to login')
function init() {
    document.querySelector("#Login").addEventListener("touchend", function() {
                window.location = "main.html";
      });

}

