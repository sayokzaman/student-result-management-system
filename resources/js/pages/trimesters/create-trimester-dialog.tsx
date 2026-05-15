import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, PenBoxIcon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CreateTrimesterDialogProps {
    trimester?: Trimester | null;
}

const CreateTrimesterDialog = ({ trimester }: CreateTrimesterDialogProps) => {
    const [open, setOpen] = useState(false);
    const isEditing = !!trimester;

    const form = useForm({
        type: '',
        year: new Date().getFullYear().toString(),
        status: 'upcoming',
        start_date: '',
        end_date: '',
    });

    // Populate form when editing
    useEffect(() => {
        if (isEditing && trimester && open) {
            form.setData({
                type: trimester.type || '',
                year: trimester.year || new Date().getFullYear().toString(),
                status: trimester.status || 'upcoming',
                start_date: trimester.start_date || '',
                end_date: trimester.end_date || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trimester?.id, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && trimester) {
            // Update mode - use PUT request
            form.put(`/trimesters/${trimester.id}`, {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        } else {
            // Create mode - use POST request
            form.post('/trimesters', {
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
                        size="sm"
                        className="w-full justify-start"
                    >
                        <PenBoxIcon size={16} />
                        Edit
                    </Button>
                ) : (
                    <Button>
                        <Plus size={16} /> Add Trimester
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Trimester' : 'Add New Trimester'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex w-full gap-4">
                        <div className="w-1/2 space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={form.data.type}
                                onValueChange={(value) =>
                                    form.setData('type', value)
                                }
                            >
                                <SelectTrigger id="type" className="w-full">
                                    <SelectValue placeholder="Select a trimester type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="fall">
                                            Fall
                                        </SelectItem>
                                        <SelectItem value="spring">
                                            Spring
                                        </SelectItem>
                                        <SelectItem value="summer">
                                            Summer
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.type && (
                                <p className="text-sm text-red-600">
                                    {form.errors.type}
                                </p>
                            )}
                        </div>

                        <div className="w-1/2 space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Select
                                value={form.data.year}
                                onValueChange={(value) =>
                                    form.setData('year', value)
                                }
                            >
                                <SelectTrigger id="year" className="w-full">
                                    <SelectValue placeholder="Select a trimester year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.from(
                                            { length: 3 },
                                            (_, index) =>
                                                new Date().getFullYear() +
                                                index +
                                                1, // Next 3 years:
                                        )
                                            .concat(
                                                Array.from(
                                                    { length: 5 },
                                                    (_, index) =>
                                                        new Date().getFullYear() -
                                                        index, // Current + past 4 years:
                                                ),
                                            )
                                            .sort((a, b) => b - a) // Sorts everything descending: [2029, 2028, 2027, 2026, 2025, ...]
                                            .map((year) => (
                                                <SelectItem
                                                    key={year}
                                                    value={String(year)}
                                                >
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        {/* {[2023, 2024, 2025].map((year) => (
                                        <SelectItem key={year} value={String(year)}>
                                            {year}
                                        </SelectItem>
                                    ))} */}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {form.errors.year && (
                                <p className="text-sm text-red-600">
                                    {form.errors.year}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={form.data.status}
                            onValueChange={(value) =>
                                form.setData('status', value)
                            }
                        >
                            <SelectTrigger id="status" className="w-full">
                                <SelectValue placeholder="Select a trimester status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="upcoming">
                                        Upcoming
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {form.errors.status && (
                            <p className="text-sm text-red-600">
                                {form.errors.status}
                            </p>
                        )}
                    </div>

                    <div className="flex w-full gap-4">
                        <div className="w-1/2 space-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="start_date"
                                        data-empty={!form.data.start_date}
                                        className="flex w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        <CalendarIcon />
                                        {form.data.start_date ? (
                                            format(
                                                new Date(form.data.start_date),
                                                'PPP',
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            form.data.start_date
                                                ? new Date(form.data.start_date)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            form.setData(
                                                'start_date',
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : '',
                                            );
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {form.errors.start_date && (
                                <p className="text-sm text-red-600">
                                    {form.errors.start_date}
                                </p>
                            )}
                        </div>

                        <div className="w-1/2 space-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="end_date"
                                        data-empty={!form.data.end_date}
                                        className="flex w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                    >
                                        <CalendarIcon />
                                        {form.data.end_date ? (
                                            format(
                                                new Date(form.data.end_date),
                                                'PPP',
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            form.data.end_date
                                                ? new Date(form.data.end_date)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            form.setData(
                                                'end_date',
                                                date
                                                    ? format(date, 'yyyy-MM-dd')
                                                    : '',
                                            );
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {form.errors.end_date && (
                                <p className="text-sm text-red-600">
                                    {form.errors.end_date}
                                </p>
                            )}
                        </div>
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
                                  ? 'Update Trimester'
                                  : 'Create Trimester'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTrimesterDialog;
