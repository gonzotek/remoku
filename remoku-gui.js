//REMOKU
//A. Cassidy Napoli
//Copyright 2012 
//License: NEW BSD
//July 30, 2012 03:22:57 PM 
////////////////////////
//BEGIN HELPER FUNCTIONS

function $(o){return document.getElementById(o);}

function hmsToSecondsOnly(str){
//HH:MM:SS to seconds
    var p = str.split(':'),
        s =0, m =1;
    while(p.length >0){
        s += m * parseInt(p.pop(),10);
        m *=60;
    }
    return s;
}


// addSelectOption
//
// Add the single select option to the selection list with the id specified
//
function addSelectOption(selectId, value, display) {
 if (display === null) {
  display = value;
 }
    var anOption = document.createElement('option');
    anOption.value = value;
    anOption.innerHTML = display;
    $(selectId).appendChild(anOption);
    return anOption;
}

// removeSelectOption
//
// Remove the option with the specified value from the list of options
// in the selection list with the id specified
//
function removeSelectOption(selectId, display) {
 var i;
 var select = $(selectId);
 var kids = select.childNodes; 
 var numkids = kids.length; 
 for (i = 0; i < numkids; i++) {
		if (kids[i].innerHTML == display) {
			select.removeChild(kids[i]);
			break;
     }
    }
}


function changeBackgroundColor(theSelector, parameter){
	[].every.call( document.styleSheets, function ( sheet ) {
		  rules = sheet.rules || sheet.cssRules || [];
	    return [].every.call( rules, function ( rule ) {
	        if ( rule.selectorText === theSelector ) {
	            rule.style.backgroundColor = parameter;
	            return false;
	        }
	        return true;
	    });
	});	
}

function changeTextColor(theSelector, parameter){
	[].every.call( document.styleSheets, function ( sheet ) {
		  rules = sheet.rules || sheet.cssRules || [];
	    return [].every.call( rules, function ( rule ) {
	        if ( rule.selectorText === theSelector ) {
	            rule.style.color = parameter;
	            return false;
	        }
	        return true;
	    });
	});	
}

//Array.unique polyfill
if (!Array.unique) {
	Array.prototype.unique = function() {
	var o = {}, i, l = this.length, r = [];
	for(i=0; i<l;i+=1){ o[this[i]] = this[i];}
	    for(i in o){r.push(o[i]);}
	    return r;
	};
}


//Object.keys polyfill
Object.keys=Object.keys||function(o,k,r){r=[];for(k in o)r.hasOwnProperty.call(o,k)&&r.push(k);return r;};

//Return an array of the ancestors of an element
function parents(node) {
  var nodes = [];
  for (; node; node = node.parentNode) {
    nodes.unshift(node);
  }
  return nodes;
}

function addresstoVarName(address){
	var splitaddress = address.split(".");
	var joinedaddress = splitaddress.join("_");
	return "$" + joinedaddress;
}

function varNametoAddress(varName){
	varName = varName.slice(1);
	var splitName = varName.split("_");
	var joinedName = splitName.join(".");
	return joinedName;
	}


function isBadBrowser(){
	//Blacklisted browsers claim to support localStorage, but don't follow spec
	
	//Fluid claims to support localStorage, but clears it when app is quit
	if (navigator.userAgent.indexOf('FluidApp')!=-1) return true;
	
	//Older browsers might not have localStorage support
	if (!localStorage.getItem) return true;
	
	//otherwise localStorage will be used
	return false;
}

function is_touch_device() {  
	if ("ontouchstart" in document.documentElement){
		return true;
	} else {
		return false;
	}		
//   try {  
//     document.createEvent("TouchEvent");  
//     return true;  
//   } catch (e) {  
//     return false;  
//   }  
}

function getConfig(name){
	if (useCookies){
		return readCookie(name);
	} else {
		return localStorage.getItem(name);
	}
}
	
function setConfig(name, value){
	if (useCookies){
		createCookie(name, value, 365);
	} else {
		localStorage.setItem(name, value);
	}

}

function createCookie(name,value,days) {
	var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function dbg(log){
	//if (typeof console!=undefined) console.log(log);
	//else alert (log);
	dbgOut.innerHTML += log + "<br><br>";	
}

function ver(channel, build){
	var slicescript = "window.external.addToFavoritesBar('http://remoku.tv/', 'Remoku', 'slice');";
	var webslice = '<a onclick="' + slicescript +'">Remoku</a> ' + channel + '<br>' + build;
	ver = $("ver");
	ver.innerHTML = webslice;	
}

//function: include(array, obj)

//include([1,2,3,4], 3); // true
//include([1,2,3,4], 6); // undefined
function include(arr,obj) {
    return (arr.indexOf(obj) != -1);
}


/* function name: getElementByClass
* purpose: gets all elements based off of a class
* input: String, String (optional)
* output: none
* http://www.actiononline.biz/web/code/how-to-getelementsbyclass-in-javascript-the-code/
*/
function getElementsByClass(theClass, classType)
{
	//pulls the elements based off of their tag
	//if one is not specified, it will pull everything
	var allHTMLTags=document.getElementsByTagName((classType?classType:'*'));

	//temp array that is going to grab our elements
	var returnerArray = new Array();

	//go through the main array of elements
	for (var i=0; i<allHTMLTags.length; i++)
	{
		//if the element is within the class we want
		//we will add it to our array
		if (allHTMLTags[i].className==theClass)
		{
		returnerArray.push(allHTMLTags[i]);
		}
	}

	//send the array back to the calling function
	return returnerArray;
}

function preventMove(event){
	if (window.innerHeight>450 && remoteScreen.getAttribute("class")=="visible")event.preventDefault();
}

function stopFindRokus() {
    if (window.stop) {
        window.stop();
    }
    else if (document.execCommand) {
        document.execCommand("Stop", false);
    }
    clearTimeout(timeouts);
    for (i = 1;i < 255; i++){
	    images[i] = new Image;
	    images[i].onload=null;
	    images[i].onerror=null;
	    images[i].src="";
	    }
}
function getHostFromUrl(url) {
/*
    url: http://192.168.1.3:8060/query/icon/11
    returns: 192.168.1.3
*/
    return url.split('/')[2].split(':')[0];
}

//END HELPER FUNCTIONS
//////////////////////



///////////////////////////
//BEGIN DISCOVERY FUNCTIONS

function updateSelect() {
	while (rokuSelect.length>0){
		rokuSelect.remove(rokuSelect.length -1);
	}
	remotesPopup.innerHTML="";
	lowerRemotesPopup.innerHTML="";
	var remoteUl = document.createElement("ul");
	remoteUl.id = "remotepopupul";
	var remoteLis = [];
	rokus  = scannedRokus.concat(manualRokus).unique();
	
	for (i=0;i<rokus.length;i++) {
		if(rokus[i]!==null){
			if(rokus.length==1){
				rokuAddress=rokus[i];
				setConfig('rokuAddress', rokuAddress);
			}
			var rokuSelected = rokuAddress==rokus[i] ? true : false;
			var thisRokuName =  namedRokus && namedRokus[rokus[i]] ? namedRokus[rokus[i]] : rokus[i];
			rokuSelect.options[i] = new Option(thisRokuName, rokus[i], rokuSelected, rokuSelected);
			remoteLis[i] = document.createElement("li");
			remoteLis[i].innerHTML = namedRokus && namedRokus[rokus[i]] ? namedRokus[rokus[i]] : rokus[i];
			if(rokuSelected)remoteLis[i].setAttribute("class","selected");
			remoteLis[i].id="remote"+ [i];
			remoteLis[i].onclick = function(){
				remotesPopup.setAttribute("class","hidden");
				lowerRemotesPopup.setAttribute("class","hidden");
				var rokuId = (this.id).substring(6);
				rokuAddress=rokus[rokuId];
				setConfig('rokuAddress', rokuAddress);	
				updateSelect();
				rokuName.value = namedRokus[rokuAddress] ? namedRokus[rokuAddress] : "";
				nameLine.innerHTML = rokuName.value ? rokuName.value : rokuAddress;
			};	
			remoteUl.appendChild(remoteLis[i]);
		}
	}
	if(rokuSelect.length>0){
		controlContainer.setAttribute("class","visible");
	} else {
		controlContainer.setAttribute("class","hidden");
	}
	remotesPopup.appendChild(remoteUl);
	lowerRemotesPopup.appendChild(remoteUl);
	if(rokuAddress===undefined || rokuAddress==="")rokuAddress=rokus[0];
	fav1Value = getConfig('fav1') ? getConfig('fav1') : '12' ; 
	favImg1 = $("favimg1");
	if(favImg1)favImg1.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav1Value);
		
	fav2Value = getConfig('fav2');
	favImg2 = $("favimg2");
	fav2Value = getConfig('fav2') ? getConfig('fav2') : '28' ; 
	if(favImg2)favImg2.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav2Value);

	fav3Value = getConfig('fav3');
	favImg3 = $("favimg3");
	fav3Value = getConfig('fav3') ? getConfig('fav3') : '2016' ; 
	if(favImg3)favImg3.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav3Value);
}

function addRoku(){
	manualRokus.push(manualInput.value);
	manualRokus = manualRokus.unique();
	setConfig('manualRokus', manualRokus.join(","));
	buildManualRokusMenu();
	updateSelect();
	return false;
}

function removeRoku(){
	try{
		var removedRoku = manualSelect[manualSelect.selectedIndex].value;
	}
	catch(err){
		//dbg(err);
	}
	//dbg(removedRoku);
	for (i = 0; i<manualRokus.length;i++){
		if(removedRoku==manualRokus[i])manualRokus.splice(i,1);
		}
	manualRokus = manualRokus.unique();
	setConfig('manualRokus', manualRokus.join(","));
	buildManualRokusMenu();
	updateSelect();
	return false;
}

function buildManualRokusMenu(){
	while (manualSelect.length>0){
		manualSelect.remove(manualSelect.length - 1);
	}
	manualRokus = manualRokus.unique();
	for (i = 0; i<manualRokus.length; i++){
		var rokuSelected = rokuAddress==manualRokus[i] ? true : false;
		//alert(manualRokus[i]);
		manualSelect.options[i] = new Option(manualRokus[i], manualRokus[i], rokuSelected);
	}
	if (manualRokus.length>0) manualSelect.disabled = false;
	else manualSelect.disabled = true;
}

function doNameRoku(evt){
	if(!evt)evt = window.event;
	if (evt.keyCode == 13){
		nameRoku();
		return true;
	} else {
		return false;
	}
}


function nameRoku(){
	var curRokuName = rokuName.value;
	namedRokus[rokuAddress] = rokuName.value;
	setConfig("namedRokus", JSON.stringify(namedRokus));
	updateSelect();
}

function loadedImage() {
	var URL = this.src;
	scannedRokus.push(getHostFromUrl(URL));
	ipCount++;
	//dbg("ipCount: " + ipCount);
	if(scannedRokus.length<=rokuCount){
		if(ipPos<255){
			ipPos++;
			images[ipPos].src = URLS[ipPos];
			timeouts = setTimeout('cancelImage('+ ipPos +');', 500);	
		}
		setConfig('scannedRokus', scannedRokus.join(","));
		scanResults.innerHTML = "Scanning " + (254-ipCount) +  " addresses. " + scannedRokus.length + " Rokus found.";
		updateSelect();
	}
	if (scannedRokus.length>=rokuCount || ipCount>=254 || ipPos>=254) {
		scanButton.innerHTML="Scan";
		ipCount=0;
		ipPos = 0;
		scanning = false;
		scanResults.setAttribute("class","hidden");
		stopFindRokus();
		clearTimeout(timeouts);
		}
}

function imageError(){
	ipCount++;
	scanResults.innerHTML = "Scanning " + (254-ipCount) +  " addresses. " + scannedRokus.length + " Rokus found.";
	//dbg("ipCount: " + ipCount);
	if(ipCount>=254){
		scanButton.innerHTML="Scan";
		scanning = false;
		ipCount = 0;
		ipPos = 0;
		
		clearTimeout(timeouts);
		stopFindRokus();
		if (scannedRokus.length<1)scanResults.innerHTML = "No Rokus Found. Check your network settings.";
		if (scannedRokus.length<1)dbg("No Rokus Found. Check your network settings.");
	} else if(ipPos<255) {
		ipPos++;
		images[ipPos].src = URLS[ipPos];
		timeouts = setTimeout('cancelImage('+ ipPos +');', 500);	
	}
}

function cancelImage(i) {
	//dbg('cancelImage:'+i);
	images[i].onload=null;
	images[i].onerror=null;
	//images[i].src=null;
//	imageError();
	ipCount++;
	ipPos++;
	//dbg('ipPos:'+ipPos);
	scanResults.innerHTML = "Scanning " + (254-ipCount) +  " addresses. " + scannedRokus.length + " Rokus found.";
	if(ipCount>=254){
		scanButton.innerHTML="Scan";
		scanning = false;
		ipCount = 0;
		ipPos = 0;
		
		clearTimeout(timeouts);
		stopFindRokus();
		if (scannedRokus.length<1)scanResults.innerHTML = "No Rokus Found. Check your network settings.";
		if (scannedRokus.length<1)dbg("No Rokus Found. Check your network settings.");
	}else {
		//dbg(URLS[ipPos]);
		if(scanning)images[ipPos].src=URLS[ipPos];
		if(scanning)timeouts = setTimeout('cancelImage('+ ipPos +');', 500);
	}
}	
	
	
function findRokus() {
	if(!scanning){
		scannedRokus = new Array;
		setRokuCount();
		this.innerHTML="Stop";
		scanResults.setAttribute("class", "visible");
		scanResults.innerHTML = "Scanning " + (254-ipCount) +  " addresses. " + scannedRokus.length + " Rokus found.";
		scanning = true;
		for (i = 1; i < 255; i++) {
			images[i-1] = new Image();
			URLS[i-1] = "http://" + myNetwork + "." + i + ":8060/query/icon/11";
			images[i-1].id = "ip-" + i;
			images[i-1].onload = loadedImage;
			images[i-1].onerror = imageError;
			
		}
		ipPos = 0;
		images[ipPos].src = URLS[ipPos];
		timeouts = setTimeout('cancelImage('+ ipPos +');', 500);
	}
	else{
		scanning = false;
		this.innerHTML="Scan";
		scanResults.setAttribute("class", "hidden");
		ipPos = 255;
		ipCount = 0;
		stopFindRokus();
		setConfig('scannedRokus',scannedRokus.join(","));
		updateSelect();
	}
}

function setMyNetwork() {
	myNetwork = [octet1.value,octet2.value,octet3.value].join(".");
	setConfig('myNetwork', myNetwork);
}

function setRokuCount() {
	rokuCount = numField.value;
	setConfig('rokuCount', rokuCount);
}

function setRokuAddress(){
	this.options[this.selectedIndex].setAttribute("class","selected");
	rokuAddress = this.options[this.selectedIndex].value;
	setConfig('rokuAddress', rokuAddress);
	rokuName.value = namedRokus[rokuAddress] ? namedRokus[rokuAddress] : "";
	nameLine.innerHTML = rokuName.value ? rokuName.value : rokuAddress;
	updateSelect();
}

function firstSetup(){
	for(i=0;i<screenArray.length;i++){
		screenArray[i].setAttribute("class", "hidden");
		}
	firstSetupScreen.setAttribute("class", "visible");
	configScreen.setAttribute("class", "visible");
	//var setup = confirm("It looks like you haven't used Remoku before. Would you like to begin by scanning for Rokus?");
	//if(setup){
	//	rokuCount = prompt ("Ok, how many Rokus do you own?", "1");
	//	myAddress = prompt ("Thanks, last question. What is the network base address. If you're not sure, try the suggested network", "192.168.1");
	//	alert  ("Great, now press ok and your network will be scanned for Rokus.");
	//	numField.value = rokuCount;
	//	findRokus();
 	//}
}

//END DISCOVERY FUNCTIONS
/////////////////////////

////////////////////
//BEGIN ROKU SPECIFIC CODE


/* function name: rokupost
*  purpose: send a post request to a roku via a hidden form
*  input: String, String
*  output: none
*/
function rokupost(action, param){
	var rokupost = $('rokupost');
	rokupost.setAttribute("action", "http://" + rokuAddress + ":8060/" + action + "/" + param);
	rokupost.submit();
	return false;
}

//macros
// Rev Play Fwd InstantReplay Info Down Left Select Right Up Back Home

// Bit rate override screen: Home 5x, Rewind 3x, FastForward 2x
// Home,Home,Home,Home,Home,Rev,Rev,Rev,Fwd,Fwd

// Dump Core: Home 5x, Up, Rewind 2x
// Home,Home,Home,Home,Home,Up,Rev,Rev

// Channel Version Info: Home 3x, Up 2x, Left, Right, Left, Right, Left
// Home,Home,Home,Up,Up,Left,Right,Left,Right,Left

// Developer Settings Page: Home 3x, Up 2x, Right, Left, Right, Left, Right
// Home,Home,Home,Up,Up,Right,Left,Right,Left,Right

function sendSequence(cmds){
	if (cmds.length>0){
		rokupost("keypress", cmds.shift() );
		setTimeout(function(){
			sendSequence(cmds);
			}, 750);
	}
}

function sendCustomMacro(cmds){
	if(cmds.length>0){
		var command = cmds.shift();
		var cmdAction = Object.keys(command)[0];//need object.keys polyfill for ie7/ie8 support.  worth it?
		var cmdParam = command[cmdAction];
		switch(cmdAction){
			case 'wait':
				dbg ('wait: ' + cmdParam);
				//120m60s
				dbg('seconds: ' + hmsToSecondsOnly(cmdParam));
				dbg('millisecs: ' + hmsToSecondsOnly(cmdParam)*1000);
				setTimeout(function(){sendCustomMacro(cmds);},hmsToSecondsOnly(cmdParam)*1000);
			break;
			case 'text':
				cmdParam = rokuMacroText(cmdParam);
				if(cmdParam)cmds.unshift({text:cmdParam});
				setTimeout(function(){sendCustomMacro(cmds);},750);
			break;
			case 'repeat':
				var loops = cmdParam - 1;
				//cmds = JSON.parse("["+macroArea.value+"]");
				for (i=0;i<loops;i++){
					var tempcmds = JSON.parse("["+macroArea.value+"]");
					tempcmds.shift();
					cmds = cmds.concat(tempcmds);
				}
				setTimeout(function(){sendCustomMacro(cmds);},750);
			break;
			default:
				dbg('rokupost: ' + cmdAction + '/' + cmdParam);
				rokupost(cmdAction, cmdParam);
				//dbg('rokupost'+cmdAction+'/'+cmdParam);
				setTimeout(function(){sendCustomMacro(cmds);},750);
				break;
		}
	}
}

function rokuMacroText(cmdParam){
	var rokutext =  $('rokutext');
	var text = cmdParam;
//	dbg(text);
	if(text){
		var letter = text.slice(0,1);
		text = text.slice(1);
		//Handle the few characters Roku needs encoded beyond escape();
		if(letter=="/"){ 
//			dbg(letter);
			letter = "%2f";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else if(letter=="@"){ 
//			dbg(letter);
			letter = "%40";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else if(letter=="+"){ 
//			dbg(letter);
			letter = "%2b";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else {
//			dbg(letter);
//			dbg("  " + escape(letter));
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + encodeURIComponent(letter));
		}
		rokutext.submit();
		dbg (rokutext.getAttribute("action"));
		return text;
		}
	}	

//ECP APPS
function launchShoutCast(){
	var rokupost = $('rokupost');
	//params = launchKey.value + "=" + encodeURIComponent(launchValue.value);
	params = "name=" + escape(shoutCastNameInput.value) + "&url=" + escape(shoutCastUrlInput.value).split("/").join("%2F");
	rokupost.setAttribute("action", "http://" + rokuAddress + ":8060/launch/2115?" + params );
	rokupost.submit();
	return false;
	}


function launchRemokuWithParams(){
	var rokupost = $('rokupost');
	params = launchKey.value + "=" + encodeURIComponent(launchValue.value);
	rokupost.setAttribute("action", "http://" + rokuAddress + ":8060/launch/dev?" + params );
	rokupost.submit();
	return false;
	}

function rokulaunch(id){
	rokupost("launch",id);
	}


function rokuDeleteOrBlur(evt){
	if (!evt)evt = window.event;//IE doesn't pass events as parameters like other browsers
	if (evt.keyCode == 8){
		rokupost("keypress","Backspace");
	}
	else if (evt.keyCode == 27){
		this.blur();
	}
	else if(evt.keyCode==13){
		if ($("textentry").value===""){
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "Enter");
			rokutext.submit();
			this.blur();
		}
	}
}	

// function rokuDeleteorBlur(evt){
// 	if (!evt)evt = window.event;//IE doesn't pass events as parameters like other browsers
// 	if (evt.keyCode == 8){
// 		rokupost("keypress","Backspace");
// 	}
// 	else if (evt.keyCode == 27){
// 		this.blur();
// 	}
// 	else {
// 		rokuText();
// 	}
// }	


function delayNextQuery(){
	setTimeout('rokuText()',200);
	}
	
function rokuText(){
	var rokutext =  $('rokutext');
	var text = $("textentry").value;
//	dbg(text);
	if(text){
		var letter = text.slice(0,1);
		text = text.slice(1);
		//Handle the few characters Roku needs encoded beyond escape();
		if(letter=="/"){ 
//			dbg(letter);
			letter = "%2f";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else if(letter=="@"){ 
//			dbg(letter);
			letter = "%40";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else if(letter=="+"){ 
//			dbg(letter);
			letter = "%2b";
//			dbg("  " + letter);
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + letter);
		} else {
//			dbg(letter);
//			dbg("  " + escape(letter));
			rokutext.setAttribute("action", "http://" + rokuAddress + ":8060/" + "keypress" + "/" + "LIT_" + encodeURIComponent(letter));
		}
		rokutext.submit();
		$("textentry").value = text;
		}
	}	
	
function delayLoadIcons(){
	if(appidarray.length>0) var appid = appidarray.shift();
	if(appid)$("app"+appid).src = 'http://' + rokuAddress +':8060/query/icon/' + appid;	
	}


function loadRokuImages(){
	if (appidarray.length>0) setTimeout('delayLoadIcons()',50);
	}

		
function _rmAppsCB(apps){
	if(localStorage.setItem){
		localStorage.setItem(rokuAddress + '-apps', JSON.stringify(apps));
	}
	var list = "";
	var applist = $("applist");
    appidarray = new Array();
    for (i=0;i<apps.length;i++){
	    var li = document.createElement("li");
	    
	    var link = document.createElement("a");
	    link.setAttribute('href','#'+apps[i].id);
	    link.setAttribute('onclick','rokulaunch("' + apps[i].id + '")');
	    link.innerHTML = apps[i].name;
	    
	    var img = document.createElement("img");
	    img.setAttribute('onload','loadRokuImages()');
		img.setAttribute('class','icons');
		img.setAttribute('Id','app' + apps[i].id);
		
		appidarray.push( apps[i].id);
		
		link.appendChild(img);
		li.appendChild(link);
		applist.appendChild(li);
		//dbg (apps[i].name);
	}

// 	for (app in apps){
// 		var htmlitem = "<li><a href='#" + apps[app].id + "' onclick='rokulaunch(" + apps[app].id + ");'>" +
// 		"<img class='icons' id='app" + apps[app].id + "' onload='loadRokuImages()' > " + 
// 		apps[app].name + "</a></li>"; 
// 		list += htmlitem;
// 		appidarray.push( apps[app].id);
// 	}
	//applist.innerHTML = list;
	appid = appidarray.shift();
	if(appid!==null)$("app"+appid).src = 'http://' + rokuAddress +':8060/query/icon/' + appid;
		
}
	
function rokuApps(){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://"+ rokuAddress +":88/apps.js";
	document.body.appendChild(script);
}

function launchRemoku(){
	rokulaunch("dev");
	}

	
	
function getBuild(){
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				var response = xmlhttp.responseText;
				response = response.split("\n");
				var channel = response[2].substr(1);
				var build = "Build date: " + response[3].substr(1);
				ver(channel, build);
				}
			};
		xmlhttp.open("GET","cache.manifest",true);
		xmlhttp.send();
	}
}	
	
//END ROKU SPECIFIC CODE
////////////////////////

function wipeSettings(){
	setConfig("rokuAddress", "");
	setConfig("scannedRokus", "");
	setConfig("manualRokus", "");
	setConfig("rokuCount", "");
	setConfig("namedRokus", "");
	setConfig("bgColor", "");	
	setConfig("fgColor", "");
	setConfig("macros", "");
	setConfig("showFavs", "");
	setConfig("myNetwork","");
	setConfig("fav1","");
	setConfig("fav2","");
	setConfig("fav3","");
	//setConfig("apps", "");
	if (localStorage.clear) localStorage.clear();
}
//////////////
//GUI BINDINGS
function btnDown(){
	//dbg("mousedown");
	lastBtn = this.id;
	//add graphical feed back here
	rokupost("keydown",this.id);
}
function btnUp(){
	//dbg("mouseup");
	rokupost("keyup",lastBtn);
}
function btnTouchDown(){
	//dbg("touchstart");
	lastBtn = this.id;
	//add graphical feed back here
	rokupost("keydown",this.id);
}
function btnTouchUp(){
	//dbg("touchend");
	rokupost("keyup",lastBtn);
}
function rmousedownRemoteBtn(e){
	var activeBtn = this.id;
	if (activeBtn=="navremote"){
		var rightclick;
		e = e || window.event;
//		if (!e) var e = window.event;
		if (e.which) rightclick = (e.which == 3);
		else if (e.button) rightclick = (e.button == 2);
		//if(rightclick)showRemotes();
		//dbg('Rightclick: ' + rightclick); // true or false
		//return false;
	}
}

function activateButton(e){
	var activeBtn = this.id;
	firstSetupScreen.setAttribute("class", "hidden");
		for(i=0;i<navArray.length;i++){
			if (activeBtn == navArray[i].id){
				navArray[i].setAttribute("class", "nav active");
				screenArray[i].setAttribute("class", "visible");
			} else {
				screenArray[i].setAttribute("class", "hidden");
				navArray[i].setAttribute("class", "nav");
			}
		}
	setTimeout(hideURLbar, 100);
	//dbg("activatedButton");
	//return false;
}

function textModeOff(){keyboardMode=false;}
function textModeOn() {keyboardMode=true; }

function handleArrowKeyDown(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt && keyboardMode &&  firstDown) {
	    firstDown = false;
        switch (evt.keyCode) {
            case 37:
                //dbg("left");
                rokupost("keydown","Left");
                break;    
            case 38:
                //dbg("up");
                rokupost("keydown","Up");
                break;    
            case 39:
                //dbg("right");
                rokupost("keydown","Right");
                break;    
            case 40:
                //dbg("down");
                rokupost("keydown","Down");
                break;    
            case 13:
                //dbg("Enter");
                rokupost("keydown","Select");
                break;    
            case 36:
                //dbg("Home");
                rokupost("keydown","Home");
                break;    
            case 72:
                //dbg("Home");
                rokupost("keydown","Home");
                break;    
            case 82:
                //dbg("Return");
                rokupost("keydown","Back");
                break;    
            case 27:
                //dbg("Return");
                rokupost("keydown","Back");
                break;    
            case 90:
                //dbg("Replay");
                rokupost("keydown","InstantReplay");
                break;    
            case 73:
                //dbg("Info");
                rokupost("keydown","Info");
                break;    
            case 32:
                //dbg("Play");
                rokupost("keydown","Play");
                break;    
            case 188:
                //dbg("Rev");
                rokupost("keydown","Rev");
                break;    
            case 190:
                //dbg("Fwd");
                rokupost("keydown","Fwd");
                break;
            default:
            break;
         }
    }
}

function handleArrowKeyUp(evt) {
	firstDown = true;
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt && keyboardMode) {
        switch (evt.keyCode) {
            case 37:
                //dbg("left");
                rokupost("keyup","Left");
                break;    
            case 38:
                //dbg("up");
                rokupost("keyup","Up");
                break;    
            case 39:
                //dbg("right");
                rokupost("keyup","Right");
                break;    
            case 40:
                //dbg("down");
                rokupost("keyup","Down");
                break;    
            case 13:
                //dbg("Enter");
                rokupost("keyup","Select");
                break;    
            case 36:
                //dbg("Home");
                rokupost("keyup","Home");
                break;    
            case 72:
                //dbg("Home");
                rokupost("keyup","Home");
                break;    
            case 82:
                //dbg("Return");
                rokupost("keyup","Back");
                break;    
            case 27:
                //dbg("Return");
                rokupost("keyup","Back");
                break;    
            case 90:
                //dbg("Replay");
                rokupost("keyup","InstantReplay");
                break;    
            case 32:
                //dbg("Play");
                rokupost("keyup","Play");
                break;    
            case 188:
                //dbg("Rev");
                rokupost("keyup","Rev");
                break;    
            case 190:
                //dbg("Fwd");
                rokupost("keyup","Fwd");
                break;
            default:
            break;
         }
    }
}

function touchshowRemotes(){
	remotesPopupTimer = setTimeout("showRemotes()",500);
	//dbg("touch timer started");
	//return false;
}

function showRemotesAfterDelay(){
	remotesPopupTimer = setTimeout("showRemotes()",500);
	//return false;
	}
	
function showRemotes(){
	remotesPopup.setAttribute("class", "visible");
	lowerRemotesPopup.setAttribute("class", "visible");
	remotesPopupTimer = null;
}

		
function canceltouchshowRemotes(){
	if (remotesPopupTimer){
		clearTimeout(remotesPopupTimer);
		activeBtn = "navremote";
		for(i=0;i<navArray.length;i++){
			if (activeBtn == navArray[i].id){
				navArray[i].setAttribute("class", "nav active");
				screenArray[i].setAttribute("class", "visible");
			} else {
				screenArray[i].setAttribute("class", "hidden");
				navArray[i].setAttribute("class", "nav");
			}
		}
	setTimeout(hideURLbar, 100);
	//dbg("touchtimer canceled");
	} 
}
//END GUI BINDINGS
//////////////////

//////////////////////
//BEGIN INITIALIZATION

var controlContainer;
var rokuSelect;
var myNetwork;
var octet1;
var octet2;
var octet3;
var scanButton;
var removeButton;
var addButton;
var scanning = false;
var foundRokus = 0;
var rokuAddress;
var rokus = [];
var rokuCount;
var ipCount = 0;
var numField;
var manualInput;
var manualSelect;
var rokuName;
var namedRokus = {};

var scannedRokus = [];
var manualRokus = [];
var images = [];
var timeouts;
var URLS = [];
var ipPos;
var dbgOut;

var remoteButtons;
var rokupostframe = document.createElement("iframe");
var rokutextframe = document.createElement("iframe");
var rokuscanframe = document.createElement("iframe");
var rokupostform = document.createElement("form");
var rokutextform = document.createElement("form");

var trasmitText = "";

var appidarray = [];

var loadAppsButton;
var startAppsButton;
var scanForRokuButton;
var addRokuButton;
var scanResults;

var launchButton;
var launchValue;
var launchKey;

var shoutCastNameInput;
var shoutCastUrlInput;
var shoutCastLaunchButton;

var navRemote;
var navGoodies;
var navApps;
var navConfig;
var navAbout;
var navArray = new Array();

var remoteScreen;
var configScreen;
var goodiesScreen;
var appsScreen;
var aboutScreen;
var firstSetupScreen;
var screenArray = new Array(); 

var useCookies = false;
var keyboardMode;
var firstDown = true;

var remotesPopupTimer;
var remotesPopup;
var lowerRemotesPopup;
var clearTimer;
var longtouch;

var MacroInput;

var remote0;

var nameLine;

var bgcolorInput;
var fgElements = new Array();


// Check if a new cache is available on page load.
if(window.addEventListener){
window.addEventListener('load', function(e) {

  if(window.applicationCache){ 
	  
		// Fired after the first cache of the manifest.
		window.applicationCache.addEventListener('cached', function(){dbg('appCache: Cached');}, false);
		
		// Checking for an update. Always the first event fired in the sequence.
		window.applicationCache.addEventListener('checking', function(){dbg('appCache: Checking');}, false);
		
		// An update was found. The browser is fetching resources.
		window.applicationCache.addEventListener('downloading', function(){dbg('appCache: Downloading');}, false);
		
		// The manifest returns 404 or 410, the download failed,
		// or the manifest changed while the download was in progress.
		window.applicationCache.addEventListener('error', function(){dbg('appCache: Error');}, false);
		
		// Fired after the first download of the manifest.
		window.applicationCache.addEventListener('noupdate', function(){dbg('appCache: NoUpdate');}, false);
		
		// Fired if the manifest file returns a 404 or 410.
		// This results in the application cache being deleted.
		window.applicationCache.addEventListener('obsolete', function(){dbg('appCache: Obsolete');}, false);
		
		// Fired for each resource listed in the manifest as it is being fetched.
		window.applicationCache.addEventListener('progress', function(){dbg('appCache: Progress');}, false);
		
		// Fired when the manifest resources have been newly redownloaded.
		window.applicationCache.addEventListener('updateready', function(){dbg('appCache: UpdateReady');}, false);

	  
	window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      var notifications = $('notifications');
			notifications.setAttribute('class','box');
    }
  }, false);
 }
}, false);
}


window.onload = function(){
	window.scrollTo(0, 1);
	dbgOut = $("dbgOut");
	getBuild();
	dbg(navigator.userAgent);
	if(isBadBrowser()){
		useCookies = true;
		dbg("Browser lacks localStorage support, falling back to cookies.");
	} else {
		dbg("Browser has localStorage support.");
	}
	var reloadlink = $('reloadlink');
  reloadlink.onclick = function (){window.location.reload();};
  var channelStoreMacroButton = $('chs_macro');
  channelStoreMacroButton.onclick = function(){
	  var launchid = $('chstoreappid').value;
	  rokupost('launch','11?contentId='+launchid);
	  // /launch/11?contentId=12
	  };
	wipeSettingsButton = $("wipesettings");
	wipeSettingsButton.onclick = wipeSettings;
	
	controlContainer = $("controlcontainer");
	
	rokuSelect = $("rokus");
	rokuSelect.onchange = setRokuAddress;
	
	scannedRokus = getConfig('scannedRokus') ? getConfig('scannedRokus').split(",") : [];
	
	keyboardMode = getConfig('keyboardMode') ? getConfig('keyboardMode') : true;
	octet1 = $('octet1');
	octet2 = $('octet2');
	octet3 = $('octet3');
	octet1.onchange = setMyNetwork;
	octet1.onfocus = textModeOff;
	octet1.onblur = textModeOn;
	octet2.onchange = setMyNetwork;
	octet2.onfocus = textModeOff;
	octet2.onblur = textModeOn;
	octet3.onchange = setMyNetwork;
	octet3.onfocus = textModeOff;
	octet3.onblur = textModeOn;
	
	
	myNetwork = getConfig('myNetwork') ? getConfig('myNetwork') : "192.168.1";
	var octets = myNetwork.split(".");
	octet1.value=octets[0];
	octet2.value=octets[1];
	octet3.value=octets[2];

	rokuCount = getConfig('rokuCount') ? getConfig('rokuCount') : "1";
	numField = $('num');
	numField.value = rokuCount;
	numField.onchange = setRokuCount;
	
	scanButton = $('scanforroku');
	scanButton.onclick = findRokus;
	
	scanResults = $('scanresults');
	
	rokuAddress = getConfig('rokuAddress');
	manualInput = $('maddress');
	manualInput.onfocus = textModeOff;
	manualInput.onblur = textModeOn;

	manualSelect = $('manualrokus');
	manualRokus = getConfig('manualRokus') ? getConfig('manualRokus').split(",") : [];
	removeButton = $('removeroku');
	removeButton.onclick = removeRoku;
	addButton = $('addroku');
	addButton.onclick = addRoku;

	var channelsLink = $('channelslink');
		channelsLink.innerHTML = 'Refer to your <a class="bgcolor" href="http://'+ rokuAddress +':8060/query/apps" target="_blank">installed channels</a> for channel ids.';
	var channelsLink2 = $('channelslink2');
		channelsLink2.innerHTML = 'Refer to your <a class="bgcolor" href="http://'+ rokuAddress +':8060/query/apps" target="_blank">installed channels</a> for channel ids.';
	
	rokuName = $('rokuname');
	rokuName.onfocus = textModeOff;
	rokuName.onblur = function(){
		textModeOn();
		nameRoku(); 
	};
	rokuName.onkeyup = doNameRoku;
	
	remotesPopup = $("remotespopup");
	lowerRemotesPopup = $("lowerremotespopup");
	
	try{
		namedRokus = JSON.parse(getConfig('namedRokus')) ? JSON.parse(getConfig('namedRokus')) : {};
		//dbg(JSON.stringify(namedRokus));
	} catch (err) {
		namedRokus = {};
	}

	if(manualRokus.length>0) buildManualRokusMenu();
	updateSelect();
	rokuName.value = namedRokus[rokuAddress] ? namedRokus[rokuAddress] : "Remoku";
	nameLine = $("nameline");
	nameLine.innerHTML = rokuName.value ? rokuName.value : rokuAddress;
	nameLine.onclick = showRemotes;
	try{
		var apps = JSON.parse(localStorage.getItem(rokuAddress + '-apps'));
	}catch(err){
		apps = [];	
	}
		
	remoteButtons = getElementsByClass("link");
	for(var i=0; i<remoteButtons.length; i++){
		if (is_touch_device()){
			remoteButtons[i].ontouchstart = btnTouchDown;
			remoteButtons[i].ontouchend = btnTouchUp;
		} else {
			remoteButtons[i].onmousedown = btnDown;
			remoteButtons[i].onmouseup = btnUp;
		}
	}
	
	var intViewportHeight = window.innerHeight;
	//dbg(intViewportHeight);
	var screens = $("remote");
// 	if(intViewportHeight<419){
// 		intViewportHeight+=40
// 		dbg(intViewportHeight);
// 		screens.style.height = intViewportHeight+"px";
// 		remoteTable = $("remotetable");
// 		remoteTable.style.marginBottom = 40+"px";
// 	}
	remoteScreen = $("remote");
	goodiesScreen = $("goodies");
	appsScreen = $("apps");
	configScreen = $("config");
	aboutScreen =  $("about");
	firstSetupScreen = $("firstsetup");
	screenArray = [remoteScreen,goodiesScreen,appsScreen,configScreen,aboutScreen];
	
	navRemote = $("navremote");
	navRemoteImg = $("navremoteimg");
	navGoodies = $("navgoodies");
	navApps   = $("navapps");
	navConfig = $("navconfig");
	navAbout = $("navabout");
    navArray = [navRemote,navGoodies,navApps,navConfig,navAbout];
    
// 	if(is_touch_device()){
// 		dbg("Touch Device Detected");
// 		navRemoteImg.ontouchstart = touchshowRemotes; 
// 		navRemoteImg.ontouchend = canceltouchshowRemotes;
// 	} else {
// 		navRemote.onclick = activateButton;
// 		navRemote.onmousedown = rmousedownRemoteBtn;
// 		navRemote.onmouseup = function(){return false;};
// 		navRemote.oncontextmenu = function(){return false;};
// 	}	
	navRemote.onclick = activateButton;
	navApps.onclick = activateButton;
	navConfig.onclick = activateButton;
	navGoodies.onclick = activateButton;
	navAbout.onclick = activateButton;
	
	sendTextBtn = $("sendtext");
	sendTextBtn.onclick = rokuText;
	
	loadAppsButton = $("loadapps");
	loadAppsButton.onclick = rokuApps;

	startAppsButton = $("startremoku");
	startAppsButton .onclick = launchRemoku;
	if(!rokuAddress) {
		 firstSetup();
	 }
	 
	launchButton = $("lparamdo");
	launchValue = $("lvalue");
	launchKey = $("lkey");
	launchButton.onclick = launchRemokuWithParams;
	
	shoutCastNameInput = $("sc_name");
	shoutCastNameInput.onfocus = textModeOff;
	shoutCastNameInput.onblur = textModeOn;

	shoutCastUrlInput = $("sc_url");
	shoutCastUrlInput.onfocus = textModeOff;
	shoutCastUrlInput.onblur = textModeOn;

	shoutCastLaunchButton = $("sc_launch");
	shoutCastLaunchButton.onclick = launchShoutCast;
	

	macroSelect = $("macroSelect");
	macroSelect.onchange = function(){
		macro = this.options[this.selectedIndex].value;
		macroname = this.options[this.selectedIndex].innerHTML;
		dbg(macro + macroname);
		macroInput.value = macroname;
		macro = macro.substring(1,macro.length-1);
		macroArea.value = macro;
		};
	macros = (getConfig('macros') && getConfig('macros').length>0)?JSON.parse(getConfig('macros')):[
	{"Email":[{"text":"gonzotek@gmail.com"}]},
	{"Home":[{"keypress":"Home"}]},
	{"Developer Screen":[{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Up"},{"keypress":"Up"},{"keypress":"Right"},{"keypress":"Left"},{"keypress":"Right"},{"keypress":"Left"},{"keypress":"Right"}]},
	{"Dump Core":[{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Up"},{"keypress":"Rev"},{"keypress":"Rev"},{"keypress":"Fwd"},{"keypress":"Fwd"}]},
	{"Secret Screen":[{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Fwd"},{"keypress":"Fwd"},{"keypress":"Fwd"},{"keypress":"Rev"},{"keypress":"Rev"}]},
	{"Bit Rate Override":[{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Rev"},{"keypress":"Rev"},{"keypress":"Rev"},{"keypress":"Fwd"},{"keypress":"Fwd"}]},
	{"Channels Info":[{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Home"},{"keypress":"Up"},{"keypress":"Up"},{"keypress":"Left"},{"keypress":"Right"},{"keypress":"Left"},{"keypress":"Right"},{"keypress":"Left"}]},
	{"RepeatPlayWait":[{"repeat":"5"},{"keypress":"Play"},{"wait":"30:00"}]},
	{"Launch Channel Store":[{"launch":"11?contentId=12"}]}
	];
    for (i=0;i<macros.length;i++){
	    macro = macros[i];
		var name = Object.keys(macro)[0];//need object.keys polyfill for ie7/ie8 support.  worth it?
		var macro = JSON.stringify(macro[name]);
		addSelectOption("macroSelect", macro, name);
	    }
	macroInput = $("custommacroinput");
	macroInput.onfocus = textModeOff;
	macroInput.onblur = textModeOn;

	macroArea = $("macroArea");
	macroArea.onfocus = textModeOff;
	macroArea.onblur = textModeOn;

	addMacroButton = $("addMacro");
	addMacroButton.onclick = function() {
		dbg("add name: " + macroInput.value + "<br> commands: " + macroArea.value);
	  		macro = {};
	  		try{
	  		macro[macroInput.value] = JSON.parse("["+macroArea.value+"]");
	  		$('macroerror').innerHTML = '';
	  			for(i=0;i<macros.length;i++){
		  		dbg(macros[i]);
		  		if (macros[i][macroInput.value]){
			  		macros[i]=macro;
			  		macro=null;
			  		break;
			  		}
		  		}
	  		if(macro!==null){
		  		macros.push(macro);
		  		addSelectOption("macroSelect", "["+macroArea.value+"]", macroInput.value);
		  		} else {
			  		removeSelectOption("macroSelect",macroInput.value);
		  		addSelectOption("macroSelect", "["+macroArea.value+"]", macroInput.value);
			  		}
	  		setConfig('macros',JSON.stringify(macros));

  			} catch(e){
	  			$('macroerror').innerHTML = e;
	  			}  		
		};
	removeMacroButton = $("removeMacro");
		removeMacroButton.onclick = function (){
			removeSelectOption("macroSelect",macroInput.value);
			idx = -1;
			for(i=0;i<macros.length;i++){
				if (macros[i][macroInput.value])idx=i;
				}
			if (idx>-1)macros.splice(idx,1);
	  	setConfig('macros',JSON.stringify(macros));
			};
		
	runMacroButton = $("runCustomMacro");
	runMacroButton.onclick = function(){
		dbg("run name: " + macroInput.value + "<br> commands: " + macroArea.value);
		
		var cmds = JSON.parse("["+macroArea.value+"]");
		//Example JSON:
		// [{"pause":3751},{"keypress":"Left"},{"pause":3752},{"keypress":"Down"},{"pause":3753},{"keypress":"Right"},{"pause":3754},{"keypress":"Up"}]
		sendCustomMacro(cmds);
		};
			
	document.onkeyup = handleArrowKeyUp;
	document.onkeydown = handleArrowKeyDown;
	
	
	showFavoritesChkbx = $("showFaves");
	showFavs = getConfig('showFavs')=='false'?getConfig('showFavs'):'true';
	setConfig('showFavs',showFavs);
	if(showFavs=='true'){
		showFavoritesChkbx.checked=true;
		$('favtable').setAttribute('class','');
	} else {
		showFavoritesChkbx.checked=false;
		$('favtable').setAttribute('class','hidden');
	}
	showFavoritesChkbx.onclick = function(){
		if(showFavoritesChkbx.checked){
				setConfig('showFavs','true');
				$('favtable').setAttribute('class','');
			} else {
				setConfig('showFavs','false');
				$('favtable').setAttribute('class','hidden');
			}
		};
	var fav1Input = $("inputfav1");
	fav1Value = getConfig('fav1')?getConfig('fav1'):'12';
	fav1Input.value = fav1Value;
	fav1Input.onblur = function(){
		textModeOff();
		var fav1Value = this.value;
		fav1Link = $("fav1link");
		fav1Link.setAttribute('onclick','rokulaunch("'+fav1Value+'")');
		favImg1 = $("favimg1");
		favImg1.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav1Value);
		setConfig('fav1',fav1Value);
		};
	fav1Input.onfocus = function(){
		textModeOff();
		};
	var fav1 = $("fav1");
	    var favlink = document.createElement("a");
	    favlink.setAttribute('href','#fav1');
		favlink.setAttribute('onclick','rokulaunch("'+fav1Value+'")');
	    favlink.setAttribute('id','fav1link');
	    var favimg = document.createElement("img");
		favimg.setAttribute('class','favicons');
		favimg.setAttribute('Id','favimg1');
		if(getConfig('showFavs')=='true'){favimg.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav1Value);}
		favlink.appendChild(favimg);
	fav1.appendChild(favlink);
	
	
	var fav2Input = $("inputfav2");
	fav2Value = getConfig('fav2')?getConfig('fav2'):'28';
	fav2Input.value = fav2Value;
	fav2Input.onblur = function(){
		textModeOn();
		var fav2Value = this.value;
		fav2Link = $("fav2link");
		fav2Link.setAttribute('onclick','rokulaunch("'+fav2Value+'")');
		favImg2 = $("favimg2");
		favImg2.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav2Value);
		setConfig('fav2',fav2Value);
		};
	fav2Input.onfocus = function(){
		textModeOff();
		};
		var fav2 = $("fav2");
	  favlink = document.createElement("a");
	  favlink.setAttribute('href','#fav2');
		favlink.setAttribute('onclick','rokulaunch("'+fav2Value+'")');
	  favlink.setAttribute('id','fav2link');
	  favimg = document.createElement("img");
		favimg.setAttribute('class','favicons');
		favimg.setAttribute('Id','favimg2');
		if(getConfig('showFavs')=='true'){favimg.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav2Value);}
		favlink.appendChild(favimg);
	fav2.appendChild(favlink);
	
	var fav3Input = $("inputfav3");
	fav3Value = getConfig('fav3')?getConfig('fav3'):'2016';
	fav3Input.value = fav3Value;
	fav3Input.onblur = function(){
		textModeOn();
		var fav3Value = this.value;
		fav3Link = $("fav3link");
		fav3Link.setAttribute('onclick','rokulaunch("'+fav3Value+'")');
		favImg3 = $("favimg3");
		favImg3.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav3Value);
		setConfig('fav3',fav3Value);
		};
	fav3Input.onfocus = function(){
		textModeOff();
		};
		var fav3 = $("fav3");
	  favlink = document.createElement("a");
	  favlink.setAttribute('href','#fav3');
		favlink.setAttribute('onclick','rokulaunch("'+fav3Value+'")');
	  favlink.setAttribute('id','fav3link');
	  favimg = document.createElement("img");
		favimg.setAttribute('class','favicons');
		favimg.setAttribute('Id','favimg3');
		if(getConfig('showFavs')=='true'){favimg.setAttribute('src','http://' + rokuAddress +':8060/query/icon/'+fav3Value);}
		favlink.appendChild(favimg);
	fav3.appendChild(favlink);
	
	if(apps)_rmAppsCB(apps);
	
	//Background
    bgcolorInput = $("bgcolor");
    bgcolor = getConfig('bgColor') ? getConfig('bgColor') : "101010";
    bgcolorInput.value = bgcolor;
    changeBackgroundColor('.bgcolor', '#' + bgcolor);
    txtcolor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
    navTextColor = Brightness( bgcolor ) < 130 ? 'D0D0D0' : '555555';
    activeNavTextColor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
    changeTextColor('.nav', '#' + navTextColor);
    changeTextColor('.active', '#' + activeNavTextColor);
    changeTextColor('.bgcolor', '#' + txtcolor);
    cP = colorPicker;
    cP.exportColor = function () {
	    bgcolor = bgcolorInput.value;
			changeBackgroundColor('.bgcolor', '#' + bgcolor);
			txtcolor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
			changeTextColor('.bgcolor', '#' + txtcolor);
	    navTextColor = Brightness( bgcolor ) < 130 ? 'D0D0D0' : '555555';
	    activeNavTextColor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
	    changeTextColor('.nav', '#' + navTextColor);
	    changeTextColor('.active', '#' + activeNavTextColor);
			setConfig('bgColor', bgcolor);
			
			fgcolor = fgcolorInput.value;
	    txtcolor = Brightness( fgcolor ) < 130 ? 'FFFFFF' : '000000';
	    for (var i = 0; i<fgElements.length;i++) {
		    changeBackgroundColor(fgElements[i], '#' + fgcolor);
			changeTextColor(fgElements[i], '#' + txtcolor);
		    }
		setConfig('fgColor', fgcolor);
	  };
	    
    bgcolorInput.onfocus = function(){
	    textModeOff();
	    bgcolor = bgcolorInput.value;
			changeBackgroundColor('.bgcolor', '#' + bgcolor);
			txtcolor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
			changeTextColor('.bgcolor', '#' + txtcolor);
	    navTextColor = Brightness( bgcolor ) < 130 ? 'D0D0D0' : '555555';
	    activeNavTextColor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
	    changeTextColor('.nav', '#' + navTextColor);
	    changeTextColor('.active', '#' + activeNavTextColor);
			setConfig('bgColor', bgcolor);	
	    };
	bgcolorInput.onblur = function(){
		textModeOn();
		};
	bgcolorInput.onchange = function(){
	    bgcolor = bgcolorInput.value;
			changeBackgroundColor('.bgcolor', '#' + bgcolor);
			txtcolor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
			changeTextColor('.bgcolor', '#' + txtcolor);
	    navTextColor = Brightness( bgcolor ) < 130 ? 'D0D0D0' : '555555';
	    activeNavTextColor = Brightness( bgcolor ) < 130 ? 'FFFFFF' : '000000';
	    changeTextColor('.nav', '#' + navTextColor);
	    changeTextColor('.active', '#' + activeNavTextColor);
			setConfig('bgColor', bgcolor);	

		};
		
	//Foreground objects
	//input select option button
    fgcolorInput = $("fgcolor");
    fgcolor = getConfig('fgColor') ? getConfig('fgColor') : "101010";    
    fgElements = ['input','textarea','#macroArea','select','option','button','.selected','#rokus'];
    txtcolor = Brightness( fgcolor ) < 130 ? 'FFFFFF' : '000000';
    for (var i = 0; i<fgElements.length;i++) {
	    changeBackgroundColor(fgElements[i], '#' + fgcolor);
	    changeTextColor(fgElements[i], '#' + txtcolor);
	    }
    fgcolorInput.value = fgcolor;
    fgcolorInput.onfocus = function(){
	    textModeOff();
	    fgcolor = fgcolorInput.value;
	    txtcolor = Brightness( fgcolor ) < 130 ? 'FFFFFF' : '000000';
	    for (var i = 0; i<fgElements.length;i++) {
		    changeBackgroundColor(fgElements[i], '#' + fgcolor);
			changeTextColor(fgElements[i], '#' + txtcolor);
		    }
		setConfig('fgColor', fgcolor);
	    };
	fgcolorInput.onblur = function(){
		textModeOn();
		};
	textEntryInput = $("textentry");
	textEntryInput.value = "";
	textEntryInput.onkeyup = rokuDeleteOrBlur;
	textEntryInput.onkeypress = rokuText;
	
	textEntryInput.onfocus = textModeOff;
	textEntryInput.onblur = textModeOn;
	textEntryInput.enter = rokuText;

	rokupostframe.name="rokuresponse";
	rokupostframe.id="rokuresponse";
	rokupostframe.style.visibility="hidden";
	rokupostframe.style.display="none";
	rokupostframe = document.body.appendChild(rokupostframe);

	rokutextframe.name="rokutextresponse";
	rokutextframe.id="rokutextresponse";
	rokutextframe.style.visibility="hidden";
	rokutextframe.style.display="none";
	rokutextframe.onload = delayNextQuery;
	rokutextframe = document.body.appendChild(rokutextframe);
	
	rokupostform.style.visibility="hidden";
	rokupostform.style.display="none";
	rokupostform.id="rokupost";
	rokupostform.method="post";
	rokupostform.target="rokuresponse";
	rokupostform = document.body.appendChild(rokupostform);
	
	rokutextform.style.visibility="hidden";
	rokutextform.style.display="none";
	rokutextform.id="rokutext";
	rokutextform.method="post";
	rokutextform.target="rokutextresponse";
	rokutextform = document.body.appendChild(rokutextform);

	
};

//Hide iPhone URL bar
if(window.addEventListener) window.addEventListener("load", function(){setTimeout(hideURLbar, 100);}, false);
function hideURLbar(){
    window.scrollTo(0, 1);
	}

//END INITIALIZATION
////////////////////
