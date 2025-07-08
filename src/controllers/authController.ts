import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient;

export const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password
        } = req.body as User

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (! user) {
            return res.status(404).json({
                "message": "Credential not match in our records"
            })
        }

        var checkUser = await bcrypt.compare(password, user.password)

        if (! checkUser) {
            return res.status(500).json({
                message: "Wrong password"
            })
        }
        
        var token = jwt.sign({
            id: user.id
        }, process.env.JWT_KEY, {
            expiresIn: '24h'
        });

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Failed to login",
            "error": error.message
        })
    }
}