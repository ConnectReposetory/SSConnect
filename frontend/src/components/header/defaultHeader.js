import "./styles.css"
import { useHistory } from "react-router-dom";

function DefaultHeader() {
  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  return (
    <div className='header'>
        <div className='header-container'>
          <div className='extra-cloud'></div>
          <div className='logo' onClick={goHome}></div>
        </div>
    </div>
  );
}

export default DefaultHeader
