$ ->
  new FastClick(document.body)
  
  Nimbus.Auth.set_app_ready () ->
    console.log("app ready called")
    
    if Nimbus.Auth.authorized()
      $("#loginModal").removeClass("active")

  settings =
    id: "keyboard"
    width: 900
    height: 200
    startNote: "C4"
    whiteNotesColour: "white"
    blackNotesColour: "black"
    hoverColour: "yellow"
    keyboardLayout: "en"
  
  keyboard = qwertyHancock(settings)
  context = new webkitAudioContext()
  nodes = []
  keyboard.keyDown (note, frequency) ->
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