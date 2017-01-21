define(function(require) {
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.fillstyle = "rbg(255,255,0)";
    context.fillRect(100, 100, 20, 20);
    console.log("hi");
});
