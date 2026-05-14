import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';

// import { Head, Link, router } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Course, PaginatedData } from '@/types/course';

interface IndexProps {
    courses: PaginatedData<Course>;
}

export default function Index({ courses }: IndexProps) {
    const { delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            destroy(`/courses/${id}`);
        }
    };

    return (
        <AuthLayout>
            <Head title="Courses" />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Courses</h1>
                <Link
                    href="/courses/create"
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Add Course
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Code</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Credits</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.data.map((course) => (
                            <tr key={course.id}>
                                <td className="border px-4 py-2">
                                    {course.code}
                                </td>
                                <td className="border px-4 py-2">
                                    {course.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {course.credits}
                                </td>
                                <td className="space-x-2 border px-4 py-2">
                                    <Link
                                        href={`/courses/${course.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/courses/${course.id}/edit`}
                                        className="text-yellow-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            Pagination links
            {/* <div className="mt-4 flex justify-center space-x-2">
                {courses.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 border rounded ${
                            link.active ? 'bg-blue-500 text-white' : ''
                        }`}
                    />
                ))}
            </div> */}
        </AuthLayout>
    );
}
