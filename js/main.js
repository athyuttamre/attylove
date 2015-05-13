var accessToken = "28a98d3d73262fc82c14c0072e984e4a28e7c7b5";
var loveButton = document.getElementById("send-love");
var core;

spark.on("login", function(err, body) {
  if(err) {
    console.error(err);
  } else {
    console.log("Logged in to Spark!");

    // Get devices, find the core
    spark.listDevices(function(err, body) {
      if(err) {
        console.error(err);
      } else {
        core = body[0];
        console.log(core);
        loveButton.disabled = false;
      }
    });
  }
});

spark.login({accessToken: accessToken});

function sendLove() {
  console.log("Sending love!");
  core.callFunction("love", null, function(err, body) {
    if(err) {
      consol.error(err);
    } else {
      console.log("Love received!");
    }
  });
}