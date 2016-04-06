// ------- attempting APIs without the use of jquery -----------
// modified the searchWiki function from:
// http://stackoverflow.com/questions/19892179/search-a-mediawiki
function searchWiki(site, search, callback, opts) {
    if(typeof callback == 'object') {
        opts = callback;
        callback = null;
    } else {
        opts = opts || {};
    }
    // Build the required URLs
    var siteUrl = (opts.ssl ? 'https' : 'http') + '://' + site;
    var apiUrl = siteUrl + (opts.apiBase || '/w/') + 'api.php';
    var queryUrl = apiUrl + '?action=query&list=search&srsearch=' + encodeURIComponent(search) + '&srlimit=' + (opts.maxResults || 1) + '&format=json';
	  //alert('Going to query the following URL: ' + queryUrl);
	
	  // i'm not sure what this here does, or why make it into an array...
    var fnName = '_cb_' + Math.floor(Math.random() * 4294967296);
    window[fnName] = function(data) {
        //console.log(data.query); //log all the returned results
        
      // Get all returned pages
        var titles = [], links = [], descriptions = [];
        for (var i = 0; i < data.query.search.length; i++) {
            var title = data.query.search[i].title, link = siteUrl + (opts.wikiBase || '/wiki/') + encodeURIComponent(title);
            var description = data.query.search[i].snippet;
            titles.push(title);
            links.push(link);
            descriptions.push(description);
			  //log the returned titles and links
			  //console.log(title);
			  //console.log(link);
        }
        if (!opts.maxResults) {
            // Single result requested
            if (data.query.search.length == 0) {
                titles = links = null;
            } else {
                titles = titles[0];
                links = links[0];
            }
        }
        // Call the callback
        (callback || opts.success || function(){})(titles, links, descriptions);
    }
    // Issue the JSONP request
    // this is also necessary, though I'm not sure why it's being done this way...
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', queryUrl + '&callback=' + fnName);
    document.head.appendChild(scriptTag);
}


function successFunction(title, link, description) {
  // get the div you want to populate
  var div = document.getElementById('addPanels');
  
  // if a search was done before, clear the content
  if (div.innerHTML!=="") {
    div.innerHTML = "";
  }
  
  for (i = 0; i<title.length; i++) {
    // create two nested divs and give them the correct classes
    var parent_div = document.createElement('div');
    var child_div = document.createElement('div');
    parent_div.className = "panel panel-default";
    child_div.className = "panel-body";
    
    // nest them
    div.appendChild(parent_div);
    parent_div.appendChild(child_div);   
    
    // insert the text
    var text_title = '<a href="' + link[i] + '"' + ' target="_blank"><span class=text-title>' + title[i] + '</span></a><br>';
    var text_description = '<p class="text-description">' + description[i] + '</p>'
    child_div.innerHTML = text_title + text_description;
    

    
  }
  
}


// either the user clicks on the button after typing, or types enter

// the user pushes enter
function searchWikiEnter(e) {
	if (e.keyCode===13 && document.getElementById('searchBox').value!=="") {
		// store in variable
		var search_words = document.getElementById('searchBox').value;
		//console.log('The search word(s): ' + search_words); // for debugging
    
    // search for the search_words
    searchWiki('en.wikipedia.org', search_words, {
      maxResults: 8,
      ssl: true,
      success: successFunction
    });
    
	}
}

// the user clicks the button
function searchWikiClick(){
	if (document.getElementById('searchBox').value!=="") {
		var search_words = document.getElementById('searchBox').value;
		//console.log('The search word(s): ' + search_words); // for debugging
    
    if (search_words!=="") {
          // search for the search_words
     searchWiki('en.wikipedia.org', search_words, {
        maxResults: 8,
        ssl: true,
        success: successFunction
    });
    }
	}
};