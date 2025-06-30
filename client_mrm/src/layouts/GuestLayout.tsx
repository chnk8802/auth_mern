// import { Navbar } from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";

export function GuestLayout() {
    return (
        <main>
            {/* <Navbar /> */}
            <Outlet/>
        </main>
    )
}