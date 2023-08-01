import { ReactNode } from "react";

type Props = {
    children?: ReactNode
    className?: string
}

function HeaderContainer({children, className}: Props) {
    return (
        <header className={`flex w-full h-[2.5rem] md:h-[3.5rem] ${className}`}>
            {children}
        </header>
    );
}

export default HeaderContainer;