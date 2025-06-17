import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import { User } from "../types/user.types.js";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 1
        const cursor = req.query.cursor as string;

        if (limit > 100) {
            return res.status(500).json({
                message: "Invalid pagination parameter"
            })
        }

        const users = await prisma.user.findMany({
            where: {
                deleted_at: null,
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
    
        const hasMore = users.length > limit;
        const items = hasMore ? users.slice(0, -1) : users;
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

export const findUserByEmail = async (req: Request, res: Response) => {
    try {
        const userByEmail = await prisma.user.findUnique({
            where: {
                email: req.params.email
            }
        })

        if (!userByEmail) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const data = {
            name: userByEmail.name,
            email: userByEmail.email,
            created_at: userByEmail.created_at
        }

        res.json(data)
    } catch (error) {
        res.status(500).json({
            "message": "Failed to find user"
        })
    }
}

export const addUser = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password
        } = req.body as User

        const hashedPassword = await bcrypt.hash(password, 10);
        const now = new Date();

        const result = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                created_at: now,
                updated_at: now
            }
        })

        res.status(201).json({
            message: "User created succesfully",
            user: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user, " + error
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {
            id,
            name,
            email
        } = req.body as User

        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
            }
        })

        res.status(201).json({
            message: "User updated succesfully",
            user: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user, " + error
        });
    }
}

export const destroyUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.update({
            where: {
                email: req.params.email
            },
            data: {
                deleted_at: new Date()
            }
        })

        res.status(201).json({
            message: "User deleted succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}