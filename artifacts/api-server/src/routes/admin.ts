import { Router } from "express";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { createHash } from "crypto";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

export function hashPassword(password: string): string {
  return createHash("sha256").update(password + (process.env.SESSION_SECRET || "ymkcoe-secret-key")).digest("hex");
}

router.post("/admin/login", async (req, res) => {
  const body = AdminLoginBody.safeParse(req.body);
  if (!body.success) { res.status(400).json({ error: "Invalid input" }); return; }

  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.username, body.data.username));
  if (!admin || admin.passwordHash !== hashPassword(body.data.password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  req.session.adminId = admin.id;
  res.json({ id: admin.id, username: admin.username, isAdmin: admin.isAdmin });
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/me", async (req, res) => {
  const adminId = req.session.adminId;
  if (!adminId) { res.status(401).json({ error: "Not authenticated" }); return; }

  const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.id, adminId));
  if (!admin) { res.status(401).json({ error: "Not authenticated" }); return; }

  res.json({ id: admin.id, username: admin.username, isAdmin: admin.isAdmin });
});

router.get("/admin/users", async (req, res) => {
  if (!req.session.adminId) { res.status(401).json({ error: "Not authenticated" }); return; }
  const users = await db.select({
    id: adminsTable.id,
    username: adminsTable.username,
    createdAt: adminsTable.createdAt,
  }).from(adminsTable);
  res.json(users);
});

router.post("/admin/users", async (req, res) => {
  if (!req.session.adminId) { res.status(401).json({ error: "Not authenticated" }); return; }
  const { username, password } = req.body;
  if (!username || !password) { res.status(400).json({ error: "Username and password are required" }); return; }
  
  const [exists] = await db.select().from(adminsTable).where(eq(adminsTable.username, username));
  if (exists) { res.status(400).json({ error: "Username already exists" }); return; }

  const hash = hashPassword(password);
  const [newAdmin] = await db.insert(adminsTable).values({
    username,
    passwordHash: hash,
  }).returning();
  
  res.status(201).json({
    id: newAdmin.id,
    username: newAdmin.username,
    createdAt: newAdmin.createdAt,
  });
});

router.delete("/admin/users/:id", async (req, res) => {
  const currentAdminId = req.session.adminId;
  if (!currentAdminId) { res.status(401).json({ error: "Not authenticated" }); return; }
  
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid ID" }); return; }
  
  if (id === currentAdminId) {
    res.status(400).json({ error: "You cannot delete your own account" });
    return;
  }

  await db.delete(adminsTable).where(eq(adminsTable.id, id));
  res.status(204).end();
});

export default router;
