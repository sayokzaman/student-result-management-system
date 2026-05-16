import { Link } from '@inertiajs/react';
import { BookOpen, Users, Phone, Mail } from 'lucide-react'; // Added icons for modern feel
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Quick type helper based on your prompt
interface Instructor {
    name: string;
    email: string;
    phone_number?: string | null;
}

interface Course {
    id: number | string;
    name: string;
    code?: string | null;
    credits?: number | string | null;
    description?: string | null;
    updated_at?: string | null;
    department?: { name: string } | null;
    instructor?: Instructor | null; // Added instructor relation
}

interface CourseListCardProps {
    course: Course;
    instructor: User | null; // Added instructor prop for better separation of concerns
    className?: string;
}

export default function CourseListCard({
    course,
    instructor,
    className = '',
}: CourseListCardProps) {
    const credits = course.credits ?? '-';
    const enrollment = 0;
    const capacity = 0;

    const percent =
        capacity > 0 ? Math.round((enrollment / capacity) * 100) : 0;

    // Get initials for the instructor avatar fallback
    const getInstructorInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <Card
            className={cn(
                'group flex flex-col justify-between overflow-hidden border border-muted/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg py-0',
                className,
            )}
        >
            <div>
                {/* Header Section */}
                <CardHeader className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-semibold tracking-wider text-primary">
                                    {course.code ?? '—'}
                                </span>
                                {course.department?.name && (
                                    <Badge
                                        variant="secondary"
                                        className="px-2 py-0 text-[10px] font-medium"
                                    >
                                        {course.department.name}
                                    </Badge>
                                )}
                            </div>
                            <Link
                                href={`/courses/${course.id}`}
                                className="block text-base leading-snug font-bold text-foreground transition-colors group-hover:text-primary"
                            >
                                {course.name}
                            </Link>
                        </div>

                        <Badge
                            variant="outline"
                            className="flex shrink-0 items-center gap-1 font-normal text-muted-foreground"
                        >
                            <BookOpen className="size-3" />
                            <span>{credits} Cr</span>
                        </Badge>
                    </div>
                </CardHeader>

                {/* Content Body */}
                <CardContent className="space-y-4 px-5 py-2">
                    {/* Course Description */}
                    {course.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {course.description}
                        </p>
                    )}

                    {/* Progress / Enrollment Tracking */}
                    <div className="space-y-1.5 rounded-lg bg-muted/40 p-3">
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Users className="size-3.5" /> Capacity
                            </span>
                            <span className="font-semibold text-foreground">
                                {enrollment}
                                {capacity ? ` / ${capacity}` : ''} ({percent}%)
                            </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className={cn(
                                    'h-full rounded-full transition-all duration-500',
                                    percent >= 90
                                        ? 'bg-destructive'
                                        : percent >= 75
                                          ? 'bg-amber-500'
                                          : 'bg-primary',
                                )}
                                style={{ width: `${Math.min(100, percent)}%` }}
                            />
                        </div>
                    </div>

                    {/* Instructor Section */}
                    {instructor ? (
                        <div className="border-t border-border/60 pt-3">
                            <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Instructor
                            </p>
                            <div className="flex items-center gap-3">
                                <Avatar className="size-8 border border-border">
                                    <AvatarFallback className="bg-primary/5 text-xs font-medium text-primary">
                                        {getInstructorInitials(
                                            instructor.name,
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 space-y-0.5">
                                    <h4 className="truncate text-sm font-medium text-foreground">
                                        {instructor.name}
                                    </h4>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                                        <a
                                            href={`mailto:${instructor.email}`}
                                            className="flex items-center gap-1 truncate hover:text-primary"
                                        >
                                            <Mail className="size-3 shrink-0" />
                                            <span className="truncate">
                                                {instructor.email}
                                            </span>
                                        </a>
                                        {instructor.phone_number && (
                                            <>
                                                <span className="text-muted-foreground/40">
                                                    •
                                                </span>
                                                <span className="flex items-center gap-1 whitespace-nowrap">
                                                    <Phone className="size-3 shrink-0" />
                                                    {
                                                        instructor
                                                            .phone_number
                                                    }
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="border-t border-border/60 pt-3">
                            <p className="text-xs text-muted-foreground/70 italic">
                                No instructor assigned yet.
                            </p>
                        </div>
                    )}
                </CardContent>
            </div>

            {/* Footer */}
            <CardFooter className="border-t border-border/40 bg-muted/10 px-5 pt-2 pb-4">
                <div className="flex w-full items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                        Updated{' '}
                        {course.updated_at
                            ? new Date(course.updated_at).toLocaleDateString(
                                  undefined,
                                  {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  },
                              )
                            : '—'}
                    </span>
                    <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="h-8 gap-1 text-xs font-medium hover:bg-primary/10 hover:text-primary"
                    >
                        <Link href={`/courses/${course.id}`}>View Details</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
