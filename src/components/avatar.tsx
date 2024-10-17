import {Avatar as AvatarComponent, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useLoginStore} from "@/store/login-store";

export function Avatar() {
    const session = useLoginStore((state) => state.session);

    const initials = () => {
        if (!session?.user.user_metadata.full_name) return "";
        const names = session.user.user_metadata.full_name.split(" ");
        const firstNameInitial = names[0]?.charAt(0).toUpperCase() || "";
        const lastNameInitial = names[1]?.charAt(0).toUpperCase() || "";

        return `${firstNameInitial}${lastNameInitial}`;
    };

    return (
        <AvatarComponent>
            <AvatarImage
                alt={session?.user.user_metadata.full_name ?? session?.user.email}
                src={session?.user.user_metadata.picture}
            />
            <AvatarFallback>{initials()}</AvatarFallback>
        </AvatarComponent>
    );
}
