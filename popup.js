// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




let count=0;
const changeColorButton = document.getElementById('changeColor');



chrome.storage.local.set({ 'count': 0 }).then(() => {
  console.log("Value is set");
});


// Retrieve the color from storage and update the button's style and value
chrome.storage.sync.get('color', ({ color }) => {
  changeColorButton.style.backgroundColor = color;
  changeColorButton.setAttribute('value', color);
});

changeColorButton.addEventListener('click', (event) => {
  const color = event.target.value;

  // Query the active tab before injecting the content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Use the Scripting API to execute a script
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: init_app
    });

  });
});

function setColor(color) {
  // There's a typo in the line below;
  // ❌ colors should be ✅ color.
  const $button=document.getElementsByClassName('btn-main');
  //document.body.style.backgroundColor = color;

  //$button[0].style.backgroundColor = 'yellow';
  //$button[0].click();


}






function init_app(){
  var refresh_search=function(){
    const $button=document.getElementsByClassName('btn-main');
    const $packages_list=document.getElementsByClassName('packages-list');

    console.log($packages_list[0].childNodes.length);

    if ( typeof new_package == 'undefined' ) {
      new_package = false;
    }


    if($packages_list[0].childNodes.length > 0 && new_package == false ) {
      new_package = true;
      let beat = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      beat.loop = true;
      beat.play();
    }



    if ( typeof counter == 'undefined' ) {
      counter = 0;
    }
    else{
      counter++;
    }

    if ( typeof intervalId == 'undefined' ) {
      intervalId = setInterval(refresh_search, 1000);
    }

    if(counter > 5) {
      counter = 0;
      document.getElementById('OnlyAvailablePackages').checked = true;
      //$button[0].style.backgroundColor = 'green';
      if(new_package == false) {
        $button[0].click();
      }
    }
    else{
      //$button[0].innerHTML = counter;

      const $counter_div = document.getElementById('counter-div')
      $counter_div.innerHTML = '<h1>' + counter + '</h1>';
    }
  };

  const $counter_div = document.getElementById('counter-div')
  console.log($counter_div);

  if(typeof $counter_div  == 'undefined' || $counter_div == null ) {
    const $profileMenu = document.getElementById('profileMenu');
    const $para = document.createElement("div");
    $para.setAttribute("id", "counter-div");
    $para.innerHTML = "0";
    //const $node = document.createElement("0");
    //$node.setAttribute("id", "counter");
    //$para.appendChild($node);
    $profileMenu.appendChild($para);
  }

  refresh_search();


}
