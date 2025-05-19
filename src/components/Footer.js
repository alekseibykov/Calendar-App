import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
function Footer() {
    return (_jsxs("nav", { children: [_jsx("br", {}), _jsx(Link, { to: "/", children: "Main " }), _jsx("br", {}), _jsx(Link, { to: "/calendar/", children: "Calendar " })] }));
}
export default Footer;
