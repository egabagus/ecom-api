export interface User{
    id: number;
    name?: string;
    email: string;
    password: string;
}

export interface UserProfile {
    id?: number;
    user_id: number;
    photo?: string;
    first_name?: string;
    last_name?: string;
    age?: number;
    address?: string;
    date_birth?: string | Date;
    status?: string;
    is_active?: boolean;
}