import { Head } from '@inertiajs/react';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreateTrimesterDialog from '@/pages/trimesters/create-trimester-dialog'
import TrimesterCard from '@/pages/trimesters/trimester-card';
import { dashboard } from '@/routes';
import type { PaginationData } from '@/types/pagination';

type TrimesterData = PaginationData<Trimester>;

const TrimesterIndex = ({ trimesters }: { trimesters: TrimesterData }) => {
    return (
        <>
            <Head title="Trimesters" />
            <main className="flex-1">
                <div className="p-8">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Trimester Directory
                            </h1>
                            <p className="text-muted-foreground">
                                Manage and monitor all platform members from a
                                central dashboard.
                            </p>
                        </div>

                        <CreateTrimesterDialog />
                    </div>

                    <div className="rounded-xl">
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
                                <Filter size={16} /> All Type
                            </Button>
                            <Button variant="outline" className="flex gap-2">
                                <Calendar size={16} /> Created: Last 30 days
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4 py-4">
                            {trimesters.data.map((trimester) => (
                                <TrimesterCard
                                    key={trimester.id}
                                    trimester={trimester}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
                            <span>Showing 1 to 4 of 128 trimesters</span>
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

TrimesterIndex.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Trimesters',
            href: '/trimesters',
        },
    ],
};

export default TrimesterIndex;
