import { Button } from "react-bootstrap";
import accountSettings from "../assets/accountsettingsicon.png";
import logOut from "../assets/logouticon.png";

const Account = ({ onLogout, onEditAccount }) => {
  return (
    <div className="d-flex gap-2">
      <Button
        variant="link"
        size="sm"
        className="hover-dark"
        onClick={onEditAccount}
      >
        <img src={accountSettings} />
      </Button>
      <Button
        variant="link"
        size="sm"
        className="hover-dark"
        onClick={onLogout}
      >
        <img src={logOut} />
      </Button>
    </div>
  );
};

export default Account;
