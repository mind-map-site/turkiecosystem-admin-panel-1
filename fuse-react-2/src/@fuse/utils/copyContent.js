 function copyToClipboard(value) {
    navigator.clipboard.writeText(value)
        .then(() => {
            alert(`Copied to clipboard: ${value}`);
        })
        .catch((error) => {
            alert(`Failed to copy to clipboard: ${error}`);
        });
}

export default copyToClipboard;