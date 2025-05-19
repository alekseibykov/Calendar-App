import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav>
      <br/>
      <Link to="/">Main </Link>
      <br />
      <Link to="/calendar/">Calendar </Link>
    </nav>
  );  
}

export default Footer;
