import React, {Dispatch, SetStateAction, useState} from "react";

import {Spinner} from "./spinner";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
    trigger: React.ReactNode;
    children: React.ReactNode;
    title: string;
    description?: string;
    buttonText: string;
    isLoading?: boolean;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    onAccept: () => void;
    onCancel?: () => void;
}

export function Modal({
    trigger,
    children,
    title,
    description,
    buttonText,
    isLoading,
    open,
    setOpen,
    onAccept,
    onCancel,
}: Props) {
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpen ? setOpen(!open) : setOpenModal(!openModal);
        onCancel && onCancel();
    };

    return (
        <Dialog open={open || openModal} onOpenChange={() => (setOpen ? setOpen(!open) : setOpenModal(!openModal))}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
                <DialogFooter className="flex flex-row justify-center gap-6">
                    <Button variant={"outline"} onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button className="flex gap-2" disabled={isLoading} onClick={onAccept}>
                        {buttonText}
                        {isLoading && <Spinner className="text-white" />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
