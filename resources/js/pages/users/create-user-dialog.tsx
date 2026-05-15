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

interface CreateUserDialogProps {
    user?: User | null;
    trigger?: React.ReactNode;
}

const CreateUserDialog = ({ user }: CreateUserDialogProps) => {
    const [open, setOpen] = useState(false);
    const isEditing = !!user;

    const form = useForm({
        name: '',
        email: '',
        phone_number: '',
        role: '',
    });

    // Populate form when editing
    useEffect(() => {
        if (isEditing && user && open) {
            form.setData({
                name: user.name || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                role: user.role || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && user) {
            // Update mode - use PUT request
            form.put(`/users/${user.id}`, {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        } else {
            // Create mode - use POST request
            form.post('/users', {
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
                        <Plus size={16} /> Add User
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            required
                        />
                        {form.errors.email && (
                            <p className="text-sm text-red-600">
                                {form.errors.email}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            value={form.data.phone_number}
                            placeholder="1234567890"
                            onChange={(e) =>
                                form.setData('phone_number', e.target.value)
                            }
                            required
                        />
                        {form.errors.phone_number && (
                            <p className="text-sm text-red-600">
                                {form.errors.phone_number}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={form.data.role}
                            onValueChange={(value) =>
                                form.setData('role', value)
                            }
                        >
                            <SelectTrigger id="role" className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                            </SelectContent>
                        </Select>
                        {form.errors.role && (
                            <p className="text-sm text-red-600">
                                {form.errors.role}
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
                                  ? 'Update User'
                                  : 'Create User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;
