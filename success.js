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

 

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia(constraints);
	video.srcObject = stream;
	
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
});