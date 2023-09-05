// Image vectorization output

let capture;
let tracedSVG = null;

function setup() {
	createCanvas(640, 480);
	capture = createCapture(VIDEO);
	capture.size(640, 480);
	capture.hide();
}

function draw() {
	background(255);

	// Display the webcam feed
	image(capture, 0, 0, width, height);

	// Check if the 'C' key is pressed
	if (keyIsPressed && (key === 'c' || key === 'C')) {
		// Capture the current frame from the video feed as an image data URL
		const currentFrameDataUrl = capture.canvas.toDataURL('image/jpeg');
		const currentFrameImage = new Image();
		currentFrameImage.src = currentFrameDataUrl;

		// Convert the captured frame to an SVG using ImageTracer
		traceImage(currentFrameImage);
	}

	// Display the traced SVG if it exists
	if (tracedSVG) {
		displaySVG(tracedSVG);
	}
}

function traceImage(inputImage) {
	// Use imagetracerjs functions to trace the image and process the SVG data
	ImageTracer.imageToSVG(
		inputImage.src,
		function (svgstr) { tracedSVG = svgstr; },
		'posterized2'
	);
}

function displaySVG(svgData) {
	// Display the traced SVG data in an HTML container (e.g., with id 'svgcontainer')
	document.getElementById('svgcontainer').innerHTML = svgData;
}

// You can add a function to save the SVG when needed
function keyPressed() {
	if (key === 's' || key === 'S') {
		// Get the traced SVG data
		const svgData = document.getElementById('svgcontainer').innerHTML;
		const blob = new Blob([svgData], { type: 'image/svg+xml' });
		const url = URL.createObjectURL(blob);

		// Create an anchor element for downloading and click to download
		const a = document.createElement('a');
		a.href = url;
		a.download = 'traced_image.svg';
		a.click();

		// Clean up by revoking the object URL
		URL.revokeObjectURL(url);
	}
}
