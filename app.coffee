$ ->
  new FastClick(document.body)
  
  Nimbus.Auth.set_app_ready () ->
    console.log("app ready called")
    
    if Nimbus.Auth.authorized()
      $("#loginModal").removeClass("active")
     
window.toggle_slide = () ->
  $("body").toggleClass("slide_left")
  
#log out and delete everything in localstorage
window.log_out = ->
  Nimbus.Auth.logout()
  $("body").toggleClass("slide_left")
  $("#loginModal").addClass("active")