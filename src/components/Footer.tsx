import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav>
      <br/>
      <Link to="/">Main </Link>
      <br />
      <Link to="/calendar/">Calendar </Link>
      <br />
      <Link to="/microfrontend/">Microfrontend </Link>
    </nav>
  );  
}

export default Footer;
