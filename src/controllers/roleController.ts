import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient;

export const getRole = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 1
        const cursor = req.query.cursor as string;

        if (limit > 100) {
            return res.status(500).json({
                message: "Invalid pagination parameter"
            })
        }

        const roles = await prisma.role.findMany({
            where: {
                ...(cursor && {
                    id: {
                        gt: parseInt(cursor, 10)
                    }
                })
            },
            take: limit + 1,
            orderBy: {
                id: "asc"
            }
        })
    
        const hasMore = roles.length > limit;
        const items = hasMore ? roles.slice(0, -1) : roles;
        const nextCursor = hasMore ? items[items.length - 1].id : null;

        res.json({
            data: items,
            pagination: {
                hasMore,
                nextCursor,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            "message": "Failed to get users"
        })
    }
}

export const addRole = async (req: Request, res: Response) => {
    try {
        const {
            name,
        } = req.body as Role

        const now = new Date();

        const result = await prisma.role.create({
            data: {
                name,
                created_at: now,
                updated_at: now
            }
        })

        res.status(201).json({
            message: "Role created succesfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create role, " + error
        });
    }
}