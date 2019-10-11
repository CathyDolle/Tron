/* jshint undef: true, unused: true, eqeqeq: true*/
/* globals Pizzicato, Leap, Dolby, window */

(function() {
	'use strict';

	// DOM elements used throughout the script
	var playButton = window.document.getElementById('play-control');
	var pauseButton = window.document.getElementById('pause-control');
	var notificationArea = window.document.getElementById('notification-area');
	var content = window.document.getElementById('content');
	var instructions = window.document.getElementById('instructions');

	// Canvas
	var canvas = window.document.getElementById('audio-visualisation');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var canvasContext = canvas.getContext('2d');

	// The different tracks played
	var daft;
	var daft1;
	var daft2;
	var songTracks;

	// Effects and nodes
	var delay;
	var flanger;
	var lowPassFilter;
	var distortion;
	var analyser = Pizzicato.context.createAnalyser();

	// This array will contain the information from the analyser node
	var waveformData = new window.Uint8Array(analyser.frequencyBinCount);

	var loadedTracks = 0;
	initializeSounds();

	/*
	 * Load the different tracks. Dolby Digital Plus format will be
	 * used when available.
	 **/
	function initializeSounds() {
		startWaitingScreen();
		var daftPath =  '../media/daft.mp3';
		var daft1Path = '../media/daft1.mp3';
		var daft2Path = '../media/daft2.mp3';

		daft = new Pizzicato.Sound({
			source: 'file',
	    	options: { path: daftPath, loop: true }
		}, onSoundLoaded);

		daft1 = new Pizzicato.Sound({
			source: 'file',
	    	options: { path: daft1Path, loop: true }
		}, onSoundLoaded);

		daft2 = new Pizzicato.Sound({
			source: 'file',
	    	options: { path: daft2Path, loop: true }
		}, onSoundLoaded);

		songTracks = [daft, daft1, daft2];
	}

	/*
	 * Called when a track has been loaded. When all tracks
	 * load we set-up everything else.
	 **/
	function onSoundLoaded(error) {
		if (error) {
			handleLoadFileError();
			return;
		}

		loadedTracks++;

		if (loadedTracks === songTracks.length) {
			setupSoundsAndEffects();
			setupLeapMotion();
			removeWaitingScreen();
		}
	}

	function startWaitingScreen() {
		notificationArea.innerText = 'Loading audio files';
	}

	function removeWaitingScreen () {
		notificationArea.innerText = '';
	}

	function handleLoadFileError() {
		notificationArea.innerText = 'There was an error loading the audio files :( Try again later';
	}

	/*
	 * Binds DOM events to playing and pausing the song.
	 * It also adds the necessary effects to each sound and starts
	 * drawing the waveform.
	 **/
	function setupSoundsAndEffects() {
		playButton.addEventListener('click', function() {
			playSong();
			drawWaveform();
		});

		pauseButton.addEventListener('click', function() {
			pauseSong();
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		});

		delay = new Pizzicato.Effects.Delay({ feedback: 0, time: 0 });
		flanger = new Pizzicato.Effects.Flanger({ speed: 0, depth: 0, feedback: 0 });
		lowPassFilter = new Pizzicato.Effects.LowPassFilter({ frequency: 22050 });
		distortion = new Pizzicato.Effects.Distortion({ gain: 0 });

		daft1.addEffect(delay);
		daft1.addEffect(flanger);
		daft1.addEffect(distortion);
		daft1.addEffect(lowPassFilter);

		daft2.addEffect(lowPassFilter);

		daft.addEffect(lowPassFilter);

		lowPassFilter.outputNode.connect(analyser);

		bindSliders();
		playSong();
		drawWaveform();
	}

	/*
	 * Plays all tracks at the same time
	 **/
	function playSong() {
		for (var i = 0; i < songTracks.length; i++)
			songTracks[i].play();
	}

	/*
	 * Pauses all tracks at the same time
	 **/
	function pauseSong() {
		for (var i = 0; i < songTracks.length; i++)
			songTracks[i].pause();
	}

	/*
	 * Binds each slider to its corresponding effect.
	 **/
	function bindSliders() {
		var slidersValues = {
			'audio-volume': [
				{ element: daft, parameter: 'volume' },
				{ element: daft1, parameter: 'volume' },
				{ element: daft2, parameter: 'volume' }
			],
			'delay-feedback': [{ element: delay, parameter: 'feedback' }],
			'delay-time': [{ element: delay, parameter: 'time' }],
			'flanger-speed': [{ element: flanger, parameter: 'speed' }],
			'flanger-depth': [{ element: flanger, parameter: 'depth' }],
			'flanger-feedback': [{ element: flanger, parameter: 'feedback' }],
			'low-pass-filter-frequency': [{ element: lowPassFilter, parameter: 'frequency' }],
			'distortion-gain': [{ element: distortion, parameter: 'gain' }]
		};

		for (var key in slidersValues) {

			var slider = window.document.getElementById(key);

			for (var i = 0; i < slidersValues[key].length; i++) {
				var bindInfo = slidersValues[key][i];
				var element = bindInfo.element;
				var parameter = bindInfo.parameter;
				(function(slider, element, parameter) {
					slider.addEventListener('input', function(e) {
						element[parameter] = e.target.valueAsNumber;
					});
				})(slider, element, parameter);
			}
		}
	}

	/*
	 * Draws the graphical interpretation of the traks from the
	 * info obtained by the analyser node.
	 **/
	function drawWaveform() {
		if (!songTracks[0].playing)
			return;

		window.requestAnimationFrame(drawWaveform);

		drawFrequencyData();
		drawTimeDomainData();
	}

	/*
	 * Draws the EQ bars on the background of the site
	 **/
	function drawFrequencyData() {
		analyser.getByteFrequencyData(waveformData);

		canvasContext.fillStyle = '#1B1B1B';
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = '#333';

		var sliceWidth = canvas.width / analyser.frequencyBinCount * 6;
		var x = 0;

		for(var i = 0; i < analyser.frequencyBinCount; i++) {
			if (i % 6) continue;
			canvasContext.fillRect(x, canvas.height - waveformData[i] * 2.5, sliceWidth, waveformData[i] * 2.5);
			x += sliceWidth + 1;
		}
	}

	/*
	 * Draws the top light grey string with the time domain data of the tracks.
	 **/
	function drawTimeDomainData() {
		canvasContext.lineWidth = 4;
		canvasContext.strokeStyle = '#888888';
		canvasContext.beginPath();

		var sliceWidth = canvas.width / analyser.frequencyBinCount * 24;
		var x = 0;

		analyser.getByteTimeDomainData(waveformData);

		var previousX;
		var previousY;

		for(var i = 0; i < analyser.frequencyBinCount; i++) {
			if (i % 24) continue;

			var v = waveformData[i] / 128.0;
			var y = v * canvas.height / 4.2;


			if (i === 0) {
				canvasContext.moveTo(x, y);
			} else  {
				var xc = (previousX + x) / 2;
	      		var yc = (previousY + y) / 2;

				canvasContext.quadraticCurveTo(previousX, previousY, xc, yc);
			}

			previousX = x;
			previousY = y;

			x += sliceWidth;
		}

		canvasContext.lineTo(previousX + sliceWidth, previousY);
		canvasContext.stroke();
	}

	/*
	 * Sets up the leap motion controller by binding to events
	 * and starting the loop with the captured data.
	 **/
	function setupLeapMotion() {
		var leapController = new Leap.Controller();
		leapController.connect();

		leapController.on('streamingStarted', onLeapMotionConnected);
		leapController.on('streamingStopped', onLeapMotionDisconnected);

		leapController.on('deviceStreaming', onLeapMotionConnected);
		leapController.on('deviceStopped', onLeapMotionDisconnected);

		Leap.loop(onLeapCapturedData);
	}

	function onLeapMotionDisconnected() {
		content.classList.add('disconnected');
		instructions.innerText = 'Have a Leap Motion? Plug it in and control the parameters with hand gestures!';
	}

	function onLeapMotionConnected() {
		content.classList.remove('disconnected');
		instructions.innerText = 'Leap Motion detected';
	}

	/**
	 * This function is called for the Leap Motion loop
	 * event. leapData contains information on the hands detected
	 * by the Leap Motion device.
	 */
	function onLeapCapturedData(leapData) {

		if (!leapData.hands || leapData.hands.length === 0)
			return;

		var verticalPosition = leapData.hands[0].palmPosition[1];
		var percentage = Math.max(Math.min(((verticalPosition - 50) / 350), 1), 0);

		var checkboxesValues = {
			'audio-volume-checkbox': 'audio-volume',
			'delay-feedback-checkbox': 'delay-feedback',
			'delay-time-checkbox': 'delay-time',
			'flanger-speed-checkbox': 'flanger-speed',
			'flanger-depth-checkbox': 'flanger-depth',
			'flanger-feedback-checkbox': 'flanger-feedback',
			'filter-frequency-checkbox': 'low-pass-filter-frequency',
			'distortion-gain-checkbox': 'distortion-gain'
		};

		for (var key in checkboxesValues) {
			var checkbox = window.document.getElementById(key);
			var slider = window.document.getElementById(checkboxesValues[key]);

			if (checkbox.checked) {
				slider.value = percentage * slider.max;

				var event = new window.Event('input');
				slider.dispatchEvent(event);
			}
		}
	}
})();
