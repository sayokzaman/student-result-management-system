import { Head, useForm, router } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';

interface EditProps {
    course: Course;
}

interface EditFormData {
    code: string;
    name: string;
    credits: number | string;
    description: string;
}

export default function Edit({ course }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<EditFormData>({
        code: course.code,
        name: course.name,
        credits: course.credits,
        description: course.description || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/courses/${course.id}`);
    };

    return (
        <AuthLayout>
            <Head title="Edit Course" />
            <h1 className="mb-4 text-2xl font-bold">Edit Course</h1>
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div>
                    <label className="block font-medium">Course Code</label>
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.code && (
                        <div className="text-sm text-red-500">
                            {errors.code}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Course Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.name && (
                        <div className="text-sm text-red-500">
                            {errors.name}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block font-medium">Credits</label>
                    <input
                        type="number"
                        value={data.credits}
                        onChange={(e) => setData('credits', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.credits && (
                        <div className="text-sm text-red-500">
                            {errors.credits}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block font-medium">
                        Description (Optional)
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={3}
                        className="w-full rounded border px-3 py-2"
                    />
                </div>
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                    >
                        Update Course
                    </button>
                    <button
                        type="button"
                        onClick={() => router.get('/courses')}
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
