// Get references to the form elements
const nameField = document.getElementById('name');
const torrentHosterField = document.getElementById('torrent-hoster');
const descriptionField = document.getElementById('description');
const torrentLinkField = document.getElementById('torrent-link');
const magnetLinkField = document.getElementById('magnet-link');
const streamField = document.getElementById('stream');
const moreinfoField = document.getElementById('more-info');
const photoField = document.getElementById('photo');
const seedersField = document.getElementById('seeders');
const sourceField = document.getElementById('source')
const ResField = document.getElementById('resolution')

let center = null;
let isVideoEmbedded = false;

// Get the generate button and attach a click event listener
const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', generateTorrentFile);

function generateTorrentFile(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Remove the old button code from the screen
  if (center !== null) {
    document.body.removeChild(center);
  }

  // Load the TFGT.html file using an XHR request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://raw.githubusercontent.com/HttpAnimation/Torrent-File-Generator/gh-pages/MoviesTFGT.html', true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Replace the placeholder text with the form data
      const template = this.responseText;
      const nameFieldValue = nameField.value.replace(/[^\w\s\.]/g, '');      const generatedFile = template
        .replace(/V2TorrentTemplate/g, nameFieldValue)
        .replace(/TEXT IN HERE/g, torrentHosterField.value)
        .replace(/Theres no Description for this torrent/g, descriptionField.value)
        .replace(/404Torrent.html/g, torrentLinkField.value)
        .replace(/404Magnet.html/g, magnetLinkField.value)
        .replace(/404Stream.html/g, streamField.value)
        .replace(/none.png/g, photoField.value)
        .replace(/UnkownSeeders/g, seedersField.value)
        .replace(/HostLink/g, torrentHosterField.value)
        .replace(/SOURCELink/g, sourceField.value)
        .replace(/69p/g, ResField.value);

      // Create a new Blob with the generated HTML code
      const blob = new Blob([generatedFile], {type: 'text/html'});

      // Save the Blob as a file with the name from the Torrent Name field
      const filename = nameFieldValue + '.html';
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.click();

      // Generate the button code
      const torrentName = nameFieldValue;
      const buttonCode = `<!-- ${torrentName} -->
<button class="button" onclick="window.location.href='${torrentName}.html'">${torrentName}</button>`;
      const pre = document.createElement('pre');
      pre.textContent = buttonCode;
      center = document.createElement('center');
      center.appendChild(pre);
      document.body.appendChild(center);

      // Clear the form fields after the file has been saved
      nameField.value = '';
      descriptionField.value = '';
      torrentLinkField.value = '';
      magnetLinkField.value = '';
      streamField.value = '';
      torrentHosterField.value = '';
      photoField.value = '';
      seedersField.value = '';
      sourceField.value = '';
    }
  };
  xhr.send();
}

// Get the copy button and attach a click event listener
const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', copyButton);

function copyButton() {
  // Get the button code from the pre element
  const buttonCode = document.querySelector('pre').textContent;

  // Copy the button code to the clipboard
  navigator.clipboard.writeText(buttonCode);

  // Change the text of the copy button to indicate that the code has been copied
  copyBtn.textContent = 'Button Code Copied!';
  setTimeout(function() {
    copyBtn.textContent = 'Copy Button script';
  }, 400);
}

// Function to embed or unembed the video
function toggleVideoEmbed() {
  const videoContainer = document.getElementById('video-container');
  
  if (isVideoEmbedded) {
    // Remove the video iframe from the container
    videoContainer.innerHTML = '';
    isVideoEmbedded = false;
  } else {
    // Embed the video iframe in the container
    const videoIframe = document.createElement('iframe');
    videoIframe.width = '1166';
    videoIframe.height = '656';
    videoIframe.src = 'https://www.youtube.com/embed/jmNhN1E683M';
    videoIframe.title = 'How to fill out TorrentFileGenerator';
    videoIframe.frameborder = '0';
    videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    videoIframe.allowfullscreen = true;
    videoContainer.appendChild(videoIframe);
    isVideoEmbedded = true;
  }
}
