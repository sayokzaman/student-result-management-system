import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@/components/ui/popover';
import CreateDepartmentDialog from '@/pages/departments/create-department-dialog';
import DeleteDepartmentDialog from '@/pages/departments/delete-department-dialog';

const DepartmentActions = ({
    departmentData,
}: {
    departmentData: Department | null;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
                <PopoverHeader>
                    <PopoverTitle>{departmentData?.name}</PopoverTitle>
                    <PopoverDescription>
                        Description text here.
                    </PopoverDescription>
                </PopoverHeader>

                <div className="mt-2 flex flex-col gap-2 border-t pt-2">
                    <CreateDepartmentDialog department={departmentData} />
                    <DeleteDepartmentDialog department={departmentData} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default DepartmentActions;
