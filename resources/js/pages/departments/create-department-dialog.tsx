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
import { Textarea } from '@/components/ui/textarea';

interface CreateDepartmentDialogProps {
    department?: Department | null;
}

const CreateDepartmentDialog = ({
    department,
}: CreateDepartmentDialogProps) => {
    const [open, setOpen] = useState(false);
    const isEditing = !!department;

    const form = useForm({
        name: '',
        description: '',
    });

    // Populate form when editing
    useEffect(() => {
        if (isEditing && department && open) {
            form.setData({
                name: department.name || '',
                description: department.description || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [department?.id, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && department) {
            // Update mode - use PUT request
            form.put(`/departments/${department.id}`, {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        } else {
            // Create mode - use POST request
            form.post('/departments', {
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
                        <Plus size={16} /> Add Department
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Department' : 'Add New Department'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Department Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="e.g., Computer Science"
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Department description (optional)"
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
                                  ? 'Update Department'
                                  : 'Create Department'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDepartmentDialog;
