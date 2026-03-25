/**
 * MCP API Key Authentication Middleware
 *
 * Validates the `Authorization: Bearer <key>` header on every request
 * to the MCP endpoint.  The expected key is read from the MCP_API_KEY
 * environment variable.
 *
 * Behaviour:
 *   - If MCP_API_KEY is not configured (empty string), the middleware
 *     logs a warning and ALLOWS the request through so that local
 *     development works without any extra setup.
 *   - In production (NODE_ENV === "production"), a missing or empty
 *     MCP_API_KEY causes the server to reject ALL requests with 503.
 *   - A wrong or missing bearer token always returns 401.
 *
 * Usage in Express:
 *   import { mcpAuthMiddleware } from "./_core/mcpAuth";
 *   app.post("/api/mcp", mcpAuthMiddleware, handleMcpRequest);
 */

import type { Request, Response, NextFunction } from "express";
import { ENV } from "./env";

export function mcpAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const configuredKey = ENV.mcpApiKey;

  // ── No key configured ─────────────────────────────────────────────────────
  if (!configuredKey) {
    if (ENV.isProduction) {
      // Hard block in production — operator must set MCP_API_KEY
      res.status(503).json({
        error: "MCP endpoint is not configured for external access.",
        code: "MCP_KEY_NOT_SET",
      });
      return;
    }
    // Development: warn and allow through
    console.warn(
      "[MCP Auth] MCP_API_KEY is not set. Endpoint is unprotected. " +
        "Set MCP_API_KEY in your environment before deploying to production."
    );
    next();
    return;
  }

  // ── Validate bearer token ─────────────────────────────────────────────────
  const authHeader = req.headers["authorization"] ?? "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    res.status(401).json({
      error: "Missing or malformed Authorization header. Expected: Bearer <key>",
      code: "MCP_MISSING_TOKEN",
    });
    return;
  }

  // Constant-time comparison to prevent timing attacks
  if (!timingSafeEqual(token, configuredKey)) {
    res.status(401).json({
      error: "Invalid API key.",
      code: "MCP_INVALID_TOKEN",
    });
    return;
  }

  next();
}

/**
 * Constant-time string comparison to prevent timing side-channel attacks.
 * Falls back to a simple XOR loop when the strings differ in length.
 */
function timingSafeEqual(a: string, b: string): boolean {
  // Pad the shorter string to avoid length-based timing leaks
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length !== b.length ? 1 : 0;
  for (let i = 0; i < maxLen; i++) {
    diff |= (a.charCodeAt(i % a.length) ^ b.charCodeAt(i % b.length));
  }
  return diff === 0;
}
