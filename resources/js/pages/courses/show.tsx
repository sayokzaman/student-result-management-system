import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
//import { Course } from '@/types/course';

interface ShowProps {
    course: Course;
}

export default function Show({ course }: ShowProps) {
    return (
        <AuthLayout>
            <Head title={`Course: ${course.code}`} />
            <h1 className="mb-4 text-2xl font-bold">Course Details</h1>
            <div className="rounded bg-white p-6 shadow">
                <p>
                    <strong>Code:</strong> {course.code}
                </p>
                <p>
                    <strong>Name:</strong> {course.name}
                </p>
                <p>
                    <strong>Credits:</strong> {course.credits}
                </p>
                <p>
                    <strong>Description:</strong>{' '}
                    {course.description || 'No description'}
                </p>
                <p>
                    <strong>Created:</strong>{' '}
                    {new Date(course.created_at).toLocaleString()}
                </p>
                <p>
                    <strong>Updated:</strong>{' '}
                    {new Date(course.updated_at).toLocaleString()}
                </p>
            </div>
            <Link href="/courses" className="mt-4 inline-block text-blue-600">
                ← Back to Courses
            </Link>
        </AuthLayout>
    );
}
