win = Ti.UI.currentWindow;

var myNameLbl = Ti.UI.createLabel({
	text : L('programmer'),
	textAlign : 'center',
	font : {
		fontSize : '18dp',
		fontFamily : 'Tahoma'
	},
	color : '#ffffff',
	top : '-220dp'
})

win.add(myNameLbl);

var mailView = Ti.UI.createView({
	left : '25dp',
	top : '-130dp'
})
var mailIconBtn = Ti.UI.createButton({
	image : 'images/mail.png',
	//title : 'ارسلي رسالة',
	left : 0
});
mailIconBtn.addEventListener('click', function() {

	var emailDialog = Titanium.UI.createEmailDialog();

	emailDialog.setToRecipients(['Hazem.Khaled@gmail.com']);
	emailDialog.open();
});
mailView.add(mailIconBtn);

var mailLbl = Ti.UI.createLabel({
	text : 'HazemKhaled@Gmail.com',
	left : '30dp',
	color : '#ffffff',
	font : {
		fontSize : '18dp'
	}
});
mailView.add(mailLbl);
win.add(mailView);

var twitterView = Ti.UI.createView({
	left : '25dp',
	top : '-80dp'
});

var twitterBtn = Ti.UI.createButton({
	image : 'images/twitter.png',
	left : 0
});
twitterView.add(twitterBtn);

var twitterLbl = Ti.UI.createLabel({
	text : '@HazemKhaled',
	left : '30dp',
	color : '#ffffff',
	font : {
		fontSize : '18dp'
	}
});
twitterView.add(twitterLbl);

twitterBtn.addEventListener('click', function() {
	try {
		if(Titanium.Platform.canOpenURL("twitter://user?screen_name=HazemKhaled")) {

			Titanium.Platform.openURL("twitter://user?screen_name=HazemKhaled");

		} else {

			Titanium.Platform.openURL("http://twitter.com/hazemkhaled")
		}
	} catch (err) {
		Ti.Platform.openURL('http://twitter.com/hazemkhaled');
	}
});
win.add(twitterView);

var maherNameLbl = Ti.UI.createLabel({
	text : L('disgner'),
	textAlign : 'center',
	font : {
		fontSize : '18dp',
		fontFamily : 'Tahoma'
	},
	color : '#ffffff',
	top : '20dp'
})

win.add(maherNameLbl);

var maherMailView = Ti.UI.createView({
	left : '25dp',
	top : '90dp'
})
var maherMailIconBtn = Ti.UI.createButton({
	image : 'images/mail.png',
	title : 'ارسلي رسالة',
	left : 0
});
maherMailIconBtn.addEventListener('click', function() {

	var emailDialog1 = Titanium.UI.createEmailDialog();

	emailDialog1.setToRecipients(['maher.naji.11@gmail.com']);
	emailDialog1.open();
});
maherMailView.add(maherMailIconBtn);

var maherMailLbl = Ti.UI.createLabel({
	text : 'maher.naji.11@gmail.com',
	left : '30dp',
	color : '#ffffff',
	font : {
		fontSize : '18dp'
	}
});
maherMailView.add(maherMailLbl);
win.add(maherMailView);

var maherTwitterView = Ti.UI.createView({
	left : '25dp',
	top : '140dp'
});

var maherTwitterBtn = Ti.UI.createButton({
	image : 'images/twitter.png',
	left : 0
});
maherTwitterView.add(maherTwitterBtn);

var maherTwitterLbl = Ti.UI.createLabel({
	text : '@mNghali',
	left : '30dp',
	color : '#ffffff',
	font : {
		fontSize : '18dp'
	}
});
maherTwitterView.add(maherTwitterLbl);

maherTwitterBtn.addEventListener('click', function() {
	try {
		if(Titanium.Platform.canOpenURL("twitter://user?screen_name=mNghali")) {

			Titanium.Platform.openURL("twitter://user?screen_name=mNghali");

		} else {

			Titanium.Platform.openURL("http://twitter.com/mNghali")
		}
	} catch (err) {
		Ti.Platform.openURL('http://twitter.com/mNghali');
	}
});
win.add(maherTwitterView);

var bkToMapBtn = Ti.UI.createButton({
	image : 'images/bkToMap.png',
	bottom : '15dp',
	right : '15dp'
});

bkToMapBtn.addEventListener('click', function() {
	var t3 = Titanium.UI.create2DMatrix();
	t3 = t3.scale(0);
	win.close({
		transform : t3,
		duration : '300dp'
	});
});
win.add(bkToMapBtn);
