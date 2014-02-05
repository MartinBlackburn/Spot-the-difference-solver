// setup video
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var overlayCanvas = document.getElementById("overlay");
var overlayContext = overlayCanvas.getContext("2d");
var video = document.getElementById("video");
var videoSource;

var leftImage; // left half of the camera
var rightImage; // right half of the camera

var overlayImage;
var speedDelay = 50;

setInterval(function() {
	solve();
}, speedDelay);





//start the camera
start();
function start()
{
	if (!!window.stream) {
		videoElement.src = null;
		window.stream.stop();
	}
	
	var constraints = {'video': true};
    
    navigator.getUserMedia(constraints, playVideo, errorCallback);
}





// play video
function playVideo(stream) {
	video.src = window.URL.createObjectURL(stream);
	video.play();
}





// output video error
function errorCallback(error) {
	console.log("navigator.getUserMedia error: ", error);
}





// solve it
function solve()
{
	//draw video to canvas
	context.drawImage(video, 0, 0, 640, 480);
    
    // get left/right of video
	leftImage = context.getImageData(50, 50, 270, 380);
    leftData = leftImage.data;
	rightImage = context.getImageData(320, 50, 270, 380);
    rightData = rightImage.data;
    
    overlayImage = context.createImageData(270, 380);
    
    // compare left to right image data
    for (var i = 0, len = leftData.length; i < len; i += 4)
    {
    	// get colours
        var colour1 = [leftData[i], leftData[i + 1], leftData[i + 2]];
        var colour2 = [rightData[i], rightData[i + 1], rightData[i + 2]];
        
        //get difference
        var diff = colourDifference(colour1, colour2);
        
        if(diff > 75) {
        	diff = 255;
        } else {
        	diff = 0;
        }

        // write difference to new overlay image
        overlayImage.data[i] = 0;
        overlayImage.data[i + 1] = 255;
        overlayImage.data[i + 2] = 0;
        overlayImage.data[i + 3] = diff;
    }
    
    // draw overlay
    overlayContext.putImageData(overlayImage, 50, 50);
    
    // draw outline
    overlayContext.strokeRect(50, 50, 540, 380);
}





// get difference between two colours
function colourDifference(colour1, colour2)
{
    // convert to percentange differece
    var difference = Math.sqrt(Math.pow(colour1[0] - colour2[0], 2) + Math.pow(colour1[1] - colour2[1], 2) + Math.pow(colour1[2] - colour2[2], 2));
    var percentDifference = difference / Math.sqrt(Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2));
    
    // return difference
    return Math.floor(percentDifference * 255);
}