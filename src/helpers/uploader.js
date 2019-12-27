// CLOUDINARY
const {
	REACT_APP_UNSIGNED_UPLOAD_PRESET: UNSIGNED_UPLOAD_PRESET,
	REACT_APP_CLOUDINARY_UPLOAD_URL: CLOUDINARY_UPLOAD_URL,
} = process.env;


// *********** Handle selected files ******************** //
function uploadFile(
	file,
	{
		onProgress,
		onDone,
		onError,
	} = {}
) {

	function xhrComplete(ev) {

		// Check the request is complete
		if (ev.target.readyState == 4) {
			if (parseInt(ev.target.status) == 200) {
				// Unpack the response (from JSON)
				const response = JSON.parse(ev.target.responseText);
	
				if (onDone) {
					onDone(response);
				}
			} else {
				if (onError) {
					onError(JSON.parse(ev.target.responseText));
				}
			}
		}
		
	}


	// Build the form data to post to the server
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", UNSIGNED_UPLOAD_PRESET);


	// Make the request
	const xhr = new XMLHttpRequest();

	if (onProgress) {
		xhr.upload.addEventListener("progress", onProgress);
	}
	xhr.addEventListener("readystatechange", xhrComplete);
	if (onError) {
		xhr.addEventListener("error", onError);
	}

	xhr.open("POST", CLOUDINARY_UPLOAD_URL, true);
	xhr.send(formData);
}


export default uploadFile;