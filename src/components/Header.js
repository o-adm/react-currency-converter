import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header">
        <h1 className="header__logo">🪙Converto</h1>
        <nav>
          <ul className="header__navigation">
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="header__text-container text-center">
        <h1 className="heading__primary">
          <span className="heading__primary--icon">🪙</span>
          <span className="heading__primary--first">Converto</span>
          <span className="heading__primary--second">
            Convert Your Currency Instantly
          </span>
        </h1>
        <Link to="#" className="btn btn-gold btn--animated">
          Start Conversion
        </Link>
      </div>
    </>
  );
}
