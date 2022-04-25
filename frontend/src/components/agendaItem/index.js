import "./styles.css"
import {dateToDay, dateToMonth} from "../../utils/dateLabel";
import {useRef, useState} from "react";

function AgendaItem({event, scrollTo}) {
  const [open,setOpen]=useState(false);
  const imageRef = useRef();
  const itemRef = useRef();

  function toggleClick() {
    const {offsetTop} = itemRef.current
    if(!open) {
      scrollTo(offsetTop)
    }
    setOpen(!open)
  }
  const agendaItemClasses = ['agendaItem'];
  if(open){
    agendaItemClasses.push('active')
  }
  return (
    <div className={agendaItemClasses.join(" ")} ref={itemRef} onClick={toggleClick} >
      <div
        className={'agendItemHeader'}
        ref={imageRef}
        style={
          {
            backgroundImage: (!open && event.images.letterbox && event.images.letterbox.length > 0) ? `url(${event.images.letterbox}` : `url(${event.images.square}`,
            height: open ? `${imageRef.current.clientWidth}px` : '140px'
          }
        }
      />
      <div className={'agendaItemContent'}>
        <div className={'dateLabel'}>
          <div>
            <span className={'dateLabelDay'}>{dateToDay(event.date)}</span>
            <span className={'dateLabelMonth'}>{dateToMonth(event.date)}</span>
          </div>
        </div>
        <div className={'agendaTitle'}>
          {event.title.long}
          <span className={'agendaTime'}>
            {!!event.time && !event.endtime && `Begint om ${event.time}` }
            {!!event.time && !!event.endtime && `Van ${event.time} tot ${event.endtime}`}
          </span>
        </div>
        <div className={'agendaTeaser'}>
          <p>{event.introduction}</p>
          {open && (<p>{event.description}</p>)}
        </div>
        <div className={'agendaOnline'}>
          {event.online === "1"  && 'online'}
        </div>
      </div>
      <div className={'agendaLink'}>
          <a href= {event.link} target={'_blank'}>
            {event.link_name}
          </a>
      </div>
      {!!event.partner && (
        <div className={'agendaPartner'}>
          <div className={'agendaPartnerLogo'} style={{backgroundImage: `url(${event.partner.image}`}}/>
          <div className={'agendaPartnerName'}>{event.partner.name}</div>
        </div>
      )}
    </div>
  );
}

export default AgendaItem
