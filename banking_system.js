class BankAccount {
    constructor (email, password, balance = 0) {
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.transactions = [];
    }// Method login() untuk login ke akun bank

    login() {
        let email = prompt("Masukkan email:");
        let password = prompt("Masukkan password:");
        if (email === this.email && password === this.password) {
            alert("Login berhasil!");
            this.dashboard();
        } else {
            alert("Login gagal! email atau password salah.");
        }
    }

    async dashboard(){
        let action;
        do {
            action = prompt("Apa yang ingin kamu lakukan?\n(1) Tambah Saldo \n(2) Kurangi Saldo \n(3) Lihat Saldo \n(4) Lihat Riwayat Transaksi \n(5) Logout");
            switch (action) {
                case '1':
                    try {
                        let message = await this.deposit();
                        alert(message);
                        this.dashboard(); // Kembali ke dashboard setelah deposit berhasil
                    } catch (error) {
                        alert(error);
                        this.dashboard(); // Kembali ke dashboard setelah error
                    }break;
                    case '2':
                        try {
                            const message = await this.withdraw(); // Menggunakan await untuk menunggu hingga withdraw selesai
                            alert(message);
                        } catch (error) {
                            alert(error);
                        }
                case '3':
                    this.checkBalance();
                    break;
                case '4':
                    this.checkTransactions();
                    break;
                case '5':
                    alert("Kamu telah logout.");
                    break;
                default:
                    alert("Pilihan tidak valid!");
            }
    } while (action !== '5');
    }

    deposit() {
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