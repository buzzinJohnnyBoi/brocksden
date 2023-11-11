import Nav from "../../../components/nav/nav";

export default function DashboardLayout({ children }) {
    return (
        <>
            <Nav/>
            <section>{children}</section>
        </>
    )       
}

