import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";

export const Layout = () => {
    return (
        <div className="container mx-auto my-3">
            <Header/>
            <Main/>
        </div>
    )
};