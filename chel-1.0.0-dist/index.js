module.exports = function(app)
{
	app.get('/lib/chel-1.0.0-dist/js/canvasControl.js', 
		function (req, res) {res.sendFile(__dirname + '/js/canvasControl.js');});

	app.get('/lib/chel-1.0.0-dist/js/chlib.js', 
		function (req, res) {res.sendFile(__dirname + '/js/chlib.js');});

	app.get('/lib/chel-1.0.0-dist/js/consts.js', 
		function (req, res) {res.sendFile(__dirname + '/js/consts.js');});

	app.get('/lib/chel-1.0.0-dist/js/keyboardManager.js', 
		function (req, res) {res.sendFile(__dirname + '/js/keyboardManager.js');});

	app.get('/lib/chel-1.0.0-dist/js/mouseManager.js', 
		function (req, res) {res.sendFile(__dirname + '/js/mouseManager.js');});

	app.get('/lib/chel-1.0.0-dist/js/resourceManager.js', 
		function (req, res) {res.sendFile(__dirname + '/js/resourceManager.js');});

	app.get('/lib/chel-1.0.0-dist/js/soundManager.js', 
		function (req, res) {res.sendFile(__dirname + '/js/soundManager.js');});

	app.get('/lib/nosound.wav', 
		function (req, res) {res.sendFile(__dirname + '/assets/nosound.wav');});

	app.get('/lib/soundtest.mp3', 
		function (req, res) {res.sendFile(__dirname + '/assets/soundtest.mp3');});

	app.get('/lib/chel-1.0.0-dist/js/storageManager.js', 
		function (req, res) {res.sendFile(__dirname + '/js/storageManager.js');});

	console.log("   lib/chel-1.0.0-dist/index.js: OK");
}
