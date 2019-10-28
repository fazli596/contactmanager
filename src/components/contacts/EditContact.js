import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';



class EditContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }


  async componentDidMount() {
    const { id } =  this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;
    
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    })
  }






  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;


    // Error Checking
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }


    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }



    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }




    // updating the contact

    const updContact = {
      name,
      email,
      phone
    }


    const { id } = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

    dispatch({type: 'UPDATE_CONTACT', payload: res.data});


    
    // clearing textfields after adding a contact
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });


    // redirect to home page
    this.props.history.push('/');

  }

  render() {

    const { name, email, phone, errors } = this.state;


    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter Name ..."
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter Email ..."
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone ..."
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <div className="form-group text-center">
                    <input type="submit" value="Edit Contact" name="submit" className="form-control btn btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}


export default EditContact;