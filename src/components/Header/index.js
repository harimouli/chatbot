import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { TbMessageChatbotFilled } from "react-icons/tb";
const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <Link to="/">
          <TbMessageChatbotFilled />
          </Link>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
