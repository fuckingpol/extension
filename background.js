var browser = (window.browser)? window.browser : window.chrome;

browser.contextMenus.create({
    id: "Report",
    title: "Report",
    contexts: ["image"]
});

// Need to pull the current filters
// If marked for hide then report as false
// If not marked for hide then report as true
// {"editable":false,"frameId":0,"linkUrl":"https://i.4cdn.org/b/1612267834478.jpg",
browser.contextMenus.onClicked.addListener(function(info, tab) {
     var storageCache = {};
     if (tab) {
        let submit = new XMLHttpRequest();
        




          browser.storage.sync.get(null, function(data) {
               var storageCache = JSON.stringify(data);
               var sendcode = ''

               var empty = ''


               storageCache = storageCache.split(',').join(empty);
               storageCache = storageCache.split('"').join(empty);
               storageCache = storageCache.split('{').join(empty);
               storageCache = storageCache.split('}').join(empty);
               settings = storageCache 

               storageCache = storageCache.split('delete:true').join(empty);
               storageCache = storageCache.split('delete:false').join(empty);
               storageCache = storageCache.split('exclusive:true').join(empty);
               storageCache = storageCache.split('exclusive:false').join(empty);
               storageCache = storageCache.split('hide:true').join(empty);
               storageCache = storageCache.split('hide:false').join(empty);
               storageCache = storageCache.split(':').join(empty);

               var check = storageCache.includes('true');
               if (check) {


                    submit.open('POST', "http://73.143.168.240:9999/submission/" + storageCache + "/" + info.srcUrl, true);
                    submit.send();
                    alert('Submitted! Thank you!')




               }


          });
     
     }
 });

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     var storageCache = {};
     browser.storage.sync.get(null, function(data) {
       var storageCache = JSON.stringify(data);
       var sendcode = ''
       
       var empty = ''

       
       storageCache = storageCache.split(',').join(empty);
       storageCache = storageCache.split('"').join(empty);
       storageCache = storageCache.split('{').join(empty);
       storageCache = storageCache.split('}').join(empty);
       settings = storageCache 

       storageCache = storageCache.split('delete:true').join(empty);
       storageCache = storageCache.split('delete:false').join(empty);
       storageCache = storageCache.split('exclusive:true').join(empty);
       storageCache = storageCache.split('exclusive:false').join(empty);
       storageCache = storageCache.split('hide:true').join(empty);
       storageCache = storageCache.split('hide:false').join(empty);

       var check = storageCache.includes('true');
       if (check) {
          
          var image = request.message;
          let xhr = new XMLHttpRequest();
     
          
          xhr.open('POST', "http://73.143.168.240:9999/" + image + '$' + storageCache, true);
          xhr.send();
     
          xhr.onreadystatechange = processRequest;
     
          function processRequest(e) {
          
               if (xhr.readyState == 4) {
                    var ok = 1

                    var regexp = /\$.*?\$/g;
                    var str = xhr.responseText;

                    var array = [...str.matchAll(regexp)];
                    var censor = false

                    
                    for(var i = 0; i < array.length; i++) {
                         var tem = array[i]
                         tem = String(tem)
                         var value = tem.split('$').join(empty);
                         var found = storageCache.includes(value);
                         if (found){
                              censor = true

                         }
                         
                    }

                    if (censor){
                         browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                              browser.tabs.sendMessage(tabs[0].id, {message: image}, function(response) {
                              //   console.log(response.farewell);
                              });
                         });
                         
                    }
                    
          
               }
          }
          
       }

     });
});
