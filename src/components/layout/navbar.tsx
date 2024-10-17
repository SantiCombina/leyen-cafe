import {Avatar} from "../avatar";
import {Dropdown} from "../dropdown";

export function Navbar() {
    return (
        <div className="container fixed top-0 flex items-center justify-end w-full py-4">
            <Dropdown trigger={<Avatar />} />
        </div>
    );
}
