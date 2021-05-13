import {Component} from 'react';
import GIGServer from '../model/GIGServer.js';
import Infobox from '../components/Infobox.js';

export default class PlaceInfobox extends Component {
  async componentDidMount() {
    const  {entityType, entityID} = this.props;
    const entity = await GIGServer.getEntity(entityType, entityID);
    this.setState({
        entity,
    })
  }
  render() {
    if (!this.state || !this.state.entity) {
      return null;
    }
    const {entity} = this.state;

    const {
      phone_office: phoneOffice,
      phone_mobile: phoneMobile,
    } = entity;


    const info = [
      {
          label: 'Phone (Office)',
          value: <PhoneLink number={phoneOffice} />,
      },
      {
          label: 'Phone (OIC\'s Mobile)',
          value: <PhoneLink number={phoneMobile} />,
      },
      {
        label: 'Police Division',
        value: entity.division,
      },
    ];

    return (
      <Infobox
        title={entity.name}
        subTitle="Police Station"
        info={info}
        style={{background: 'rgba(240, 240, 255, 0.8)'}}
      />
    );
  }
}

class PhoneLink extends Component {
    render() {
      let {number} = this.props;
      number = number.replace('-', '');
      number = `${number.substring(0, 4)} ${number.substring(4, 7)} ${number.substring(7, 10)}`;

      return (
        <a href={`tel:${number}`}>
          {number}
        </a>
      )
    }
}
