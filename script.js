// script.js
document.getElementById('anonymousForm').addEventListener('submit', function(e) {
    e.preventDefault();


    const recipientEmail = 'TUJUAN_EMAIL_ANDA@contoh.com';

    const message = document.getElementById('message').value;

    if (!message.trim()) {
        alert('Pesan tidak boleh kosong!');
        return;
    }

    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'SENDING...';

    const templateParams = {
        from_name: 'ANONYM.us',
        to_email: recipientEmail,
        message: message     
    };

    emailjs.send('service_6vty9m5', 'template_qd74snn', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);

            const newMessage = {
                id: Date.now(), 
                message: message, 
                timestamp: new Date().toLocaleString() 
               
            };
            let messages = JSON.parse(localStorage.getItem('anonymousMessages') || '[]'); 
            messages.unshift(newMessage); 
            localStorage.setItem('anonymousMessages', JSON.stringify(messages)); 

           
            submitButton.innerHTML = 'SENT! ✨';
            document.getElementById('anonymousForm').reset();

            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);

        }, function(error) {
            console.log('FAILED...', error);

            
            console.error('Failed to send message:', error);
            submitButton.innerHTML = 'FAILED TO SEND';

            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        });
});

