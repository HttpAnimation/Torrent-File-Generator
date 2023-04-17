// Get references to the form elements
const nameField = document.getElementById('name');
const torrentHosterField = document.getElementById('torrent-hoster');
const descriptionField = document.getElementById('description');
const torrentLinkField = document.getElementById('torrent-link');
const magnetLinkField = document.getElementById('magnet-link');
const streamField = document.getElementById('stream');

// Get the generate button and attach a click event listener
const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', generateTorrentFile);

function generateTorrentFile() {
  // Load the TFGT.html file using an XHR request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'TFGT.html', true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Replace the placeholder text with the form data
      const template = this.responseText;
      const generatedFile = template
        .replace(/V2TorrentTemplate/g, nameField.value)
        .replace(/TEXT IN HERE/g, torrentHosterField.value)
        .replace(/Theres no Description for this torrent/g, descriptionField.value)
        .replace(/404Torrent.html/g, torrentLinkField.value)
        .replace(/404Magnet.html/g, magnetLinkField.value)
        .replace(/404Steam.html/g, streamField.value);

      // Create a new Blob with the generated HTML code
      const blob = new Blob([generatedFile], {type: 'text/html'});

      // Save the Blob as a file with the name from the Torrent Name field
      const filename = nameField.value + '.html';
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.click();

      // Generate the button code
      const torrentName = nameField.value;
      const buttonCode = `<!-- ${torrentName} -->
        <button class="button" onclick="window.location.href='${torrentName}.html'">${torrentName}</button>`;
      const pre = document.createElement('pre');
      pre.textContent = buttonCode;
      const center = document.createElement('center');
      center.appendChild(pre);
      document.body.appendChild(center);

      // Clear the form fields after the file has been saved
      nameField.value = '';
      descriptionField.value = '';
      torrentLinkField.value = '';
      magnetLinkField.value = '';
      streamField.value = '';
      torrentHosterField.value = '';
    }
  };
  xhr.send();
}