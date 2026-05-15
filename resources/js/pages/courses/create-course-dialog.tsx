import { useForm } from '@inertiajs/react';
import { PenBoxIcon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Department {
    id: number;
    name: string;
}

type CourseFormData = Omit<Course, 'created_at' | 'updated_at'>;

interface CreateCourseDialogProps {
    course?: CourseFormData | null;
    departments?: Department[];
    teachers?: User[];
}

export default function CreateCourseDialog({
    course,
    departments = [],
    teachers = [],
}: CreateCourseDialogProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!course;

    const form = useForm({
        code: '',
        name: '',
        credits: '',
        description: '',
        department_id: '',
        instructor_id: '',
    });

    useEffect(() => {
        if (isEditing && course && open) {
            form.setData({
                code: course.code || '',
                name: course.name || '',
                credits: course.credits?.toString() || '',
                description: course.description || '',
                department_id: course.department_id?.toString() || '',
                instructor_id: course.instructor_id?.toString() || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course?.id, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && course) {
            form.put(`/courses/${course.id}`, {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        } else {
            form.post('/courses', {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="border border-muted-foreground"
                    >
                        <PenBoxIcon size={16} />
                    </Button>
                ) : (
                    <Button>
                        <Plus size={16} /> Add Course
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Course' : 'Add New Course'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Course Code</Label>
                            <Input
                                id="code"
                                name="code"
                                placeholder="CS101"
                                value={form.data.code}
                                onChange={(e) =>
                                    form.setData('code', e.target.value)
                                }
                                required
                            />
                            {form.errors.code && (
                                <p className="text-sm text-red-600">
                                    {form.errors.code}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="credits">Credits</Label>
                            <Input
                                id="credits"
                                name="credits"
                                type="number"
                                placeholder="3"
                                value={form.data.credits || ''}
                                onChange={(e) =>
                                    form.setData('credits', e.target.value)
                                }
                                required
                            />
                            {form.errors.credits && (
                                <p className="text-sm text-red-600">
                                    {form.errors.credits}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Course Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Introduction to Computer Science"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            required
                        />
                        {form.errors.name && (
                            <p className="text-sm text-red-600">
                                {form.errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                            value={String(form.data.department_id)}
                            onValueChange={(value) =>
                                form.setData('department_id', value)
                            }
                        >
                            <SelectTrigger id="department" className="w-full">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map((d) => (
                                    <SelectItem key={d.id} value={String(d.id)}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.department_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.department_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="instructor">Instructor</Label>
                        <Select
                            value={String(form.data.instructor_id)}
                            onValueChange={(value) =>
                                form.setData('instructor_id', value)
                            }
                        >
                            <SelectTrigger id="instructor" className="w-full">
                                <SelectValue placeholder="Select an instructor" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers.map((t) => (
                                    <SelectItem
                                        key={t.id}
                                        value={String(t.id)}
                                    >
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.errors.instructor_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.instructor_id}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description (optional)
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            rows={3}
                        />
                        {form.errors.description && (
                            <p className="text-sm text-red-600">
                                {form.errors.description}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={form.processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {form.processing
                                ? isEditing
                                    ? 'Updating...'
                                    : 'Creating...'
                                : isEditing
                                  ? 'Update Course'
                                  : 'Create Course'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
