const app = require("../index");
const request = require("supertest");

describe("kegagalan get all transaksi", () => {
  test("daftar transaksi kosong", async () => {
    const response = await request(app).get("/api/v1/transactions");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Daftar data transaksi kosong" });
  });

  describe("CR Transaksi sukses", () => {
    test("sukses melakukan transaksi", async () => {
      const transaksi = {
        sourceAccountId: 4,
        destinationAccountId: 5,
        amount: 7500,
      };
      const response = await request(app)
        .post("/api/v1/transactions")
        .send(transaksi);

      expect(response.body).toHaveProperty("status", 201);
      expect(response.body).toHaveProperty("message", "Transaksi berhasil");
      expect(response.body).toHaveProperty("transaksi");

      expect(response.body.transaksi).toHaveProperty(
        "sourceAccountId",
        transaksi.sourceAccountId
      );
      expect(response.body.transaksi).toHaveProperty(
        "destinationAccountId",
        transaksi.destinationAccountId
      );
      expect(response.body.transaksi).toHaveProperty(
        "amount",
        transaksi.amount
      );
    });

    test("sukses get all daftar transaksi", async () => {
      const respons = await request(app).get("/api/v1/transactions");
      expect(respons.status).toBe(200);
      expect(respons.body).toHaveProperty("insertData");
      expect(respons.body).toHaveProperty(
        "message",
        "berhasil menampilkan daftar transaksi"
      );
    });

    test("sukses get detail transaksi", async () => {
      const respons = await request(app).get("/api/v1/transactions/2");
      expect(respons.status).toBe(200);
      expect(respons.body).toHaveProperty("data");
      expect(respons.body).toHaveProperty(
        "message",
        "berhasil menampilkan detail transaksi"
      );
    });
  });

  describe("kegagalan getbyid transaksi", () => {
    test("gagal menampilkan detail transaksi", async () => {
      const response = await request(app).get("/api/v1/transactions/200");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Data detail transaksi kosong",
      });
    });
  });

  describe("kemungkinan kegagalan create transaksi", () => {
    test("seluruh field kosong", async () => {
      const transaksi = {
        sourceAccountId: "",
        destinationAccountId: "",
        amount: "",
      };
      const response = await request(app)
        .post("/api/v1/transactions")
        .send(transaksi);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Mohon lengkapi semua data",
      });
    });

    test("beberapa field kosong", async () => {
      const transaksi = {
        sourceAccountId: "",
        destinationAccountId: 6,
        amount: 3000,
      };
      const response = await request(app)
        .post("/api/v1/transactions")
        .send(transaksi);

      expect(response.status).toBe(400);

      const fields = [];
      if (!transaksi.sourceAccountId) fields.push("sourceAccountId");
      if (!transaksi.destinationAccountId) fields.push("destinationAccountId");
      if (!transaksi.amount) fields.push("amount");

      const fieldke = `Isi data: ${fields.join(", ")}`;
      expect(response.body).toEqual({
        message: fieldke,
      });
    });
  });

  describe("Delete transaksi", () => {
    test("Data transaksi tidak ada", async () => {
      const response = await request(app).delete("/api/v1/transactions/300");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "tidak ada transaksi" });
    });
    test("Sukses hapus transaksi", async () => {
      const response = await request(app).delete("/api/v1/transactions/2");
      expect(response.body).toHaveProperty("status", 200);
      expect(response.body).toHaveProperty(
        "message",
        "berhasil hapus Transaksi"
      );
      expect(response.body).toHaveProperty("data");
    });
  });
});
