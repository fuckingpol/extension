// Asks background.js to send out to the server if image is ok
function clean() {
     var elements = document.getElementsByTagName('img');

     for (var i = 0; i < elements.length; i++) {
     
          var element = elements[i];
          var text = element.src;
          if (element.swapped != 1) {

               var pic = document.createElement("img");
               pic = element
               pic.swapped = 1
               pic.replaced = 0
               pic.original = text
               // pic.src = text
               // pic.src = 'https://www.houseofcharity.org/wp-content/uploads/2019/07/White-Square.jpg'
               
               element.parentNode.replaceChild(pic, element);
               
               // chrome.runtime.sendMessage(text);
               
               chrome.runtime.sendMessage({message: text}, function(response) {
                    // respond(response, text)
                  });
               
          }
          // Have this trigger the check
     };
}

// Triggers if background.js gets the response to censor
chrome.runtime.onMessage.addListener(
     function(request, sender, sendResponse) {
          var elements = document.getElementsByTagName('img');
          for (var i = 0; i < elements.length; i++) {
          
               var element = elements[i];
               var text = element.src;
               if (element.src == request.message) {
     
                    var pic = document.createElement("img");
                    pic = element
                    pic.swapped = 1
                    pic.src = text
                    pic.style.cssText = element.style.cssText + ' filter: brightness(0%);';
                    // pic.replaced = 1
                    // pic.original = text
                    // pic.src = 'https://i.imgur.com/wwedB2C.png'
                    
                    element.parentNode.replaceChild(pic, element);
                    
               }
               // Have this trigger the check
          };
     
     
     });

// Re-initiates in-case of dynamic content
switch (document.readyState) {
     case "loading":
          clean
     case "interactive":
          clean
          var loop = setInterval(clean, 10);
   }