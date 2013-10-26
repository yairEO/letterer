function letterer(element){
	var letter, letterElm, parent, len, wordElm, letters, nodeValue, 
		supportsTrim = String.prototype.trim;
		
	// look for the term in the cleanest fastest way (that I could come up with)
	(function recursiveSearch(element){
		// if its a text-node, and its not empty 
		if( element.nodeType == 3 ){  // trim() can be removed (not supported in IE)
			if( supportsTrim ? element.nodeValue.trim() : element.nodeValue ){
				letters = element.nodeValue.split('').reverse();
				wordElm = document.createElement('word');
				element.nodeValue = '';
				// do this for every letter in this text-node
				while( letter = letters.pop() ){
					parent = element.parentNode;
					
					letterElm = document.createElement('letter');
					letterElm.className = 'initial'; // add a class for transition purposes 
					letterElm.innerHTML = letter;
					
					// check for a space
					if( letter == ' ' ){
						parent.insertBefore( wordElm, element );
						wordElm = document.createElement('word');
						parent.insertBefore( letterElm, element );
					}
					else
						wordElm.insertBefore(letterElm, null);
				}
				parent.insertBefore( wordElm, element );
			}
		}
		else
			for( var j=element.childNodes.length; j--; )
				recursiveSearch(element.childNodes[j]);
	})(element);
};