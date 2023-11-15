// public/script.js

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const fileLink = document.getElementById('fileLink');
        fileLink.innerHTML = `<strong>File Link:</strong> <a href="${data.fileLink}" target="_blank">${data.fileName}</a>`;

        // Display uploaded files
        const uploadedFilesContainer = document.getElementById('uploadedFiles');
        uploadedFilesContainer.innerHTML = '<strong>Uploaded Files:</strong>';
        data.uploadedFiles.forEach(file => {
            uploadedFilesContainer.innerHTML += `<div><a href="${file.fileLink}" target="_blank">${file.fileName}</a></div>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

// Fetch and display uploaded files on page load
window.onload = function() {
    fetch('/files')
        .then(response => response.json())
        .then(data => {
            const uploadedFilesContainer = document.getElementById('uploadedFiles');
            uploadedFilesContainer.innerHTML = '<strong>Uploaded Files:</strong>';
            data.forEach(file => {
                uploadedFilesContainer.innerHTML += `<div><a href="${file.fileLink}" target="_blank">${file.fileName}</a></div>`;
            });
        })
        .catch(error => console.error('Error:', error));
};
