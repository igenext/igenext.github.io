let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

const constraints = {
	video: {
	  width: {
		min: 1280,
		ideal: 1920,
		max: 2560,
	  },
	  height: {
		min: 720,
		ideal: 1080,
		max: 1440,
	  },
	  facingMode: "environment"
	},
  }

  let image_data_url;
 var resp;
  var blobData;

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia(constraints);
	video.srcObject = stream;
	
});

click_button.addEventListener('click', function() {
	canvas.width = window.innerWidth;     
	canvas.height = window.innerHeight;
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
	blobData = createBlob(image_data_url);
	console.log(blobData)
});

function createBlob(dataURL) {
	var BASE64_MARKER = ';base64,';
	if (dataURL.indexOf(BASE64_MARKER) == -1) {
	  var parts = dataURL.split(',');
	  var contentType = parts[0].split(':')[1];
	  var raw = decodeURIComponent(parts[1]);
	  return new Blob([raw], { type: contentType });
	}
	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(':')[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;
  
	var uInt8Array = new Uint8Array(rawLength);
  
	for (var i = 0; i < rawLength; ++i) {
	  uInt8Array[i] = raw.charCodeAt(i);
	}
  
	return new Blob([uInt8Array], { type: contentType });
  }



$(document).ready(function() {
	$("#submit").click(function(e) {
	  e.preventDefault();
	  $.ajax({
		url : "https://tarp.cognitiveservices.azure.com/vision/v3.2/describe?maxCandidates=1&language=en&model-version=latest",
		beforeSend : function(xhrObj) {
		  xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
		  xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "7795ca497058453e8d189b31b8e96e3c");
		},
		type : "POST",
		data : blobData,
		processData : false
	}).done(function(response){
		resp = response;
		alert(resp['description']['tags'])
	});
	});
	});