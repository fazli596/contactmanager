import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Contact extends Component {

  state = {
    showContactInfo : false,
  };

  onShowClick = () => {
    this.setState({
      showContactInfo: !this.state.showContactInfo,
    });
  };


  onDeleteClick = async (id, dispatch) => {

    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };



  render() {
    const {id, name, phone, email} = this.props.contact;
    const {showContactInfo} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <a href="#!" onClick={this.onShowClick}> + </a>
                <a href="#!" onClick={this.onDeleteClick.bind(this, id, dispatch)} style={{ float: 'right', color: 'red' }}> X </a>
                <Link to={`contact/edit/${id}`}>
                  <span 
                    style={{
                      float: 'right',
                      cursor: 'pointer',
                      marginRight: '1rem'
                    }}>Edit
                  </span>
                </Link>
              </h4> 
              {showContactInfo ? (<ul className="list-group">
                <li className="list-group-item">Email : {email}</li>
                <li className="list-group-item">Phone : {phone}</li>
              </ul>) : null}

            </div>
          )
        }}
      </Consumer>
    )
  }
}


Contact.propTypes = {
  contact: PropTypes.object.isRequired
};


export default Contact;
