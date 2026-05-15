import { Link } from '@inertiajs/react';
import CreateCourseDialog from '@/pages/courses/create-course-dialog';
import DeleteCourseDialog from '@/pages/courses/delete-department-dialog';

interface CourseCardProps {
    course: Course;
    departments?: Department[];
    teachers?: User[];
    className?: string;
}

export default function CourseCard({
    course,
    departments,
    teachers,
    className = '',
}: CourseCardProps) {
    const credits = course.credits ?? '-';
    const enrollment = course.enrollment ?? 0;
    const capacity = course.capacity ?? 0;

    const percent =
        capacity > 0 ? Math.round((enrollment / capacity) * 100) : 0;
    const isHigh = percent >= 90;

    return (
        <div
            className={`group rounded-lg bg-muted/80 p-6 shadow-sm hover:bg-muted ${className}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                        {course.code ?? '—'}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                        {credits} Credits
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-gray-500">
                    <CreateCourseDialog
                        course={course}
                        departments={departments}
                        teachers={teachers}
                    />

                    <DeleteCourseDialog course={course} />
                </div>
            </div>

            <Link
                href={`/courses/${course.id}`}
                className="block underline-offset-2 group-hover:underline"
            >
                <h3 className="mt-4 text-xl font-semibold">{course.name}</h3>
            </Link>
            {course.description && (
                <p className="mt-2 text-sm">{course.description}</p>
            )}

            <div className="my-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                        <div className="text-xs text-muted-foreground">
                            Department
                        </div>
                        <div className="text-sm">
                            {course.department?.name ?? '—'}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground">
                            Instructor
                        </div>
                        <div className="text-sm">
                            {course.instructor?.name ?? '—'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">
                            Enrollment
                        </div>
                        <div
                            className={`text-sm ${isHigh ? 'font-semibold text-red-600' : ''}`}
                        >
                            {enrollment}
                            {capacity ? `/${capacity}` : ''}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center space-x-3">
                    <div className="flex-1">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className={`h-full rounded-full ${isHigh ? 'bg-red-500' : 'bg-rose-500'}`}
                                style={{ width: `${Math.min(100, percent)}%` }}
                            />
                        </div>
                    </div>
                    <div className="w-12 text-right text-xs">
                        {Math.min(100, percent)}%
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <Link
                    href={`/courses/${course.id}`}
                    className="text-sm hover:underline"
                >
                    View details
                </Link>
            </div>
        </div>
    );
}
