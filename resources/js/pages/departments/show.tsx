import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    //Plus,
    Edit2,
    BookOpen,
    Calendar,
    Users,
    GraduationCap,
    Building2,
    MapPin,
    Phone,
    //Mail,
    ChevronRight,
    FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ShowProps {
    department: Department;
}

export default function Show({ department }: ShowProps) {
    return (
        <>
            <Head title={`Department - ${department.name}`} />

            <div className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-3">
                        <Link
                            href="/departments"
                            className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-3 w-3" /> Back to Directory
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {department.name}
                            </h1>
                            <p className="mt-1 text-muted-foreground">
                                {department.courses?.length || 0} Total Courses
                                {department.building &&
                                    ` • ${department.building}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/departments/${department.id}/edit`}>
                            <Button variant="outline" size="sm">
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-8 lg:col-span-2">
                        <section className="space-y-3">
                            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                About
                            </h3>
                            <p className="text-base leading-relaxed text-foreground/80">
                                {department.description ||
                                    'No description provided for this department.'}
                            </p>
                        </section>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <StatItem
                                icon={<Users />}
                                label="Faculty"
                                value="24"
                            />
                            <StatItem
                                icon={<GraduationCap />}
                                label="Students"
                                value="428"
                            />
                            <StatItem
                                icon={<BookOpen />}
                                label="Courses"
                                value={String(department.courses?.length || 0)}
                            />
                            <StatItem
                                icon={<Calendar />}
                                label="Founded"
                                value="2010"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    Active Courses
                                </h3>
                                <Badge
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    {department.courses?.length || 0} Total
                                </Badge>
                            </div>
                            <div className="divide-y rounded-md border">
                                {department.courses &&
                                department.courses.length > 0 ? (
                                    department.courses.map((course) => (
                                        <CourseRow
                                            key={course.id}
                                            course={course}
                                        />
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-sm text-muted-foreground">
                                        No courses assigned to this department.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Card className="shadow-none">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">
                                    Department Contact
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarFallback className="bg-transparent text-[10px]">
                                            AM
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="font-medium">
                                            Dr. Alan Mathison
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Head of Department
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        {department.phone || 'N/A'}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {department.building || 'N/A'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-2">
                            <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase">
                                Resources
                            </h4>
                            <nav className="space-y-1">
                                <ResourceLink
                                    icon={<FileText className="h-4 w-4" />}
                                    label="Faculty Directory"
                                />
                                <ResourceLink
                                    icon={<Calendar className="h-4 w-4" />}
                                    label="Trimester Schedule"
                                />
                                <ResourceLink
                                    icon={<Building2 className="h-4 w-4" />}
                                    label="Department Policies"
                                />
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- Simplified Helper Components ---

function StatItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg border p-4">
            <div className="mb-2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
                {icon}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
        </div>
    );
}

function CourseRow({ course }: { course: Course }) {
    return (
        <div className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50">
            <div>
                <p className="text-sm font-medium">{course.name}</p>
                <p className="text-xs text-muted-foreground">
                    {course.code} • 4 Credits
                </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        </div>
    );
}

function ResourceLink({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
            <span className="flex items-center gap-3">
                {icon} {label}
            </span>
            <ChevronRight className="h-3 w-3" />
        </button>
    );
}
