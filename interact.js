// ------- attempting APIs without the use of jquery -----------



// endpoint for api
var api_endpoint = "https://en.wikipedia.org/w/api.php" 

// either the user clicks on the button after typing, or types enter

// the user pushes enter
function searchWikiEnter(e) {
	if (e.keyCode===13 && document.getElementById('searchBox').value!=="") {
		// store in variable
		var search_words = document.getElementById('searchBox').value;
		console.log('The search word(s): ' + search_words); // for debugging

		// initialize http request
		var xhr = new XMLHttpRequest(); 
		var api_endpoint = "https://en.wikipedia.org/w/api.php"; 
		
	}
}

// the user clicks the button
function searchWikiClick(){
	if (document.getElementById('searchBox').value!=="") {
		var search_words = document.getElementById('searchBox').value;
		console.log('The search word(s): ' + search_words); // for debugging
	}
};