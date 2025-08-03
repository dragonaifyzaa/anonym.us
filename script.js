// script.js
document.getElementById('anonymousForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

    // Tentukan email penerima secara langsung di sini.
    // GANTI DENGAN EMAIL TUJUAN ANDA UNTUK MENERIMA PESAN ANONIM.
    const recipientEmail = 'TUJUAN_EMAIL_ANDA@contoh.com'; // <--- GANTI INI!

    const message = document.getElementById('message').value; // Ambil nilai pesan dari textarea

    // Validasi sederhana: Pastikan pesan tidak kosong
    if (!message.trim()) {
        alert('Pesan tidak boleh kosong!'); //
        return; //
    }

    // Menonaktifkan tombol saat mengirim
    const submitButton = this.querySelector('button[type="submit"]'); //
    const originalButtonText = submitButton.innerHTML; //
    submitButton.disabled = true; //
    submitButton.innerHTML = 'SENDING...'; //

    // Data yang akan dikirim ke Email.js (template_params)
    // Pastikan nama properti di sini cocok dengan placeholder di template Email.js Anda
    const templateParams = {
        from_name: 'ANONYM.us', // Nama pengirim yang akan muncul di email
        to_email: recipientEmail, // Email penerima yang sudah Anda tentukan di atas
        message: message         // Isi pesan dari form
    };

    // Panggil fungsi send dari Email.js
    // PENTING: GANTI 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID' dengan milik Anda dari Email.js dashboard!
    emailjs.send('service_6vty9m5', 'template_qd74snn', templateParams) //
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text); // Debugging di konsol

            // Jika email berhasil terkirim, baru simpan ke localStorage
            const newMessage = { // Buat objek pesan yang akan disimpan ke localStorage
                id: Date.now(), //
                message: message, //
                timestamp: new Date().toLocaleString() //
                // Tidak perlu menyimpan 'recipient' di localStorage jika tidak ada di UI
            };
            let messages = JSON.parse(localStorage.getItem('anonymousMessages') || '[]'); //
            messages.unshift(newMessage); //
            localStorage.setItem('anonymousMessages', JSON.stringify(messages)); // Simpan kembali ke localStorage

            // Perbarui UI untuk sukses
            submitButton.innerHTML = 'SENT! ✨'; //
            document.getElementById('anonymousForm').reset(); // Reset form

            // Kembalikan tombol ke keadaan semula setelah beberapa saat
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText; //
                submitButton.disabled = false; //
            }, 2000); //

        }, function(error) {
            console.log('FAILED...', error); // Debugging di konsol

            // Perbarui UI untuk error
            console.error('Failed to send message:', error); //
            submitButton.innerHTML = 'FAILED TO SEND'; //

            // Kembalikan tombol ke keadaan semula setelah beberapa saat
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText; //
                submitButton.disabled = false; //
            }, 2000); //
        });
});