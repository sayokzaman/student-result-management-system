type User = {
    id: number;
    name: string;
    email: string;
    phone_number?: string | null;
    email_verified_at: string | null;
    role?: string;
    roles?: Array<{ id: number; name: string }>;
    created_at: string;
    updated_at: string;
};
