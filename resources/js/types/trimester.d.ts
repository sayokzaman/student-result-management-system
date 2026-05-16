type Trimester = {
    id: number;
    type: string;
    year: string;
    name: string;
    description?: string;
    status: TrimesterStatus;
    start_date: string;
    end_date: string;
    courses: Course[];
    trimester_courses?: TrimesterCourse[];
    created_at: string;
    updated_at: string;
};

type TrimesterStatus = 'active' | 'completed' | 'upcoming';

type TrimesterCourse = {
    id: number;
    trimester_id: number;
    course_id: number;
    course: Course;
    instructor_id: number;
    instructor?: User | null;
    courses?: Course[];
    created_at: string;
    updated_at: string;
};
