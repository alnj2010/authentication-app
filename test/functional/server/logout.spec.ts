import { createMocks } from "node-mocks-http";
import handler from "@/pages/api/logout";


describe("endpoint POST /logout", () => {
  beforeEach(() => {});

  it("Should return code 200 when logout is success", async () => {
    const { req, res } = createMocks({
      method: "POST",
    });

    // @ts-ignore
    await handler(req, res);

    expect(res.getHeader("Set-Cookie")).toBeDefined();
    expect(res.statusCode).toBe(200);
  });
});
