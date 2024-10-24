import {Avatar} from "../avatar";
import {AvatarDropdown} from "../avatar-dropdown";

export function Navbar() {
    return (
        <div className="container fixed top-0 flex items-center justify-end w-full py-4">
            <AvatarDropdown trigger={<Avatar />} />
        </div>
    );
}
