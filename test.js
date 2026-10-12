
const test = require("node:test");
const assert = require("node:assert");
const app = require("./server");

test("GET /health returns healthy status", async () => {
    const server = app.listen(0);

    try {
        const address = server.address();
        const response = await fetch(
            `http://127.0.0.1:${address.port}/health`
        );

        assert.strictEqual(response.status, 200);

        const data = await response.json();

        assert.deepStrictEqual(data, {
            status: "healthy"
        });
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) reject(error);
                else resolve();
            });
        });
    }
});
