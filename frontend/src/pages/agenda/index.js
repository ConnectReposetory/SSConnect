import {useEffect, useState, useRef} from 'react';
import Search from "../../components/search";
import AgendaHeader from "../../components/header/agendaHeader";
import AgendaItem from "../../components/agendaItem";

import "./styles.css"
import {getAgendaEvents, getAgendaPartners, getAgendaSearchCriteria} from "../../redux/reducers";
import {connect} from "react-redux";
import {getSearchCriteria} from "../../redux/reducers/agenda";
import mapEventFilterToParamName from "../../utils/mapEventFilterToParamName";
import isDateWithinTimeframe from "../../utils/isDateWithinTimeframe";
import Loader from "../../components/loader";


function Agenda({events, searchCriteria, partners}) {
  const searchRef = useRef();
  const columnRef= useRef();
  const [sticky,setSticky]=useState(false);
  const [searchBarWidth,setSearchBarWidth]=useState(false);
  const [filteredEvents,setFilteredEvents]=useState([]);

  const scrollTo = (offsetTopItem) => {
    const { offsetTop } = columnRef.current;
    window.scrollTo(0, offsetTop + offsetTopItem);
  }


  const handleScroll=() => {
    if(searchRef.current) {
      const { clientWidth } = searchRef.current;
      const { offsetTop } = columnRef.current;
      const { scrollY } = window;
      if(scrollY > offsetTop) {
        setSticky(true);
        setSearchBarWidth(clientWidth)
      } else {
        setSticky(false);
        setSearchBarWidth(false)
      }
    }
  }


  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
    window.addEventListener('resize',handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, [])

  useEffect(()=>{

    const newFilteredEvents = events.filter((item) => {
      let passed = true
      for (const [key, value] of Object.entries(searchCriteria)) {
        if (!passed) {break;}
        switch (key) {
          case 'when':
            if(Number(value) !== -1) {
              passed = isDateWithinTimeframe(item.date, value)
            }
            break;
          case 'who':
            if(Number(value) !== -1 && item.partner && item.partner.id){
              passed = item.partner.id === Number(value)
            }
            break;
          default:
            if(Number(value) !== -1){
              const paramName = mapEventFilterToParamName(key);
              if(item[paramName] && Number(item[paramName]) !==  Number(value)){
                passed = false
              }
            }
            break;
        }
      }
      return passed;
    })

    setFilteredEvents(newFilteredEvents);
  },[searchCriteria, events])

  return (
    <div className="agendaContainer">
      <AgendaHeader/>
      <div className="agendaPage">
        <div className={'column search-column'} ref={columnRef}>
          <div className={sticky ? 'sticky' : ''} style={{width: searchBarWidth || 'auto'}}>
            <Search showButton={false} />
          </div>
          <div ref={searchRef}></div>
        </div>
        <div className={'column'}>
          {events.length === 0 && <Loader/>}
          {events.length !== 0 && (
            <ul className={sticky ? 'extraMarginForSticky' : ''}>
              {
                filteredEvents.map((event, index) =>
                  <li key={index} className={'agendaListItem'}>
                    <AgendaItem event={event} scrollTo={scrollTo} />
                  </li>
                )
              }
            </ul>
          )}
          {events.length !== 0 && filteredEvents.length === 0 && (
            <p className={'agendaNoItems'}>Helaas zijn er op dit moment  <br/>geen evenementen</p>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  events: getAgendaEvents(state),
  searchCriteria: getAgendaSearchCriteria(state),
  partners: getAgendaPartners(state)
});


export default connect(
  mapStateToProps,
  null,
)(Agenda)
