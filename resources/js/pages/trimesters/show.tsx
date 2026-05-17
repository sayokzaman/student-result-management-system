import { Head, Link } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import AssignCourseDialog from '@/components/assign-course';
import CourseListCard from '@/components/course-list-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

const TrimesterShow = ({
    trimester,
    courses,
    instructors,
}: {
    trimester: Trimester;
    courses: Course[];
    instructors: User[];
}) => {
    const statusVariant = (status: string) => {
        switch (status) {
            case 'ongoing':
                return 'secondary';
            case 'upcoming':
                return 'default';
            case 'completed':
                return 'outline';
            default:
                return 'default';
        }
    };

    return (
        <>
            <Head title="Trimesters" />
            <main className="flex-1 p-8">
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl">
                                    {trimester.name}
                                </CardTitle>
                                <CardDescription>
                                    {trimester?.description ||
                                        'No description available.'}
                                </CardDescription>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge
                                        variant={statusVariant(
                                            trimester.status,
                                        )}
                                    >
                                        {trimester.status}
                                    </Badge>
                                    <Badge variant="outline">
                                        {trimester.type}
                                    </Badge>
                                    <Badge variant="outline">
                                        {trimester.year}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" asChild>
                                    <Link href="#">
                                        <Edit size={16} />
                                    </Link>
                                </Button>
                                {trimester.status === 'upcoming' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                    >
                                        <Trash size={16} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <div className="text-xs text-muted-foreground">
                                    Start Date
                                </div>
                                <div className="font-medium">
                                    {new Date(
                                        trimester.start_date,
                                    ).toLocaleDateString()}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground">
                                    End Date
                                </div>
                                <div className="font-medium">
                                    {new Date(
                                        trimester.end_date,
                                    ).toLocaleDateString()}
                                </div>
                            </div>

                            <div>
                                <div className="text-xs text-muted-foreground">
                                    Description
                                </div>
                                <div className="font-medium">
                                    {trimester.description ?? '—'}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Courses</h2>
                        <div className="flex items-center gap-2">
                            <AssignCourseDialog
                                courses={courses}
                                instructors={instructors}
                                trimesterId={trimester.id}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {trimester.trimester_courses &&
                        trimester.trimester_courses.length > 0 ? (
                            trimester.trimester_courses?.map((tc) => {
                                return (
                                    <CourseListCard
                                        key={tc.id}
                                        course={tc.course}
                                        instructor={tc.instructor ?? null}
                                    />
                                );
                            })
                        ) : (
                            <Card>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>—</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">
                                                No courses assigned
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Use "Assign Course" to add
                                                existing courses to this
                                                trimester.
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default TrimesterShow;
