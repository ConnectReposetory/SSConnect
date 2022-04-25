import "./styles.css"
import {dateToDay, dateToMonth} from "../../utils/dateLabel";
import {useRef, useState} from "react";

function HomeItem({event, isActive}) {

  return (
    <>
      <div className={'homeItem'} style={{backgroundImage: `url(${event.images.square}`}}>
        <div className={'homeItemContent'}>
          <div className={'dateLabel'}>
            <div>
              <span className={'dateLabelDay'}>{dateToDay(event.date)}</span>
              <span className={'dateLabelMonth'}>{dateToMonth(event.date)}</span>
            </div>
          </div>
          <div className={'titleBlock'}>
            {event.title.short || event.title.long}
          </div>
        </div>
      </div>
      {isActive && (
        <>
          <div className={'homeDetailContent'}>
            <div className={'homeTitle'}>
              {event.title.long}
              <span className={'homeTime'}>
                {!!event.time && !event.endtime && `Begint om ${event.time}` }
                {!!event.time && !!event.endtime && `Van ${event.time} tot ${event.endtime}`}
              </span>
            </div>
            <div className={'homeTeaser'}>
              <p>{event.introduction}</p>
              <p>{event.description}</p>
            </div>
            <div className={'homeOnline'}>
              {event.online === "1"  && 'online'}
            </div>
          </div>
          <div className={'homeLink'}>
            <a href= {event.link} target={'_blank'}>
              {event.link_name}
            </a>
          </div>
          {!!event.partner && (
            <div className={'homePartner'}>
              <div className={'homePartnerLogo'} style={{backgroundImage: `url(${event.partner.image}`}}/>
              <div className={'homePartnerName'}>{event.partner.name}</div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomeItem
