AFRAME.registerComponent('audiodata', {

    init: function () {

      var sceneEl = document.querySelector('a-scene');
      var arr = new Array(500);

      let source = 'koka.mp3';
      let masterGain;
      var audioContext = new (onclick.AudioContext || onclick.webkitAudioContext);
      masterGain = audioContext.createGain();
      masterGain.connect(audioContext.destination);
      let song = new Audio(source);
      song.crossOrigin = 'anonymous';
      songSource  = audioContext.createMediaElementSource(song);
      songSource.connect(masterGain);
      song.play();
      const analyser = audioContext.createAnalyser();
	  masterGain.connect(analyser);     
     function updateWaveform() {
        requestAnimationFrame(updateWaveform);
        var dataArray = new Float32Array(analyser.frequencyBinCount); // Float32Array needs to be the //same length as the fftSize-->
        analyser.getFloatTimeDomainData(dataArray);
        for (var i = 0; i < 96; i++) {
          var newHeight = 1 + dataArray[i];
          document.querySelector('#box'+i).object3D.scale.set(.75, newHeight, .75);
        }
        console.log(dataArray);
      };
      updateWaveform();
    },

    update: function() {

    },

    tick: function () {


    },
  });