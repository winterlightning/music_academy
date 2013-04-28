$ ->
  new FastClick(document.body)
  
  Nimbus.Auth.set_app_ready () ->
    console.log("app ready called")
    
    if Nimbus.Auth.authorized()
      $("#loginModal").removeClass("active")

  window.construct_instruction(window.current_song)

  settings =
    id: "keyboard"
    width: 900
    height: 200
    startNote: "C3"
    whiteNotesColour: "white"
    blackNotesColour: "black"
    hoverColour: "yellow"
    keyboardLayout: "en"
  
  keyboard = qwertyHancock(settings)
  context = new webkitAudioContext()
  nodes = []
  keyboard.keyDown (note, frequency) ->
    
    console.log("note", note, "frequency", frequency)
    
    oscillator = context.createOscillator()
    gainNode = context.createGainNode()
    oscillator.type = 1
    oscillator.frequency.value = frequency
    gainNode.gain.value = 0.3
    oscillator.connect gainNode
    oscillator.noteOn 0  if typeof oscillator.noteOn isnt "undefined"
    gainNode.connect context.destination
    nodes.push oscillator
  
  keyboard.keyUp (note, frequency) ->
    console.log("note", note, "frequency", frequency)
    
    if note is window.current_song[window.current]
      window.current = window.current + 1
      console.log("match", window.current)
      name = "#n" + (window.current-1)
      $(name).addClass("done")
    
    i = 0
  
    while i < nodes.length
      if Math.round(nodes[i].frequency.value) is Math.round(frequency)
        nodes[i].noteOff 0  if typeof nodes[i].noteOff isnt "undefined"
        nodes[i].disconnect()
      i++

window.toggle_slide = () ->
  $("body").toggleClass("slide_left")
  
#log out and delete everything in localstorage
window.log_out = ->
  Nimbus.Auth.logout()
  $("body").toggleClass("slide_left")
  $("#loginModal").addClass("active")
  
window.current_song = ["C3", "D3", "E3", "F3", "G3"]

window.construct_instruction = (song) ->
  window.current = 0
  match = 
    'C3': 'Do'
    'D3': 'Re'
    'E3': 'Me'
    'F3': 'Fa'
    'G3': 'So'
    'A3': "La"
    'B3': "Se"
    "C3": "Do"   
    
  key = 
    'C3': 'A'
    'D3': 'S'
    'E3': 'D'
    'F3': 'F'
    'G3': 'G'
    'A3': "A"
    'B3': "B"
    "C3": "C"     
  
  counter = 0
  for a in song
    x = match[a]
    k = key[a]
    s = """"<div class="note" id="n#{ counter }"><span class="what">#{ x }</span> <br /><span class="key">#{ k }</span></div>"""
    console.log(s)
    $("#instruction").append(s)
    counter = counter + 1