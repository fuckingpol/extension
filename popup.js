// Need to save this
function save_options() {
    var inputs = document.getElementsByTagName('input');

    for(var i = 0; i < inputs.length; i++) {
        var name = inputs[i].id;
        var key = inputs[i].checked;

        var chungus = inputs[i]
        chrome.storage.sync.set({
            [name]: key
        },);
        
    }
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    var inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++) {

        var name = inputs[i].id;
        var id = ''
        fuckinggod = JSON.stringify(inputs[i].id);
        // alert(id)
        

        chrome.storage.sync.get({
            [name]: false
        }, function(items) {
            let re = new RegExp('".+"');
            id = re.exec(JSON.stringify(items))
            id = String(id)
            id = id.replace('"', '');
            id = id.replace('"', '');
            

            let re2 = new RegExp(':.+}');
            value = re2.exec(JSON.stringify(items))
            value = String(value)
            value = value.replace(':', '');
            value = value.replace('}', '');
            var isTrueSet = (value == 'true');
            document.getElementById(id).checked = isTrueSet;
            
        });
        

    }
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click',
      save_options);
  }