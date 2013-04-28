// Generated by CoffeeScript 1.4.0
(function() {

  $(function() {
    var context, keyboard, nodes, settings;
    new FastClick(document.body);
    Nimbus.Auth.set_app_ready(function() {
      console.log("app ready called");
      if (Nimbus.Auth.authorized()) {
        return $("#loginModal").removeClass("active");
      }
    });
    window.construct_instruction(window.current_song);
    settings = {
      id: "keyboard",
      width: 900,
      height: 200,
      startNote: "C3",
      whiteNotesColour: "white",
      blackNotesColour: "black",
      hoverColour: "#ccc",
      keyboardLayout: "en"
    };
    keyboard = qwertyHancock(settings);
    context = new webkitAudioContext();
    nodes = [];
    keyboard.keyDown(function(note, frequency) {
      var gainNode, oscillator;
      console.log("note", note, "frequency", frequency);
      oscillator = context.createOscillator();
      gainNode = context.createGainNode();
      oscillator.type = 1;
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.3;
      oscillator.connect(gainNode);
      if (typeof oscillator.noteOn !== "undefined") {
        oscillator.noteOn(0);
      }
      gainNode.connect(context.destination);
      return nodes.push(oscillator);
    });
    return keyboard.keyUp(function(note, frequency) {
      var c, i, name, _results;
      console.log("note", note, "frequency", frequency);
      if (note === window.live[window.current]) {
        window.current = window.current + 1;
        console.log("match", window.current);
        name = "#n" + (window.current - 1);
        $(name).addClass("done");
        if (window.live[window.current] === "break") {
          window.current = window.current + 1;
          c = ".c_" + window.current2;
          console.log("c", c);
          $(c).hide();
          window.current2 = window.current2 + 1;
        }
      }
      i = 0;
      _results = [];
      while (i < nodes.length) {
        if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
          if (typeof nodes[i].noteOff !== "undefined") {
            nodes[i].noteOff(0);
          }
          nodes[i].disconnect();
        }
        _results.push(i++);
      }
      return _results;
    });
  });

  window.toggle_slide = function() {
    return $("body").toggleClass("slide_left");
  };

  window.log_out = function() {
    Nimbus.Auth.logout();
    $("body").toggleClass("slide_left");
    return $("#loginModal").addClass("active");
  };

  window.current_song = {
    "title": "Tutorial",
    "song": ["C3", "D3", "E3", "F3", "G3", "break", "G3", "F3", "E3", "D3", "C3", "break", "C3", "C3", "G3", "G3", "A3", "A3", "G3", "break", "F3", "F3", "E3", "E3", "D3", "D3", "C3"]
  };

  window.call_me_baby = {
    "title": "Call Me Maybe",
    "song": ["B3", "B3", "B3", "B3", "B3", "A3", "B3", "break", "B3", "B3", "B3", "B3", "B3", "A3", "B3", "break", "B3", "B3", "B3", "B3", "B3", "A3", "A3", "break", "A3", "A3", "G3", "G3", "D4", "B3"]
  };

  window.skrillex = {
    "title": "Don't Stop Believing",
    "song": ["B3", "G3", "A3", "A3", "B3", "G3", "G3", "G3", "G3", "D4", "D4", "B3", "A3", "break", "D4", "B3", "G3", "A3", "A3", "B3", "A3", "G3", "A3", "B3", "G3"]
  };

  window.construct_instruction = function(total) {
    var a, counter, counter2, k, key, match, s, x, _i, _len, _ref, _results;
    $("#instruction").html("");
    x = "<h1 id=\"song_title\" style=\"color: rgba(255,255,255,0.7); font-weight: lighter; margin-left: 20px; margin-bottom: 10px;\">" + total.title + "</h1>";
    $("#instruction").append(x);
    window.live = total.song;
    window.current = 0;
    window.current2 = 0;
    match = {
      'C3': 'Do',
      'D3': 'Re',
      'E3': 'Me',
      'F3': 'Fa',
      'G3': 'So',
      'A3': "La",
      'B3': "Ti",
      "C4": "Do",
      "D4": "Re",
      "E4": "Me",
      "F4": "Fa"
    };
    key = {
      'C3': 'A',
      'D3': 'S',
      'E3': 'D',
      'F3': 'F',
      'G3': 'G',
      'A3': "H",
      'B3': "J",
      "C4": "K",
      "D4": "L",
      "E4": ":",
      "F5": "return"
    };
    counter = 0;
    counter2 = 0;
    _ref = total.song;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      console.log("a", a);
      if (a === "break") {
        $("#instruction").append("<div style= 'clear:both;'></div>");
        counter = counter + 1;
        counter2 = counter2 + 1;
        continue;
      }
      x = match[a];
      k = key[a];
      s = "<div class=\"note c_" + counter2 + "\" id=\"n" + counter + "\"><span class=\"what\">" + x + "</span> <br /><span class=\"key\">" + k + "</span></div>";
      console.log(s);
      $("#instruction").append(s);
      _results.push(counter = counter + 1);
    }
    return _results;
  };

}).call(this);
