
import "./styles.css"
import HomeHeader from "../../components/header/homeHeader";
import {getAgendaEvents} from "../../redux/reducers";
import {connect} from "react-redux";
import Loader from "../../components/loader";
import HomeItem from "../../components/homeItem";
import {useState} from "react";

function Home({events}) {

  const [activeEvent,setActiveEvent]=useState(-1);
const [fontSize, setFontSize] = useState(16);
  function  onHomeItemClick(eventIndex) {
    if(eventIndex === activeEvent) {
      setActiveEvent(-1);

    } else {
      setActiveEvent(eventIndex);

    }
  }

  return (
    <>
      <HomeHeader/>
      <div className="pageContainer">
        <div className={'home'}>
          {events.length === 0 && <Loader/>}
          {events.length > 0 && (
            <ul className={'itemList'}>
              {
                events.map((event, index) =>
                  <li key={index}  className={(index === activeEvent) ? 'selected' : ''} onClick={() => onHomeItemClick(index)}>
                    <HomeItem event={event} isActive={index === activeEvent}/>
                  </li>
                )
              }
            </ul>
            )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  events: getAgendaEvents(state)
});

export default connect(
  mapStateToProps,
  null,
)(Home)
