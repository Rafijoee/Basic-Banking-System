    class BankAccount {
        constructor(email, password, balance = 0) {
            this.email = email;
            this.password = password;
            this.balance = balance;
            this.transactions = [];
            this.isLoggedIn = true; // untuk memasukkan data transaksi ke variabel kosong
        }
        // Method login() untuk login ke akun bank
        login() {
            let email = prompt("Masukkan email:");
            let password = prompt("Masukkan password:");
            if (email === this.email && password === this.password) {
                alert("Login berhasil!");
                this.dashboard(); // ke dashboard
            } else {
                alert("Login gagal! email atau password salah.");
                // kembali ke method login
            }
        }

        async dashboard() {
            let action;
            do {
                if (!this.isLoggedIn) return; // Jika sudah logout, hentikan dashboard
                
                action = prompt("Apa yang ingin kamu lakukan?\n(1) Tambah Saldo \n(2) Kurangi Saldo \n(3) Lihat Saldo \n(4) Lihat Riwayat Transaksi \n(5) Logout");
                
                switch (action) {
                    case '1':
                        try {
                            let message = await this.deposit();
                            alert(message);
                        } catch (error) {
                            alert(error);
                        }
                        break;
                    case '2':
                        try {
                            let message = await this.withdraw();
                            alert(message);
                        } catch (error) {
                            alert(error);
                        }
                        break;
                    case '3':
                        this.checkBalance();
                        break;
                    case '4':
                        this.checkTransactions();
                        break;
                    case '5':
                        alert("Kamu telah logout.");
                        this.isLoggedIn = false; // Set flag menjadi false
                        return; // Hentikan dashboard setelah logout
                    default:
                        alert("Pilihan tidak valid!");
                }
            } while (action !== '5');
        }
        

        deposit() {
            //penggunaan promise, untuk penggunaan async serta await
            return new Promise((resolve, reject) => {
                let amount = parseFloat(prompt("Masukkan jumlah yang ingin ditambahkan:"));
                if (!isNaN(amount) && amount > 0) {
                    setTimeout(() => {
                        this.balance += amount;
                        this.transactions.push(`Menambahkan saldo sebesar: ${amount}`);
                        resolve(`Saldo berhasil ditambahkan. Saldo saat ini: ${this.balance}`);
                    }, 2000);
                } else {
                    reject("Input tidak valid. Masukkan angka yang benar.");
                }
            });
        }

        withdraw() {
            //penggunaan promise, untuk penggunaan async serta await
            return new Promise((resolve, reject) => {
                let amount = parseFloat(prompt("Masukkan jumlah yang ingin ditarik:"));
                if (!isNaN(amount) && amount > 0) {
                    if (amount > this.balance) {
                        reject("Saldo tidak cukup!");
                    } else {
                        setTimeout(() => {
                            this.balance -= amount;
                            this.transactions.push(`Mengurangi saldo sebesar: ${amount}`);
                            resolve(`Saldo berhasil dikurangi. Saldo saat ini: ${this.balance}`);
                        }, 2000);
                    }
                } else {
                    reject("Input tidak valid. Masukkan angka yang benar.");
                }
            });
        }

        checkBalance () {
            alert(`Saldo saat ini: ${this.balance}`);
        }

        checkTransactions () {
            alert(`Riwayat transaksi: \n${this.transactions.join("\n")}`);
        }

    }

    let bank = new BankAccount('user@gmail.com', '12345', 1000000);
    bank.login();