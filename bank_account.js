class BankAccount {
    constructor(email, password, saldoAwal = 0) {
        this.email = email;
        this.password = password;
        this.saldo = saldoAwal;
        this.transaksi = []; 
    }

    login() {
        let email = prompt("Masukkan email:");
        let Password = prompt("Masukkan password:");
        if (email === this.email && Password === this.password) {
            alert("Login berhasil!");
            this.dashboard();
        } else {
            alert("Login gagal! email atau password salah.");
        }
    }

    dashboard() {
        let action;
        do {
            action = prompt("Apa yang ingin kamu lakukan?\n(1) Tambah Saldo \n(2) Kurangi Saldo \n(3) Lihat Saldo \n(4) Lihat Riwayat Transaksi \n(5) Logout");
            switch (action) {
                case '1':
                    this.tambahSaldo();
                    break;
                case '2':
                    this.kurangiSaldo();
                    break;
                case '3':
                    this.lihatSaldo();
                    break;
                case '4':
                    this.lihatRiwayat();
                    break;
                case '5':
                    alert("Kamu telah logout.");
                    break;
                default:
                    alert("Pilihan tidak valid!");
            }
        } while (action !== '5');
    }

    // Fungsi menambah saldo
    tambahSaldo() {
        let jumlah = parseFloat(prompt("Masukkan jumlah yang ingin ditambahkan:"));
        if (!isNaN(jumlah) && jumlah > 0) {
            this.saldo += jumlah;
            this.transaksi.push(`Menambahkan saldo sebesar: ${jumlah}`);
            alert(`Saldo berhasil ditambahkan. Saldo saat ini: ${this.saldo}`);
        } else {
            alert("Input tidak valid. Masukkan angka yang benar.");
        }
    }

    // Fungsi mengurangi saldo dengan batas penarikan maksimal per transaksi
    kurangiSaldo() {
        let jumlah = parseFloat(prompt("Masukkan jumlah yang ingin ditarik (Batas maksimal Rp. 5.000.000):"));
        const batasPenarikan = 5000000;
        
        if (!isNaN(jumlah) && jumlah > 0 && jumlah <= this.saldo) {
            if (jumlah <= batasPenarikan) {
                this.saldo -= jumlah;
                this.transaksi.push(`Mengurangi saldo sebesar: ${jumlah}`);
                alert(`Saldo berhasil dikurangi. Saldo saat ini: ${this.saldo}`);
            } else {
                alert("Jumlah penarikan melebihi batas maksimal per transaksi.");
            }
        } else if (jumlah > this.saldo) {
            alert("Jumlah yang ditarik melebihi saldo yang ada.");
        } else {
            alert("Input tidak valid. Masukkan angka yang benar.");
        }
    }

    // Fungsi melihat saldo
    lihatSaldo() {
        alert(`Saldo saat ini: ${this.saldo}`);
    }

    // Fungsi melihat riwayat transaksi
    lihatRiwayat() {
        if (this.transaksi.length > 0) {
            alert("Riwayat Transaksi:\n" + this.transaksi.join("\n"));
        } else {
            alert("Belum ada transaksi.");
        }
    }
}

// Membuat akun bank dan memulai login
let akun = new BankAccount('user@gmail.com', 'password', 5000);
akun.login();
