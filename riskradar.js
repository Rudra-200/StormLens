document.addEventListener('DOMContentLoaded', function() {
    const imageUploadArea = document.getElementById('image-upload-area');
    const imageUpload = document.getElementById('image-upload');
    const analysisReport = document.getElementById('analysis-report');
    const analyzeButton = document.getElementById('analyze-button');
    
    let selectedImage = null;

    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImage = e.target.result;
                imageUploadArea.innerHTML = `<img src="${selectedImage}" alt="Selected" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
                analyzeButton.disabled = false;
            };
            reader.readAsDataURL(file);
        }
    });

    analyzeButton.addEventListener('click', function() {
        if (!selectedImage) return;
        
        analyzeButton.textContent = 'Analyzing...';
        analyzeButton.disabled = true;
        
        // Convert base64 image to blob
        fetch(selectedImage)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('image', blob, 'image.jpg');
    
                // Send image to backend for analysis
                fetch('http://localhost:5000/analyze', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    analysisReport.innerHTML = `<p>${data.message}</p>`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    analysisReport.innerHTML = '<p>An error occurred during analysis. Please try again.</p>';
                })
                .finally(() => {
                    analyzeButton.textContent = 'Analyse';
                    analyzeButton.disabled = false;
                });
            });
    });
});