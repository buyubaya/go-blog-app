import crypto from "crypto";
import uuidV4 from "uuid/v4";


// IMAGEKIT
const IMAGEKIT_UPLOAD_URL = "https://api.imagekit.io/v1/files/upload";
const IMAGEKIT_PUBLIC_KEY = "public_cGYYrOe9e3UFeVmhsL8SezE4o7o=";
const IMAGEKIT_PRIVATE_KEY = "private_kIUXREU82TFzlPC+DI82JNMV4E8=";


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
					onError(ev);
				}
			}
		}
		
	}


	// Build the form data to post to the server
	const token = uuidV4();
	const expire = parseInt(Date.now()/1000)+2400;
	const signature = crypto.createHmac("sha1", IMAGEKIT_PRIVATE_KEY).update(token+expire).digest("hex");
	const formData = new FormData();
	formData.append("file", file);
	formData.append("fileName", `${token}.${(file.name || "").split(".").pop()}`);
	formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
	formData.append("signature", signature);
	formData.append("expire", expire);
	formData.append("token", token);


	// Make the request
	const xhr = new XMLHttpRequest();

	if (onProgress) {
		xhr.upload.addEventListener("progress", onProgress);
	}
	xhr.addEventListener("readystatechange", xhrComplete);
	if (onError) {
		xhr.addEventListener("error", onError);
	}

	xhr.open("POST", IMAGEKIT_UPLOAD_URL, true);
	xhr.send(formData);
}


export default uploadFile;