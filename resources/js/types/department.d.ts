type Department = {
    id: number;
    name: string;
    description?: string | null;
    created_at: string;
    updated_at: string;
    code?: string;
    tag?: string | null;
    building?: string | null;
    phone?: string | null;
    courses?: Course[]; // Optional relationship to courses
};
