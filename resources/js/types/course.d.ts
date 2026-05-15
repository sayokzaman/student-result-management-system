type Course = {
    id: number;
    code: string;
    name: string;
    credits: number;
    description?: string;
    department_id: number;
    department?: Department;
    instructor_id?: number;
    instructor?: User;
    capacity: number;
    enrollment?: number;
    created_at: string;
    updated_at: string;
};
