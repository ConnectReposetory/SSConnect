import "./styles.css"
import Search from "../search";
import { useHistory } from "react-router-dom";

function HomeHeader() {
  let history = useHistory();

  function goHome() {
    history.push("/");
  }

  return (
    <div className='header home'>
        <div className='header-container'>
          <div className='extra-cloud'></div>
          <div className='search-container'>
            <Search showButton={true}/>
          </div>
          <div className='logo' onClick={goHome}></div>
          <div className='flying'></div>
          <div className='standing'></div>
        </div>
    </div>
  );
}

export default HomeHeader
