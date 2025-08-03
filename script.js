document.getElementById('anonymousForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    
    // Disable form while sending
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'SENDING...';
    
    // Send email using Email.js
    // Save message (you can modify this to send to your backend)
    const newMessage = {
        id: Date.now(),
        message: message,
        timestamp: new Date().toLocaleString()
    };
    
    // Store in localStorage
    let messages = JSON.parse(localStorage.getItem('anonymousMessages') || '[]');
    messages.unshift(newMessage);
    ).then(function() {
        // Success
        submitButton.innerHTML = 'SENT! ✨';
        document.getElementById('anonymousForm').reset();
        
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
        
    }, function(error) {
        // Error
        console.error('Failed to send message:', error);
        submitButton.innerHTML = 'FAILED TO SEND';
        
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    });
});
