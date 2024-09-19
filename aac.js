// content.js
function injectScript(file) {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL(file);
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

injectScript('api.js');

// Override the click event of the analyze button
document.addEventListener('DOMContentLoaded', (event) => {
    const analyzeButton = document.getElementById('analyze-button');
    if (analyzeButton) {
        analyzeButton.addEventListener('click', async () => {
            analyzeButton.disabled = true;
            analyzeButton.textContent = 'Analyzing...';
            analyzeButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            analyzeButton.classList.add('bg-gray-500');

            try {
                // We need to communicate with the injected script
                const result = await new Promise((resolve) => {
                    window.postMessage({ type: "ANALYZE_STORM", values: window.values }, "*");
                    window.addEventListener("message", function(event) {
                        if (event.data.type === "ANALYZE_STORM_RESULT") {
                            resolve(event.data.result);
                        }
                    }, { once: true });
                });
                
                document.getElementById('result').textContent = `Storm Intensity: ${result.intensity.toFixed(2)} (on a scale of 0-5)`;
            } catch (error) {
                document.getElementById('result').textContent = 'An error occurred during analysis. Please try again.';
            } finally {
                analyzeButton.disabled = false;
                analyzeButton.textContent = 'Analyse';
                analyzeButton.classList.remove('bg-gray-500');
                analyzeButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }
        });
    }
});