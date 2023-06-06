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
    /*
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [color],
      func: setColor
    });
    */

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: refresh_search
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

function refresh_search(){

  const $button=document.getElementsByClassName('btn-main');

  if ( typeof counter == 'undefined' ) {
    counter = 0;
  }
  else{
    counter++;
  }


  if ( typeof intervalId == 'undefined' ) {
    intervalId = setInterval(refresh_search, 1000);
  }

  console.log(counter);

  if(counter > 10) {
    counter = 0;

    const $checkbox = document.getElementById('OnlyAvailablePackages').checked = true;

    $button[0].style.backgroundColor = 'green';
    $button[0].click();
  }
  else{
    $button[0].innerHTML = counter;
  }
}
