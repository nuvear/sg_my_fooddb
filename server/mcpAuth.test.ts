/**
 * Tests for MCP API Key Authentication Middleware
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

// ── Helpers ───────────────────────────────────────────────────────────────────
function mockReq(authHeader?: string): Request {
  return {
    headers: authHeader ? { authorization: authHeader } : {},
  } as unknown as Request;
}

function mockRes() {
  const res = {
    _status: 0,
    _body: {} as unknown,
    status(code: number) {
      this._status = code;
      return this;
    },
    json(body: unknown) {
      this._body = body;
      return this;
    },
  };
  return res;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("mcpAuthMiddleware — no key configured (development)", () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.MCP_API_KEY;
    process.env.NODE_ENV = "test";
  });

  it("allows request through with a warning when MCP_API_KEY is not set in dev", async () => {
    delete process.env.MCP_API_KEY;
    process.env.NODE_ENV = "development";
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq();
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res._status).toBe(0);
  });
});

describe("mcpAuthMiddleware — no key configured (production)", () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.MCP_API_KEY;
    process.env.NODE_ENV = "test";
  });

  it("returns 503 when MCP_API_KEY is not set in production", async () => {
    delete process.env.MCP_API_KEY;
    process.env.NODE_ENV = "production";
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq();
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(503);
    expect((res._body as Record<string, string>).code).toBe("MCP_KEY_NOT_SET");
    expect(next).not.toHaveBeenCalled();
  });
});

describe("mcpAuthMiddleware — key configured", () => {
  const TEST_KEY = "test-secret-key-abc123";

  afterEach(() => {
    vi.resetModules();
    delete process.env.MCP_API_KEY;
  });

  it("allows request with correct bearer token", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq(`Bearer ${TEST_KEY}`);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res._status).toBe(0);
  });

  it("returns 401 for wrong bearer token", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq("Bearer wrong-key");
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect((res._body as Record<string, string>).code).toBe("MCP_INVALID_TOKEN");
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header is missing", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq(); // no auth header
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect((res._body as Record<string, string>).code).toBe("MCP_MISSING_TOKEN");
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when scheme is not Bearer (e.g. Basic)", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq(`Basic ${TEST_KEY}`);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect((res._body as Record<string, string>).code).toBe("MCP_MISSING_TOKEN");
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when Authorization header has no token value", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq("Bearer");
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect((res._body as Record<string, string>).code).toBe("MCP_MISSING_TOKEN");
    expect(next).not.toHaveBeenCalled();
  });

  it("is case-insensitive for the Bearer scheme", async () => {
    process.env.MCP_API_KEY = TEST_KEY;
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq(`BEARER ${TEST_KEY}`);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res._status).toBe(0);
  });
});

describe("Timing-safe comparison", () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.MCP_API_KEY;
  });

  it("rejects keys that differ only in the last character", async () => {
    process.env.MCP_API_KEY = "secret-key-abc";
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq("Bearer secret-key-abX");
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects keys that are a prefix of the correct key", async () => {
    process.env.MCP_API_KEY = "secret-key-full";
    const { mcpAuthMiddleware } = await import("./_core/mcpAuth");

    const req = mockReq("Bearer secret-key");
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    mcpAuthMiddleware(req, res as unknown as Response, next);

    expect(res._status).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });
});
