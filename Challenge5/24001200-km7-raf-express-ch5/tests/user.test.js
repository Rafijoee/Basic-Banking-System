const request = require("supertest");
const app = require("../index");

describe("kegagalan get all user", () => {
  test("daftar user kosong", async () => {
    const response = await request(app).get("/api/v1/users");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Daftar Users tidak ada" });
  });
});

describe("CRU user sukses", () => {
  test("sukses menambah 1 user sekaligus profil", async () => {
    const user = {
      name: "Rafi Jauhari",
      email: "rafijauhari@gmail.com",
      password: "password",
      profile: {
        identify_type: "KTP",
        identify_number: "085179916463",
        address: "jalan mawar",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty("message", "Data user berhasil ditambahkan");
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty("identify_type", user.profile.identify_type);
    expect(response.body.insertData.profile).toHaveProperty("identify_number", user.profile.identify_number);
    expect(response.body.insertData.profile).toHaveProperty("address", user.profile.address);
  });

  test("sukses menambah data ke 2: user sekaligus profil", async () => {
    const user = {
      name: "Aulia Pratama",
      email: "aulia@gmail.com",
      password: "password123",
      profile: {
        identify_type: "KTP",
        identify_number: "085123456789",
        address: "jalan kenanga",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty("message", "Data user berhasil ditambahkan");
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty("identify_type", user.profile.identify_type);
    expect(response.body.insertData.profile).toHaveProperty("identify_number", user.profile.identify_number);
    expect(response.body.insertData.profile).toHaveProperty("address", user.profile.address);
  });

  test("sukses menambah data ke 3: user sekaligus profil", async () => {
    const user = {
      name: "Dimas Rahmat",
      email: "dimasrahmat@gmail.com",
      password: "password456",
      profile: {
        identify_type: "KTP",
        identify_number: "085987654321",
        address: "jalan melati",
      },
    };
    const response = await request(app).post("/api/v1/users").send(user);
    expect(response.body).toHaveProperty("status", 201);
    expect(response.body).toHaveProperty("message", "Data user berhasil ditambahkan");
    expect(response.body).toHaveProperty("insertData");
    expect(response.body.insertData).toHaveProperty("name", user.name);
    expect(response.body.insertData).toHaveProperty("email", user.email);
    expect(response.body.insertData).toHaveProperty("profile");
    expect(response.body.insertData.profile).toHaveProperty("identify_type", user.profile.identify_type);
    expect(response.body.insertData.profile).toHaveProperty("identify_number", user.profile.identify_number);
    expect(response.body.insertData.profile).toHaveProperty("address", user.profile.address);
  });

  // Remaining tests
});
