function letterate(element, transitionClass){
	var letter, letterElm, parent, len, wordElm,
		supportsTrim = String.prototype.trim;
		
	// look for the term in the cleanest fastest way (that I could come up with)
	(function recursiveSearch(element){
		// if its a text-node, and its not empty 
		if( element.nodeType == 3 ){  // trim() can be removed (not supported in IE)
			len = supportsTrim ? element.nodeValue.trim().length : element.nodeValue.length;

			if( len ){	
				wordElm = document.createElement('word');
				// do this for every letter in this text-node
				while( len-- >= 0 ){
					parent = element.parentNode;
					letter = element.nodeValue.substr(0, 1);
					
					letterElm = document.createElement('mark');
					letterElm.className = 'initial'; // add a class for transition purposes 
					letterElm.innerHTML = letter;
					
					// check for a space
					if( letter == ' ' ){
						parent.insertBefore( wordElm, element );
						wordElm = document.createElement('word');
						parent.insertBefore( letterElm, element );
					}
					else
						wordElm.appendChild(letterElm);
					
					// after the letter was removed, replace the value with the rest of the text
					element.nodeValue = element.nodeValue.substr(1);
				}
				parent.insertBefore( wordElm, element );
			}
		}
		else
			for( var j=element.childNodes.length; j--; )
				recursiveSearch(element.childNodes[j]);
	})(element);
};