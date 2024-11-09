import { HeaderProps } from "@/components/interfaces/header.interface";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";



export function Header({ title, ButtonsProps }: HeaderProps) {
    const { onClick, label } = ButtonsProps;
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Button onClick={onClick}>
                <PlusCircle className="mr-2 h-4 w-4" /> {label}
            </Button>
        </div>
    );
}
