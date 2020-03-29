const request = require("supertest");
const app = require("../../src/app");
const conexao = require("../../src/database/connection");

describe("Routes: ONG", () => {

	beforeEach(async () => {
		await conexao.migrate.rollback();
		await conexao.migrate.latest();
	});

	afterAll(async () => {
		await conexao.destroy();
	});

	it("should be able to create a new ONG", async () => {
		const response = await request(app)
			.post("/ongs")
			.send({
				nome: "OMS",
				email: "oms@teste.com",
				whatsapp: "6800000000",
				cidade: "Rio de Janeiro",
				uf: "RJ"
			});

			expect(response.body).toHaveProperty("id");
			expect(response.body.id).toHaveLength(8);
				
	})
});