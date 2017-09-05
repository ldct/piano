(function() {

  //
  // Variables
  // --------------------------------------------------

  // Notes variables
  var notes = {
    "1C": new Howl({
        urls: [ "assets/midia/261-C.mp3" ]
    }),
    "1Cs": new Howl({
        urls: [ "assets/midia/277-C-sharp.mp3" ]
    }),
    "1D": new Howl({
        urls: [ "assets/midia/293-D.mp3" ]
    }),
    "1Ds": new Howl({
        urls: [ "assets/midia/311-D-sharp.mp3" ]
    }),
    "1E": new Howl({
        urls: [ "assets/midia/329-E.mp3" ]
    }),
    "1F": new Howl({
        urls: [ "assets/midia/349-F.mp3" ]
    }),
    "1Fs": new Howl({
        urls: [ "assets/midia/369F-sharp.mp3" ]
    }),
    "1G": new Howl({
        urls: [ "assets/midia/391-G.mp3" ]
    }),
    "1Gs": new Howl({
        urls: [ "assets/midia/415-G-sharp.mp3" ]
    }),
    "2A": new Howl({
        urls: [ "assets/midia/440-A.mp3" ]
    }),
    "2As": new Howl({
        urls: [ "assets/midia/466-A-sharp.mp3" ]
    }),
    "2B": new Howl({
        urls: [ "assets/midia/495-B.mp3" ]
    }),
    "2C": new Howl({
        urls: [ "assets/midia/523-C.mp3" ]
    }),
    "2Cs": new Howl({
        urls: [ "assets/midia/545-C-sharp.mp3" ]
    }),
    "2D": new Howl({
        urls: [ "assets/midia/587-D.mp3" ]
    }),
    "2Ds": new Howl({
        urls: [ "assets/midia/622-D-sharp.mp3" ]
    }),
    "2E": new Howl({
        urls: [ "assets/midia/659-E.mp3" ]
    }),
    "2F": new Howl({
        urls: [ "assets/midia/698-F.mp3" ]
    }),
    "2Fs": new Howl({
        urls: [ "assets/midia/698-F-sharp.mp3" ]
    }),
    "2G": new Howl({
        urls: [ "assets/midia/783-G.mp3" ]
    }),
    "2Gs": new Howl({
        urls: [ "assets/midia/830-G-sharp.mp3" ]
    }),
    "3A": new Howl({
        urls: [ "assets/midia/880-A.mp3" ]
    }),
    "3As": new Howl({
        urls: [ "assets/midia/932-A-sharp.mp3" ]
    }),
    "3B": new Howl({
        urls: [ "assets/midia/987-B.mp3" ]
    })
  };

  // Lock event for play
  var lockEvent = {};

  //
  // Events
  // --------------------------------------------------

  // Disable Select
  // --------------------------------------------------
  $('.piano').bind('selectstart dragstart', function(ev) {
    ev.preventDefault();
    return false;
  });

  // Piano Play Keyboard
    // --------------------------------------------------
  $(window).bind('keydown keyup', function(ev) {
    var keyNo = ev.which;
        var $key = $('[data-key="'+keyNo+'"]');
        var note = $key.attr('data-note');
    if(note){
      if (ev.type == 'keydown') {
        if (!lockEvent[keyNo]) {
          notes[note].play();
          lockEvent[keyNo] = true;
          $key.addClass('active');
          $key.parent().addClass('active');
        }
      }
      else if (ev.type == 'keyup') {
        lockEvent[keyNo] = false;
        $key.removeClass('active');
        $key.parent().removeClass('active');
      }
    }
  });

  // Piano Play Click
  // --------------------------------------------------
  $('.key > span').mousedown(function(){
    // Save note
    var me = $(this);
    var noteClick = me.attr('data-note');
    // Play sound
    notes[noteClick].play();
  });

  const randomIdx = function (arr) {
    return Math.floor(Math.random() * arr.length);
  }
  const play = function (d) {
    const keys = $(".piano span").slice(0, 16);

    const note = $(d).attr('data-note');

    notes[note].play();
  }

  const silence = function () {
    for (var note in notes) {
      notes[note].stop();
    }
  }

  const chordTypes = {
    "major": [4, 3],
    "minor": [3, 4],
    "diminished": [3, 3],
    "augmented": [4, 4],
    "major-1": [3, 5],
    "minor-1": [4, 5],
  }

  $("#new").off().click(function () {
    silence();

    var selectedChordTypes = [];

    for (var chordType in chordTypes) {
      if ($("#" + chordType)[0].checked) {
        selectedChordTypes.push(chordTypes[chordType]);
      }
    }

    console.log(selectedChordTypes);

    const randomChord = selectedChordTypes[randomIdx(selectedChordTypes)];

    const keys = $(".piano span");
    const rootKeys = keys.slice(0, 24 - randomChord[0] - randomChord[1]);

    // major chord, root position
    const aNote = randomIdx(rootKeys);
    const bNote = aNote + randomChord[0];
    const cNote = bNote + randomChord[1];

    window.quizzedNotes = [aNote, bNote, cNote];

    play(keys[aNote]);
    play(keys[bNote]);
    play(keys[cNote]);
  });


  $("#repeat").off().click(function () {
    silence();
    const keys = $(".piano span");

    for (var i = 0; i < window.quizzedNotes.length; i++) {
      const note = window.quizzedNotes[i];
       play(keys[note]);
    }
  });

  $("#arp").off().click(function () {
    silence();
    const keys = $(".piano span");

    for (var i = 0; i < window.quizzedNotes.length; i++) {
      const note = window.quizzedNotes[i];
      window.setTimeout(function () {
        play(keys[note]);
      }, i * 400);
    }
  });

  $("#silence").click(function () {
    silence();
  });


})();

