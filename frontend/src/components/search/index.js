import {useState, useEffect} from 'react'
import "./styles.css"
import {useHistory} from "react-router";
import {getSearchCriteria} from "../../redux/reducers/agenda";
import {setSearchCriteria} from "../../redux/actions";
import {connect} from "react-redux";
import {getAgendaPartners, getAgendaRegions, getAgendaSearchCriteria} from "../../redux/reducers";

function Search({dispatchSetSearchCriteria, searchCriteria, regions, showButton, partners}) {
  const [adultEvent, setAdultEvent] = useState(searchCriteria.adultEvent || -1)
  const [onlineEvent, setOnlineEvent] = useState(searchCriteria.onlineEvent ||  -1)
  const [accessibleEvent, setAccessibleEvent] = useState(searchCriteria.accessibleEvent ||  -1)
  const [region, setRegion] = useState(searchCriteria.region ||  -1)
  const [when, setWhen] = useState(searchCriteria.when || -1)
  const [who, setWho] = useState(searchCriteria.who || -1)

  let history = useHistory();

  function goToAgenda() {
    history.push("agenda");
  }

  useEffect(() =>{
    const payload = {
      adultEvent,
      onlineEvent,
      accessibleEvent,
      region,
      when,
      who,
    }

    dispatchSetSearchCriteria(payload);
  },[adultEvent, onlineEvent, accessibleEvent, region, when, who])

  function resetSearchCriteria(){
    Promise.resolve().then(() => {
      setAdultEvent(-1);
      setOnlineEvent(-1);
      setRegion(-1);
      setAccessibleEvent(-1);
      setWhen(-1);
      setWho(-1);
    });
  }
  function changeRegion(event) {
    setRegion(event.target.value)
  }

  function changeWhen(event) {
    setWhen(event.target.value)
  }

  function changePartner(event) {
    setWho(event.target.value)
  }

  const onlineEventClick = () => {
    setOnlineEvent(1);
    setRegion(-1);
  }

  return (
    <div className='search'>
      <div className='searchRow'>
        <span className='searchRowLabel'>Waar:</span>
        <select className='searchSelect' onChange={changeRegion} value={region}>
          <option value={-1}>Nederland</option>
          {
            Object.keys(regions).map(function(key, index) {
              return  <option key={key} value={key}>{regions[key]}</option>
            })
          }
        </select>
      </div>
      <div className='searchRow'>
        <span className='searchRowLabel'>Wanneer:</span>
        <select className='searchSelect' onChange={changeWhen} value={when}>
          <option value={-1}>Altijd</option>
          {/*<option value={'from_today'}>Vanaf vandaag</option>*/}
          <option value={'this_month'}>Deze maand</option>
          <option value={'this_week'}>Deze week</option>
          <option value={'today'}>Vandaag</option>

        </select>
      </div>
      <div className='searchRow'>
        <span className='searchRowLabel'>Wie:</span>
        <select className='searchSelect' onChange={changePartner} value={who}>
          <option value={-1}>Iedereen</option>
          {
            partners.map((partner, index) =>{
              return  <option key={index} value={partner.id}>{partner.name}</option>
            })
          }
        </select>
      </div>
      <div className='searchRow'>
        <span className='searchRowLabel'>Rolstoeltoegankelijk:</span>
        <div className='toggle'>
          <a className={`toggleOption ${accessibleEvent === 0 ? 'selected' : ''}`} onClick={() => setAccessibleEvent(0)}>nee</a>
          <a className={`toggleOption ${accessibleEvent === 1 ? 'selected' : ''}`} onClick={() => setAccessibleEvent(1)}>ja</a>
        </div>
      </div>
      <div className='searchRow'>
        <span className='searchRowLabel'>Leeftijd:</span>
        <div className='toggle'>
          <a className={`toggleOption ${adultEvent === 0 ? 'selected' : ''}`} onClick={() => setAdultEvent(0)}>12-18jr</a>
          <a className={`toggleOption ${adultEvent === 1 ? 'selected' : ''}`} onClick={() => setAdultEvent(1)}>18jr en ouder</a>
        </div>
      </div>
      <div className='searchRow'>
        <div className='toggle'>
          <a className={`toggleOption ${onlineEvent === 0 ? 'selected' : ''}`} onClick={() => setOnlineEvent(0)}>offline</a>
          <a className={`toggleOption ${onlineEvent === 1 ? 'selected' : ''}`} onClick={onlineEventClick}>online</a>

        </div>
      </div>
      {showButton && (
        <div className='actionRow'>
          <a className={'actionButton'} onClick={goToAgenda}>Naar de agenda</a>
        </div>
      )}
      <div className='resetButtonContainer'>
        <a className={'resetButton'} onClick={resetSearchCriteria}></a>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchCriteria: getAgendaSearchCriteria(state),
  regions: getAgendaRegions(state),
  partners: getAgendaPartners(state)
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchCriteria: (criteria) => {
    dispatch(setSearchCriteria(criteria));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
