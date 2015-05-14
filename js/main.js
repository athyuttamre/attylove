var accessToken = "28a98d3d73262fc82c14c0072e984e4a28e7c7b5";
var overlayText = $("#overlay-message")
var loveButton = $("#send-love");
var loveStatus = $("#love-status");
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

        // Test if you can make calls to the core
        core.callFunction("test", null, function(err, data) {
          if (err) {
            console.error('Could not connect to core:', err);
            overlayText.addClass("failure")
            overlayText.text("Could not connect. Please refresh.");
          } else {
            console.log('Successfully connected to core:', data);
            overlayText.addClass("success");
            overlayText.text("Connected!");

            $(".overlay").fadeOut(2000);
          }
        });
      }
    });
  }
});

spark.login({accessToken: accessToken});

function sendLove() {
  console.log("Sending love...");
  loveStatus.removeClass("failure success")
  loveStatus.text("Sending love...");

  loveButton[0].disabled = true;

  core.callFunction("love", null, function(err, body) {
    if(err) {
      console.error(err);
      loveStatus.addClass("failure");
      loveStatus.text("Error sending love. Please try again.");
    } else {
      loveStatus.addClass("success");
      loveStatus.text("Love received! You're such a nice person.");
    }

    loveButton[0].disabled = false;
  });
}