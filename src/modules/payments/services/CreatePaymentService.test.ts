import test from "node:test";
import assert from "node:assert/strict";
import { CreatePaymentService } from "./CreatePaymentService";
import { UpdatePaymentService } from "./UpdatePaymentService";

test("CreatePaymentService should reject payments for a non-existent sale", async () => {
  const repository = {
    create: async () => ({ id: "payment-1" }),
    findById: async () => null,
    findAll: async () => [],
    update: async () => ({ id: "payment-1" }),
    delete: async () => undefined,
    findSaleById: async () => null,
    getTotalPaidForSale: async () => 0,
  } as any;

  const service = new CreatePaymentService(repository);

  await assert.rejects(
    () => service.execute("sale-404", "PIX", 100, 1),
    /Venda não encontrada/
  );
});

test("CreatePaymentService should reject payments that exceed the sale total", async () => {
  const repository = {
    create: async () => ({ id: "payment-1" }),
    findById: async () => null,
    findAll: async () => [],
    update: async () => ({ id: "payment-1" }),
    delete: async () => undefined,
    findSaleById: async () => ({ id: "sale-1", valor_final: 100, status: "FINALIZADA" }),
    getTotalPaidForSale: async () => 80,
  } as any;

  const service = new CreatePaymentService(repository);

  await assert.rejects(
    () => service.execute("sale-1", "PIX", 30, 1),
    /excede o valor final/i
  );
});

test("UpdatePaymentService should reject updates that exceed the sale total", async () => {
  const repository = {
    create: async () => ({ id: "payment-1" }),
    findById: async () => ({ id: "payment-1", venda_id: "sale-1", valor: 40 }),
    findAll: async () => [],
    update: async () => ({ id: "payment-1" }),
    delete: async () => undefined,
    findSaleById: async () => ({ id: "sale-1", valor_final: 100, status: "FINALIZADA" }),
    getTotalPaidForSale: async () => 90,
  } as any;

  const service = new UpdatePaymentService(repository);

  await assert.rejects(
    () => service.execute("payment-1", "PIX", 60, 1),
    /excede o valor final/i
  );
});
