import { Head, Link } from '@inertiajs/react'; // Added Link import
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
} from 'lucide-react';
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
import DepartmentActions from '@/pages/departments/actions';
import CreateDepartmentDialog from '@/pages/departments/create-department-dialog';
import { dashboard } from '@/routes';
import type { PaginationData } from '@/types/pagination';

type DepartmentData = PaginationData<Department>;

const DepartmentIndex = ({ departments }: { departments: DepartmentData }) => {
    return (
        <>
            <Head title="Departments" />
            <main className="flex-1">
                <div className="p-8">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Department Directory
                            </h1>
                            <p className="text-muted-foreground">
                                Manage and monitor all platform members from a
                                central dashboard.
                            </p>
                        </div>

                        <CreateDepartmentDialog />
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
                                <Filter size={16} /> All Categories
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Tag</TableHead>
                                    <TableHead>Building</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments.data.map((department) => (
                                    <TableRow
                                        key={department.id}
                                        className="group"
                                    >
                                        <TableCell className="px-4 font-medium text-muted-foreground">
                                            {department.id}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {/* WRAPPED NAME IN LINK BELOW */}
                                            <Link
                                                href={`/departments/${department.id}`}
                                                className="cursor-pointer text-white transition-colors hover:text-indigo-400"
                                            >
                                                {department.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.description || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.code || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.tag || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.building || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.phone || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {department.created_at}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DepartmentActions
                                                departmentData={department}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
                            <span>
                                Showing {departments.from} to {departments.to}{' '}
                                of {departments.total} departments
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    disabled={!departments.prev_page_url}
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                {/* Simple Page buttons - strictly for UI visual match */}
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
                                    disabled={!departments.next_page_url}
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

DepartmentIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Departments',
            href: '/departments',
        },
    ],
};

export default DepartmentIndex;
