function letterer(element){
	if( !document.createTreeWalker ) return false;
	
	var letter, letterElm, parent, wordElm, letters, walker, node, 
		supportsTrim = String.prototype.trim;
		
	walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

	while( node = walker.nextNode() ){
	   if( node.nodeType == 3 ){
			if( supportsTrim ? node.nodeValue.trim() : node.nodeValue ){
				letters = node.nodeValue.split('').reverse();
				wordElm = document.createElement('word');
				node.nodeValue = '';
				parent = node.parentNode;		
				// do this for every letter in this text-node
				while( letter = letters.pop() ){
					letterElm = document.createElement('letter');
					letterElm.className = 'initial'; // add a class for transition purposes 
					letterElm.innerHTML = letter;
					
					// check for a space
					if( letter == ' ' ){
						parent.insertBefore( wordElm, node );
						wordElm = document.createElement('word');
						parent.insertBefore( letterElm, node );
					}
					else
						wordElm.appendChild(letterElm);
				}
				parent.insertBefore( wordElm, node );
			}
		}
	}
}