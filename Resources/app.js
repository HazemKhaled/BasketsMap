var apiUrl = 'http://baskets.hazemkhaled.com/api.php?';
var mapLocation = {};
Ti.Geolocation.preferredProvider = "gps";

var mainWin = Titanium.UI.createWindow({
	title : L('title'),
	backgroundColor : '#fff'
});

var lasttipView = Titanium.UI.createView({
	width : '205dp',
	height : '57dp',
	backgroundImage : "images/bubble.png",
	top : '32dp',
	right : '3dp',
	zIndex : 99
});
var lasttipLabel = Titanium.UI.createLabel({
	text : L('add_new'),
	color : '#fff',
	width : '205dp',
	height : '34dp',
	top : '16dp',
	font : {
		fontFamily : 'Helvetica Neue',
		fontSize : '13dp',
		fontWeight : 'bold'
	},
	textAlign : 'center'
});

lasttipView.add(lasttipLabel);

var anim_out = Titanium.UI.createAnimation();
anim_out.opacity = 0;
anim_out.duration = 250;

lasttipView.addEventListener('click', function() {
	lasttipView.animate(anim_out);
});
mainWin.add(lasttipView);

var addBtn = Ti.UI.createButton({
	image : 'images/add.png',
	top : '10dp',
	right : '15dp',
	zIndex : 99,
	width : '22dp',
	height : '22dp'
});
mainWin.add(addBtn);

addBtn.addEventListener('click', function() {
	annotation = Titanium.Map.createAnnotation({
		latitude : mapLocation.latitude,
		longitude : mapLocation.longitude,
		title : '',
		animate : true
	});

	if(Titanium.Platform.osname == 'android') {
		annotation.pinImage = 'images/pin_small.png';
	}
	mapView.addAnnotation(annotation);

	var addWin = Ti.UI.createWindow({
		borderRadius : 10,
		backgroundColor : '#000',
		width : '200dp',
		height : '100dp',
		top : '150dp',
		opacity : 0.8
	});

	var pinTitleFld = Ti.UI.createTextField({
		value : '',
		textAlign : 'right',
		width : '180dp',
		height : '40dp',
		top : '10dp',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	addWin.add(pinTitleFld);

	var addBtn = Ti.UI.createButton({
		title : L('add'),
		//style: Ti.UI.iPhone.SystemButton.SAVE,
		width : '90dp',
		height : '30dp',
		left : '100dp',
		bottom : '10dp'
	});

	addBtn.addEventListener('click', function() {

		var addReq = Titanium.Network.createHTTPClient();
		addReq.open("POST", apiUrl);

		addReq.onload = function() {

			var json = this.responseText;
			var response = JSON.parse(json);

			if(response.result > 0) {

				var t3 = Titanium.UI.create2DMatrix();
				t3 = t3.scale(0);
				addWin.close({
					transform : t3,
					duration : 300
				});
				mapView.selectAnnotation(annotation);
				annotation.title = pinTitleFld.value;
			} else {
				alert(L('add_error'));
			}

		};
		var prams = {
			latitude : mapLocation.latitude,
			longitude : mapLocation.longitude,
			title : pinTitleFld.value,
		};
		addReq.send(prams);
	});
	addWin.add(addBtn);

	var cancelBtn = Ti.UI.createButton({
		title : L('cancel'),
		//style : Ti.UI.iPhone.SystemButton.CANCEL,
		width : '90dp',
		height : '30dp',
		left : '10dp',
		bottom : '10dp'
	});

	cancelBtn.addEventListener('click', function() {
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(300);
		addWin.close({
			transform : t3,
			duration : 300
		});
		mapView.removeAnnotation(annotation);
	});
	addWin.add(cancelBtn);
	addWin.open();
});
var aboutBtn = Ti.UI.createButton({
	top : '10dp',
	left : '15dp',
	zIndex : 99
});

if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
	aboutBtn.style = Titanium.UI.iPhone.SystemButton.INFO_DARK;
} else {
	aboutBtn.text = L('About');
}

aboutBtn.addEventListener('click', function() {
	var aboutWin = Titanium.UI.createWindow({
		backgroundColor : '#000',
		url : 'about.js',
		width : '300dp',
		height : '300dp',
		borderColor : 'gray',
		borderWidth : '8dp',
		borderRadius : 8,
		opacity : 0.8
	});

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	a.addEventListener('complete', function() {
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		aboutWin.animate({
			transform : t2,
			duration : 200
		});
	});
	aboutWin.open(a);
});
//if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
	mainWin.add(aboutBtn);
//}

var mapView = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	region : {
		latitude : 29.94511,
		longitude : 31.18993,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	},
	animate : true,
	regionFit : true,
	userLocation : true,
	//annotations:[]
});

var startRequestingOnServer = false;
var basketsIDs = [];

var mapReq = Titanium.Network.createHTTPClient();

mapReq.onload = function() {
	var json = this.responseText;
	var response = JSON.parse(json);

	var annotation;

	for(r in response ) {
		myid = response[r].id;
		if( typeof basketsIDs[myid] === 'undefined') {
			basketsIDs[myid] = true
			annotation = Titanium.Map.createAnnotation({
				latitude : parseFloat(response[r].location.latitude),
				longitude : parseFloat(response[r].location.longitude),
				title : response[r].title,
				myid : myid,
				animate : true
			});

			if(Titanium.Platform.osname == 'android') {
				annotation.pinImage = 'images/pin_small.png';
			}
			mapView.addAnnotation(annotation);
		}
	}
	startRequestingOnServer = false;
};
mapView.addEventListener('regionChanged', function(e) {
	mapLocation = {
		longitude : e.longitude,
		latitude : e.latitude
	};

	if(startRequestingOnServer === false) {
		startRequestingOnServer = true;

		mapReq.open("GET", apiUrl + "longitude=" + e.longitude + "&longitudeDelta=" + e.longitudeDelta + "&latitude=" + e.latitude + "&latitudeDelta=" + e.latitudeDelta);
		mapReq.send();

	}
});
mainWin.add(mapView);

Ti.Geolocation.purpose = L('gpd_note');
Titanium.Geolocation.getCurrentPosition(function(data) {
	coords = data.coords;
	try {
		mapView.setLocation({
			latitude : coords.latitude,
			longitude : coords.longitude,
			latitudeDelta : 0.01,
			longitudeDelta : 0.01
		});
	} catch (e) {
		Titanium.API.info(e);
	}
});
mainWin.open();
