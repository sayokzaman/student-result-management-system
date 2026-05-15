import { Head } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import UserActions from '@/pages/users/actions';
import CreateUserDialog from '@/pages/users/create-user-dialog';
import { dashboard } from '@/routes';

const UserIndex = ({ users }: { users: User[] }) => {
    return (
        <>
            <Head title="Users" />
            <main className="flex-1">
                <div className="p-8">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                User Directory
                            </h1>
                            <p className="text-muted-foreground">
                                Manage and monitor all platform members from a
                                central dashboard.
                            </p>
                        </div>

                        <CreateUserDialog />
                    </div>

                    <div className="rounded-xl border shadow-sm">
                        {/* Filters */}
                        <div className="flex gap-3 border-b p-4">
                            <div className="relative flex-1">
                                <Search
                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                                    size={16}
                                />
                                <Input
                                    className="pl-10"
                                    placeholder="Search by name, email or ID..."
                                />
                            </div>
                            <Button variant="outline" className="flex gap-2">
                                <Filter size={16} /> All Roles
                            </Button>
                            <Button variant="outline" className="flex gap-2">
                                <Calendar size={16} /> Created: Last 30 days
                            </Button>
                        </div>

                        {/* Table */}
                        <Table>
                            <TableHeader className="text-[11px] tracking-wider uppercase">
                                <TableRow>
                                    <TableHead className="w-30 px-4">
                                        ID
                                    </TableHead>
                                    <TableHead>User Details</TableHead>
                                    <TableHead>Email Address</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="px-4 font-medium text-muted-foreground">
                                            {user.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 rounded-lg">
                                                    <AvatarImage
                                                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                                    />
                                                    <AvatarFallback>
                                                        {user.name}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.phone_number}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className="rounded px-2 py-0.5 font-medium"
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {user.created_at}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <UserActions userData={user} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
                            <span>Showing 1 to 4 of 128 users</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    1
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    2
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                >
                                    3
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

UserIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Users',
            href: '/users',
        },
    ],
};

export default UserIndex;
