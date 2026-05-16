import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface AssignCourseDialogProps {
    courses: Course[];
    instructors: User[];
    trimesterId: number;
}

export default function AssignCourseDialog({
    courses,
    instructors,
    trimesterId,
}: AssignCourseDialogProps) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        course_id: '',
        instructor_id: '',
        capacity: '',
        trimester_id: String(trimesterId),
    });

    useEffect(() => {
        form.setData('trimester_id', String(trimesterId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trimesterId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post('/course-trimesters', {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Assign Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Assign Course</DialogTitle>
                    <DialogDescription>
                        Select a course and instructor to assign to this
                        trimester.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="course">Course</Label>
                        <Select
                            value={String(form.data.course_id)}
                            onValueChange={(value) =>
                                form.setData('course_id', value)
                            }
                        >
                            <SelectTrigger id="course" className="w-full">
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {courses.map((course) => (
                                        <SelectItem
                                            key={course.id}
                                            value={String(course.id)}
                                        >
                                            {course.code} - {course.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {form.errors.course_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.course_id}
                            </p>
                        )}
                    </div>

                    <div>
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
                                <SelectGroup>
                                    {instructors.map((instructor) => (
                                        <SelectItem
                                            key={instructor.id}
                                            value={String(instructor.id)}
                                        >
                                            {instructor.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {form.errors.instructor_id && (
                            <p className="text-sm text-red-600">
                                {form.errors.instructor_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="capacity">Capacity (optional)</Label>
                        <Input
                            id="capacity"
                            type="number"
                            value={form.data.capacity || ''}
                            onChange={(e) =>
                                form.setData('capacity', e.target.value)
                            }
                        />
                        {form.errors.capacity && (
                            <p className="text-sm text-red-600">
                                {form.errors.capacity}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Assign</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
