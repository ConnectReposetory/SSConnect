import "./styles.css"
import DefaultHeader from "../../components/header/defaultHeader";
import {getAgendaPartners, getAgendaSearchCriteria} from "../../redux/reducers";
import {connect} from "react-redux";
import {useHistory} from "react-router";
import {setSearchCriteria} from "../../redux/actions";

function Partners({partners, searchCriteria, dispatchSetSearchCriteria}) {
  let history = useHistory();

  function goToAgendaWithPartner(id) {
    const newCriteria = searchCriteria;
    newCriteria.who = id;
    dispatchSetSearchCriteria(newCriteria);

    history.push("agenda");
  }

  return (
    <div className="defaultContainer partnerContainer">
      <DefaultHeader/>
      <div className="defaultPage ">
        <h2>Samen met onze Special Partners hebben we de ambitie om hét sociaalste platform van Nederland te worden en zo bij te dragen aan een inclusieve samenleving.</h2>
        <p>
          Met jouw hulp gaat dat sneller! Als jouw organisatie leuke activiteiten organiseert voor mensen met een beperking waar ook mensen van buiten de organisatie welkom zijn, wordt dan partner van Special Social Connect en promoot gratis jouw evenementen. Meld je aan via dit <a href="https://docs.google.com/forms/d/1irAf-kbRvhb1Zm11Gi4kagMrDwtxL-jliMBcUJspo54" target="_blank">aanmeldingsformulier</a> en wij nemen <a href="mailto:info@despecialsocialclub.nl" target="_blank">contact</a> met je op.
        </p>
          <ul className={'partnerList'}>
          {partners.map((partner, index)=> (
            <li key={partner.id} className={'partnerItemContainer'}>
              {!!partner.image && (
                <div className={'logoContainer'}>
                  <img className={'partnerLogo'} src={partner.image} />
                </div>
              )}
              <div className={'partnerInfo'}>
                <div className={'partnerDescription'}>
                  <p>{partner.description}</p>
                </div>
                <div className={'partnerLink'}>
                  <a onClick={()=> goToAgendaWithPartner(partner.id)}>Bekijk wat wij organiseren</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  partners: getAgendaPartners(state),
  searchCriteria: getAgendaSearchCriteria(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetSearchCriteria: (criteria) => {
    dispatch(setSearchCriteria(criteria));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Partners)
