import { PrismaClient } from "@prisma/client";
import { UserProfile } from "../types/user.types.js";
import { Request, Response } from 'express';

const prisma = new PrismaClient;

export const addProfile = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            photo,
            first_name,
            last_name,
            age,
            address,
            date_birth,
            status,
            is_active
        } = req.body as unknown as UserProfile

        const result = await prisma.profile.upsert({
            where: {
                user_id: user_id
            },
            update: {
                photo: photo || null,
                first_name: first_name || null,
                last_name: last_name || null,
                age: age || null,
                address: address || null,
                date_birth: date_birth ? new Date(date_birth) : null,
                status: status || null,
                is_active: is_active ?? true,
                updated_at: new Date()
            },
            create: {
                user_id: user_id,
                photo: photo || null,
                first_name: first_name || null,
                last_name: last_name || null,
                age: age || null,
                address: address || null,
                date_birth: date_birth ? new Date(date_birth) : null,
                status: status || null,
                is_active: is_active ?? true,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const result = await prisma.profile.findUnique({
            where: {
                user_id: parseInt(req.params.user_id)
            },
            select: {
                user_id: true,
                first_name: true,
                last_name: true,
                age: true
            }
        })

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            description: error
        });
    }
}