// script.js
document.getElementById('anonymousForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

    // Jika Anda punya input recipient di HTML:
    const recipient = document.getElementById('recipient').value; // Ambil nilai recipient
    // Jika recipient tidak ada di HTML dan Anda ingin mengirim ke email tertentu,
    // ganti baris di atas dengan:
    // const recipient = 'nama_email_anda@example.com'; // Ganti dengan email Anda yang sebenarnya

    const message = document.getElementById('message').value; // Ambil nilai pesan

    // Validasi sederhana: Pastikan pesan tidak kosong
    if (!message.trim()) {
        alert('Pesan tidak boleh kosong!');
        return;
    }
    // Jika Anda menggunakan recipient, tambahkan validasi untuk recipient juga
    if (document.getElementById('recipient') && !recipient.trim()) {
        alert('Email penerima tidak boleh kosong!');
        return;
    }
    // Menonaktifkan tombol saat mengirim
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'SENDING...';

    // Data yang akan dikirim ke Email.js (template_params)
    // Pastikan nama properti di sini cocok dengan placeholder di template Email.js Anda
    const templateParams = {
        from_name: 'ANONYM.us', // Nama pengirim yang akan muncul di email
        to_email: recipient,     // Email penerima
        message: message         // Isi pesan
    };

    // Panggil fungsi send dari Email.js
    // GANTI 'YOUR_SERVICE_ID' dan 'YOUR_TEMPLATE_ID'
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text); // Debugging di konsol

            // Jika email berhasil terkirim, baru simpan ke localStorage
            const newMessage = { // Buat objek pesan yang akan disimpan ke localStorage
                id: Date.now(),
                message: message,
                timestamp: new Date().toLocaleString(),
                recipient: recipient // Simpan juga recipient jika perlu
            };
            let messages = JSON.parse(localStorage.getItem('anonymousMessages') || '[]');
            messages.unshift(newMessage);
            localStorage.setItem('anonymousMessages', JSON.stringify(messages)); // Simpan kembali ke localStorage

            // Perbarui UI untuk sukses
            submitButton.innerHTML = 'SENT! ✨';
            document.getElementById('anonymousForm').reset(); // Reset form

            // Kembalikan tombol ke keadaan semula setelah beberapa saat
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);

        }, function(error) {
            console.log('FAILED...', error); // Debugging di konsol

            // Perbarui UI untuk error
            console.error('Failed to send message:', error);
            submitButton.innerHTML = 'FAILED TO SEND';

            // Kembalikan tombol ke keadaan semula setelah beberapa saat
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }, 2000);
        });
});