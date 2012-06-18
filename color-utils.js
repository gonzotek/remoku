///////////////////////////
//http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-jquery-javascript
function padZeroes(number, length)
{
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    Logger.log(hash)
    return hash;
} 

function intToRGB(i){
    return (padZeroes(((i>>16)&0xFF).toString(16), 2) + 
           padZeroes(((i>>8)&0xFF).toString(16), 2)+ 
           padZeroes((i&0xFF).toString(16), 2)
           );
}

function stringToColor(s)
{
    return '#' + intToRGB(hashCode(s));
}

/////////////////////


//http://www.glasspants.com/?p=220
function RGBColor (color) {
	//Param is a hex string of color info
	//Common hex prefixes of '0x' and '#'
	//is accepted.
 
	//Properties
	this.color = color;
 
	//Methods
	this.getColor = function(){
		/*Return original color string*/
 
		return this.color;
	};  
 
	this.getDecimalVals = function(){
		/*Returns an object with red, green, and blue
		properties in decimal value*/
 
		var color = this.color;
 
		var rgb;
		var colorObj;
 
		//Replace hex prefixes if present
		color = color.replace("0x", "");
		color = color.replace("#", "");
 
		//Easier to visualize bitshifts in hex
		rgb = parseInt(color, 16);
 
		//Extract rgb info
		colorObj = new Object();
		colorObj.r = (rgb & (255 << 16)) >> 16;
		colorObj.g = (rgb & (255 << 8)) >> 8;
		colorObj.b = (rgb & 255); 
 
		return colorObj;   	
	};
};




// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/* http://sedition.com/perl/javascript-fy.html */
function fisherYates ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

// http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx#122
// var textColor = Brightness( rgbToHex(colorDec.r, colorDec.g, colorDec.b) ) < 130 ? '#FFFFFF' : '#000000';
function Brightness(color) {
if(color.length==7){color=color.substring(1);}
var R =	parseInt(color.substring(0,2),16);
var G =	parseInt(color.substring(2,4),16);
var B =	parseInt(color.substring(4,6),16);
return Math.sqrt(R * R * .241 + G * G * .691 + B * B * .068);
}
  
// http://stackoverflow.com/questions/1664140/js-function-to-calculate-complementary-colour
function HueShift(h,s) { h+=s; while (h>=360.0) h-=360.0; while (h<0.0) h+=360.0; return h; }
function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function RGB2HSV(rgb) {
    hsv = new Object();
    max=max3(rgb.r,rgb.g,rgb.b);
    dif=max-min3(rgb.r,rgb.g,rgb.b);
    hsv.saturation=(max==0.0)?0:(100*dif/max);
    if (hsv.saturation==0) hsv.hue=0;
    else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
    else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
    else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
    if (hsv.hue<0.0) hsv.hue+=360.0;
    hsv.value=Math.round(max*100/255);
    hsv.hue=Math.round(hsv.hue);
    hsv.saturation=Math.round(hsv.saturation);
    return hsv;
}

function HSV2RGB(hsv) {
    var rgb=new Object();
    if (hsv.saturation==0) {
        rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
    } else {
        hsv.hue/=60;
        hsv.saturation/=100;
        hsv.value/=100;
        i=Math.floor(hsv.hue);
        f=hsv.hue-i;
        p=hsv.value*(1-hsv.saturation);
        q=hsv.value*(1-hsv.saturation*f);
        t=hsv.value*(1-hsv.saturation*(1-f));
        switch(i) {
        case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
        case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
        case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
        case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
        case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
        default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
        }
        rgb.r=Math.round(rgb.r*255);
        rgb.g=Math.round(rgb.g*255);
        rgb.b=Math.round(rgb.b*255);
    }
    return rgb;
}