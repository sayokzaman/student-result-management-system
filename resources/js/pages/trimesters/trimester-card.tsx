import { Link } from '@inertiajs/react';
import { CalendarRange, Clock3, Edit3, Users, Trash2 } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TrimesterCardProps {
    trimester: Trimester;
    totalCourses?: number;
    enrolledStudents?: number;
    registrationStartDate?: string;
    registrationEndDate?: string;
    onEdit?: (trimester: Trimester) => void;
    onDelete?: (trimester: Trimester) => void;
    className?: string;
}

const statusConfig: Record<
    TrimesterStatus,
    { label: string; badgeClassName: string; dotClassName: string }
> = {
    active: {
        label: 'Active',
        badgeClassName:
            'border-transparent bg-green-300 text-green-800 font-semibold',
        dotClassName: 'bg-green-500',
    },
    completed: {
        label: 'Completed',
        badgeClassName:
            'border-transparent bg-blue-300 text-blue-800 font-semibold',
        dotClassName: 'bg-blue-800',
    },
    upcoming: {
        label: 'Upcoming',
        badgeClassName: 'border-transparent bg-yellow-100 text-yellow-800',
        dotClassName: 'bg-yellow-500',
    },
};

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

export default function TrimesterCard({
    trimester,
    totalCourses,
    enrolledStudents,
    registrationStartDate,
    registrationEndDate,
    onEdit,
    onDelete,
    className,
}: TrimesterCardProps) {
    const status = statusConfig[trimester.status];

    return (
        <Card
            className={cn(
                'gap-4 hover:border-primary/30 duration-300 ease-in-out py-5 shadow-sm ',
                className,
            )}
        >
            <CardHeader className="px-5 pb-0">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <Link href={`/trimesters/${trimester.id}`}>
                                <CardTitle className="text-xl text-foreground capitalize">
                                    {trimester.name
                                        ? trimester.name
                                        : `${trimester.type} ${trimester.year}`}
                                </CardTitle>
                            </Link>
                            <Badge
                                className={cn(
                                    'gap-1.5 rounded-full px-3 py-1',
                                    status.badgeClassName,
                                )}
                            >
                                <span
                                    className={cn(
                                        'size-2 rounded-full',
                                        status.dotClassName,
                                    )}
                                />
                                {status.label}
                            </Badge>
                        </div>
                        <CardDescription className="max-w-2xl text-sm text-muted-foreground">
                            {trimester.type} of the {trimester.year} academic
                            year
                        </CardDescription>
                    </div>

                    <div className="flex items-center gap-1">
                        {onEdit && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(trimester)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Edit trimester"
                            >
                                <Edit3 size={16} />
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(trimester)}
                                className="text-muted-foreground hover:text-destructive"
                                aria-label="Delete trimester"
                            >
                                <Trash2 size={16} />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-5 pt-0">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarRange size={16} />
                            Duration
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            {formatDate(trimester.start_date)} -{' '}
                            {formatDate(trimester.end_date)}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 size={16} />
                            Registration Period
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            {registrationStartDate && registrationEndDate
                                ? `${formatDate(registrationStartDate)} - ${formatDate(registrationEndDate)}`
                                : 'Not set'}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarRange size={16} />
                            Total Courses
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            {totalCourses ?? 0}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users size={16} />
                            Enrolled Students
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            {enrolledStudents ?? 0}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
