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
import CreateUserDialog from '@/pages/users/create-user-dialog';
import DeleteUserDialog from '@/pages/users/delete-user-dialog';

const UserActions = ({ userData }: { userData: User | null }) => {
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
                    <PopoverTitle>{userData?.name}</PopoverTitle>
                    <PopoverDescription>
                        Description text here.
                    </PopoverDescription>
                </PopoverHeader>

                <div className="mt-2 flex flex-col gap-2 border-t pt-2">
                    <CreateUserDialog
                        user={userData}
                    />
                    <DeleteUserDialog user={userData} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default UserActions;
