import "./styles.css"
import { useHistory } from "react-router-dom";

function AgendaHeader() {
  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  return (
    <div className='agenda-header'>
        <div className='header-container'>
          <div className='logo' onClick={goHome}></div>
        </div>
    </div>
  );
}

export default AgendaHeader
