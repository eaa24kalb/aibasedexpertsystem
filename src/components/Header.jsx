import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function Header() {
    const location = useLocation();

    return (
        <header>
            <nav>
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/forward" className={location.pathname === "/forward" ? "active" : ""}>Book Picker</Link>
                <Link to="/backward" className={location.pathname === "/backward" ? "active" : ""}>Book Checker</Link>
            </nav>
        </header>
    )
}