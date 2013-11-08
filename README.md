LETTERER
=============
Breaks HTML into individual characters, and words, without messing up the semantic structure

**1.3 KB** - uncompressed

# [Demo page](http://codepen.io/vsync/pen/fkmrc)

## Basic use example:
```html
<!-- ...previous page content... -->
<div id='test'>
	<h1>Will break this into letters and words</h1>
	<p>some text with a <a href='#'>link</a> in it</p>
</div>
<script>
    letterer( document.getElementById('test') );
</script>
```

## The above will then turn into this HTML:
```html
<div id='test'>
	<h1><word><letter>W</letter><letter>i</letter><letter>l</letter><letter>l</letter></word><letter> </letter><word><letter>b</letter><letter>r</letter><letter>e</letter><letter>a</letter><letter>k</letter></word><letter> </letter><word><letter>t</letter><letter>h</letter><letter>i</letter><letter>s</letter></word><letter> </letter><word><letter>i</letter><letter>n</letter><letter>t</letter><letter>o</letter></word><letter> </letter><word><letter>l</letter><letter>e</letter><letter>t</letter><letter>t</letter><letter>e</letter><letter>r</letter><letter>s</letter></word><letter> </letter><word><letter>a</letter><letter>n</letter><letter>d</letter></word><letter> </letter><word><letter>w</letter><letter>o</letter><letter>r</letter><letter>d</letter><letter>s</letter><letter></letter></word></h1>
	<p><word><letter>s</letter><letter>o</letter><letter>m</letter><letter>e</letter></word><letter> </letter><word><letter>t</letter><letter>e</letter><letter>x</letter><letter>t</letter></word><letter> </letter><word><letter>w</letter><letter>i</letter><letter>t</letter><letter>h</letter></word><letter> </letter><word><letter>a</letter></word><letter> </letter><word></word><a href="#"><word><letter>l</letter><letter>i</letter><letter>n</letter><letter>k</letter><letter></letter></word></a><word></word><letter> </letter><word><letter>i</letter><letter>n</letter></word><letter> </letter><word><letter>i</letter><letter>t</letter></word></p>
</div>
```

The script recursively runs over the initial DOM node's children and breaks everything down. It's pretty lightweight and does not require any 3rd party library.
Note that a class is added to each letter in the break down process, so later it could be removed so cool CSS3 transition effects could be done. (much better to remove a class then to add one).

After things have been broken down, you can pretty much just go over all the letters with a timer and a loop and remove their added class, like so:

	var letters, i, totalLetters
		delay = 0,
		delayJump = 30;

	// get all "letter" elements
	letters = lettersContainer.getElementsByTagName('letter');
	totalLetters = letters.length;

	for( i=0; i < totalLetters; i++ ){
		doTimer(letters[i], delay);
		delay += delayJump;
		// if the letter is a "comma" then do a little pause, for some delay.
		if( letters[i].innerHTML == ',' )
			delay += delayJump * 6;
	}

	function doTimer(letter, delay){
		setTimeout(function(){ 
			letter.removeAttribute('class');
		}, delay);
	}
