import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Plus,
    Edit2,
    BookOpen,
    Calendar,
    Users,
    GraduationCap,
    Clock,
    MapPin,
    Phone,
    Mail,
    ChevronRight,
    FileText,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function Show() {
    return (
        <>
            <Head title="CS101 - Introduction to Computer Science" />

            <div className="mx-auto min-h-screen max-w-7xl space-y-6 px-4 py-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="rounded-full"
                        >
                            <Link href="/courses">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                                Courses
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                CS101 - Introduction to Computer Science
                            </h1>
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                Computer Science • 4 Credits
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-black/90"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add to Trimester
                        </Button>
                        <Button variant="outline" size="sm">
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </Button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Course Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    This course provides a comprehensive
                                    introduction to computer science, covering
                                    fundamental concepts such as algorithms,
                                    data structures, programming paradigms, and
                                    computational thinking. Students will learn
                                    to write programs, analyze problems, and
                                    develop logical solutions using modern
                                    programming languages.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Course Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <DetailItem
                                    icon={<BookOpen className="h-5 w-5" />}
                                    label="Course Code"
                                    value="CS101"
                                    color="blue"
                                />
                                <DetailItem
                                    icon={<Users className="h-5 w-5" />}
                                    label="Default Capacity"
                                    value="50"
                                    color="orange"
                                />
                                <DetailItem
                                    icon={<GraduationCap className="h-5 w-5" />}
                                    label="Credits"
                                    value="4"
                                    color="purple"
                                />
                                <DetailItem
                                    icon={<GraduationCap className="h-5 w-5" />}
                                    label="Department"
                                    value="CS"
                                    color="green"
                                />
                            </CardContent>
                        </Card>

                        {/* Active Trimester Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">
                                Active in Trimesters
                            </h3>
                            <Card className="border-green-100">
                                <CardContent className="space-y-6 pt-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">
                                                    Trimester 2 - 2024-2025
                                                </h4>
                                                <Badge className="border-none bg-green-100 text-green-700 hover:bg-green-100">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />{' '}
                                                    Active
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Jan 6, 2025 - Apr 20, 2025
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:bg-destructive/5"
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />{' '}
                                            Remove
                                        </Button>
                                    </div>

                                    <Card className="">
                                        <CardContent className="flex flex-col justify-between gap-4 p-4 md:flex-row md:items-center">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-purple-600 text-white">
                                                        DSJ
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-bold">
                                                        Dr. Sarah Johnson
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Instructor
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <Phone className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground md:grid-cols-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />{' '}
                                            Mon/Wed/Fri 10:00 AM - 11:30 AM
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" /> Lab
                                            205, Science Building A
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span>Enrollment</span>
                                            <span className="font-bold text-destructive">
                                                45 / 50 (90%)
                                            </span>
                                        </div>
                                        <Progress
                                            value={90}
                                            className="h-2"
                                            barColor="bg-destructive"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Department
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <GraduationCap className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">
                                            Computer Science
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            CS
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" /> Science
                                        Building A
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" /> +1 (555)
                                        123-4567
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Course Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <InfoItem
                                    label="Created"
                                    value="Jan 15, 2024"
                                />
                                <InfoItem
                                    label="Last Updated"
                                    value="May 10, 2024"
                                />
                                <InfoItem label="Course ID" value="#1" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 p-3">
                                <QuickActionButton
                                    icon={<Plus className="h-4 w-4" />}
                                    label="Add to Trimester"
                                />
                                <QuickActionButton
                                    icon={<Users className="h-4 w-4" />}
                                    label="View All Students"
                                />
                                <QuickActionButton
                                    icon={<Calendar className="h-4 w-4" />}
                                    label="Trimester Schedule"
                                />
                                <QuickActionButton
                                    icon={<FileText className="h-4 w-4" />}
                                    label="Course Materials"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Enrollment Table */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">
                            Currently Enrolled Students
                        </CardTitle>
                        <Button variant="outline" size="sm">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <StudentRow
                            name="John Smith"
                            id="STU001"
                            initials="JS"
                            color="bg-blue-600"
                        />
                        <StudentRow
                            name="Emily Davis"
                            id="STU002"
                            initials="ED"
                            color="bg-blue-500"
                        />
                        <StudentRow
                            name="Michael Brown"
                            id="STU003"
                            initials="MB"
                            color="bg-blue-700"
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

/* Helper Components */

function DetailItem({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600',
        orange: 'bg-orange-50 text-orange-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
    };

    return (
        <div className="flex items-center gap-3">
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors[color]}`}
            >
                {icon}
            </div>
            <div>
                <p className="text-xs font-medium text-muted-foreground">
                    {label}
                </p>
                <p className="text-sm font-bold">{value}</p>
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">
                {label}
            </p>
            <p className="text-sm font-medium">{value}</p>
        </div>
    );
}

function QuickActionButton({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Button
            variant="ghost"
            className="w-full justify-between border border-transparent hover:border-slate-100 hover:bg-slate-50"
        >
            <span className="flex items-center gap-3 text-sm">
                {icon} {label}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Button>
    );
}

function StudentRow({
    name,
    id,
    initials,
    color,
}: {
    name: string;
    id: string;
    initials: string;
    color: string;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarFallback className={`${color} text-xs text-white`}>
                        {initials}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs text-muted-foreground">
                        {id} • Trimester 2 2024-2025
                    </p>
                </div>
            </div>
            <Badge className="border-none bg-green-100 text-[10px] text-green-700 hover:bg-green-100">
                Active
            </Badge>
        </div>
    );
}
