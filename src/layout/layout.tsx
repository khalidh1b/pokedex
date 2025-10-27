import { Header } from "@/components/header/header";
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <Toaster/>
            <div className="container mx-auto md:px-0 px-2">
                <Header/>
                <Outlet/>
            </div>
        </div>
    )
};