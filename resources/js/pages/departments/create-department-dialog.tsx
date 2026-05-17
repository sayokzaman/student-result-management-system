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
        tag: '',
        code: '',
        building: '',
        phone: '',
    });

    // Populate form when editing
    useEffect(() => {
        if (isEditing && department && open) {
            form.setData({
                name: department.name || '',
                description: department.description || '',
                tag: department.tag || '',
                code: department.code || '',
                building: department.building || '',
                phone: department.phone || '',
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
                        variant="outline" // Changed from secondary for better visibility
                        size="sm"
                        className="flex items-center gap-2" // Removed w-full justify-start for the Show page
                    >
                        <PenBoxIcon size={16} />
                        <span>Edit</span>
                    </Button>
                ) : (
                    <Button className="flex items-center gap-2">
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
                    <div className="space-y-2">
                        <Label htmlFor="code">Department Code</Label>
                        <Input
                            id="code"
                            name="code"
                            placeholder="e.g., CS"
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
                        <Label htmlFor="tag">Department Tag</Label>
                        <Input
                            id="tag"
                            name="tag"
                            placeholder="e.g., Computer Science"
                            value={form.data.tag}
                            onChange={(e) =>
                                form.setData('tag', e.target.value)
                            }
                            required
                        />
                        {form.errors.tag && (
                            <p className="text-sm text-red-600">
                                {form.errors.tag}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="building">Department Building</Label>
                        <Input
                            id="building"
                            name="building"
                            placeholder="e.g., Main Building"
                            value={form.data.building}
                            onChange={(e) =>
                                form.setData('building', e.target.value)
                            }
                            required
                        />
                        {form.errors.building && (
                            <p className="text-sm text-red-600">
                                {form.errors.building}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="code">phone number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="e.g., 123-456-7890"
                            value={form.data.phone}
                            onChange={(e) =>
                                form.setData('phone', e.target.value)
                            }
                            required
                        />
                        {form.errors.phone && (
                            <p className="text-sm text-red-600">
                                {form.errors.phone}
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
