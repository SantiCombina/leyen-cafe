import {LogOut, UserRound} from "lucide-react";
import {Link} from "react-router-dom";

import {Avatar} from "./avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useLoginStore} from "@/store/login-store";

interface Props {
    trigger: React.ReactNode;
}

enum ROLES {
    "Administrador" = 1,
    "Empleado" = 2,
    "Cliente" = 3,
}

export function AvatarDropdown({trigger}: Props) {
    const userData = useLoginStore((state) => state.userData);
    const logout = useLoginStore((state) => state.logout);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
                <div className="flex items-center gap-3 px-2 py-4 text-sm">
                    <Avatar className="w-14 h-14" />
                    <div className="flex flex-col min-w-0">
                        <span className="w-full overflow-hidden font-semibold whitespace-nowrap text-ellipsis">
                            {`${userData?.first_name} ${userData?.last_name}`}
                        </span>
                        <span className="w-full overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap">
                            {userData?.email}
                        </span>
                        <span className="text-gray-700">{ROLES[userData?.role_id || 3]}</span>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to={"/account"}>
                        <UserRound className="w-4 h-4 mr-2" />
                        <span>Administrar cuenta</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Salir</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
