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

    const mouseGradient = document.getElementById('mouse-gradient');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX; 
    let targetY = mouseY; 
    const speed = 0.08; 

    function updateFluidGradient() {
        // Hanya update gradien jika layar lebih besar dari 768px (desktop)
        if (window.innerWidth >= 768) {
            mouseX += (targetX - mouseX) * speed;
            mouseY += (targetY - mouseY) * speed;
        }
        mouseGradient.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(139, 92, 246, 0) 90%)`;

        requestAnimationFrame(updateFluidGradient);
    }

    // Variabel untuk kursor kustom (lingkaran dan titik)
    const mouseRing = document.getElementById('mouse-ring'); 
    const mouseDot = document.getElementById('mouse-dot');
    const body = document.body;

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    const dotSpeed = 0.2;
    const ringSpeed = 0.08;

    function updateCustomMouseTracker() {
        // Hanya update kursor jika layar lebih besar dari 768px (desktop)
        if (window.innerWidth >= 768) {
            const targetTrackerX = targetX;
            const targetTrackerY = targetY;

            dotX += (targetTrackerX - dotX) * dotSpeed;
            dotY += (targetTrackerY - dotY) * dotSpeed;

            ringX += (targetTrackerX - ringX) * ringSpeed;
            ringY += (targetTrackerY - ringY) * ringSpeed;
            
            body.style.setProperty('--mouse-x', `${dotX}px`);
            body.style.setProperty('--mouse-y', `${dotY}px`);

            mouseDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            mouseRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(updateCustomMouseTracker);
    }

    window.addEventListener('mousemove', (e) => {
        // Hanya update posisi target kursor jika layar lebih besar dari 768px
        if (window.innerWidth >= 768) {
            targetX = e.clientX;
            targetY = e.clientY;
        }
    });
    
    // Perubahan kursor saat hover pada elemen interaktif
    const interactiveElements = document.querySelectorAll('a, button, textarea');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 768) {
                body.classList.add('hovering-cursor');
            }
        });

        element.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 768) {
                body.classList.remove('hovering-cursor');
            }
        });
    });

    // Jalankan animasi saat halaman dimuat
    requestAnimationFrame(updateFluidGradient);
    requestAnimationFrame(updateCustomMouseTracker);