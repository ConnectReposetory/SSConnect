
import DefaultHeader from "../../components/header/defaultHeader";
import FontSizeChanger from '../../components/fontComponent/components/fontSizeChanger/index';
import FontAwesome from 'react-fontawesome';
import '../../components/fontComponent/styles/main.css';
const divStyle = {
  float:'right'
}

function About() {
  
  return (
    <div className="defaultContainer"  id="aboutUsContent">
      <DefaultHeader/>
      <div className="defaultPage">
        <h1>Over De Special Social Club</h1>
        <div style={divStyle}><FontSizeChanger
            targets={['#aboutUsContent .defaultPage']}
            options={{
              stepSize: 2,
              range: 3
            }}
            customButtons={{
              up: <FontAwesome name='search-plus' />,
              down: <FontAwesome name='search-minus' />,
              style: {
                backgroundColor: 'red',
                color: 'white',
                WebkitBoxSizing: 'border-box',
                WebkitBorderRadius: '5px',
                width: '60px'
              },
              buttonsMargin: 10
            }}
          /></div>
        <p className={'paragraphIntro'}>
          <span className={'paragraphTitle'}>MISSIE:</span>
          <span className={'paragraphIntroBody'}>Wij geloven dat dansen, sporten en sociale interacties basisrechten zijn voor iedereen, ook voor mensen met beperkingen. Wij willen daarom een inclusievere samenleving creëren door mensen samen te brengen en de drempels voor mensen met een beperking te verlagen, zodat ook zij volwaardig deel kunnen uitmaken van onze maatschappij.</span>

        </p>
        <p className={'paragraphIntro'}>
          <span className={'paragraphTitle'}>VISIE:</span>
          <span className={'paragraphIntroBody'}>Special Social Connect is de onmisbare link voor mensen met een beperking. Wij willen het sociaalste platform worden van Nederland en daarbij organisaties die inclusie stimuleren samenbrengen.</span>
        </p>
        <p>
          Special Social Connect is ontstaan vanuit de behoefte aan meer toegankelijke en inclusieve activiteiten in Nederland. Er worden al veel activiteiten georganiseerd maar deze zijn vaak moeilijk te vinden voor de doelgroep. Om die reden creëert Special Social Connect niet alleen een sociaal netwerk maar ook één overzicht met toegankelijke activiteiten voor mensen met een beperking. Op die manier kunnen zij makkelijker op zoek gaan naar leuke en toegankelijke activiteiten bij hen in de buurt. De activiteiten worden georganiseerd door diverse Special Partner zoals zorginstellingen, stichtingen en culturele organisaties. Samen met onze Special Partners hebben we de ambitie om hét sociaalste platform van Nederland te worden en zo bij te dragen aan een inclusieve samenleving.
        </p>
        <p>
          Special Social Connect is initiatief van stichting <a href="https://despecialsocialclub.nl/" target="_blank">De Special Social Club</a>. Lees de <a href="https://despecialsocialclub.nl/informatie-voor-begeleiders" target="_blank">veelgestelde vragen</a> voor meer informatie over de stichting.</p>
      </div>
    
     

      <div class="container">
      
</div>

</div>

    
   
    
  );
  
}

 

export default About
