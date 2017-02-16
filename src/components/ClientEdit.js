import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import ClientForm from './ClientForm';
import { clientUpdate, clientSave } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ClientEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    // REVIEW: the purpose of this code you wrote here is cryptic, and here's why: 
    // the intent is to fill the client's info to the ClientForm component.
    // but instead, the code reads "for each this.props.client, update client with {prop, value}"
    // Consider instead creating a function called "function fillFormWithClientInfo(clientInfo)".
    // This is the key to the Single Responsibility Principle AND to having super readable code.
    // if the following code said fillFormWithClientInfo(this.props.client), I'd know exactly what was going on.
    // But more importantly: you, a month out from now, will also know exactly what was going on.
    _.each(this.props.client, (value, prop) => {
      this.props.clientUpdate({ prop, value });
    });
  }

  // REVIEW: naming. you have two buttons on this component, go ahead and be specific about which one it is in the function name
  // ex: onSaveButtonPress or onSavePress.
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.clientSave({ name, phone, shift, uid: this.props.client.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming session is on ${shift}`);
  }

  onDeletePress() {
    this.setState({ showModal: !this.state.showModal });
  }

  // REVIEW: name for clarity over brevity. onConfirmDelete vs. onAccept --> you're in an 
  // edit screen, so I originally though this was about accepting the edit (until reading the code later on.)
  // in your Confirm component, this would look like:
  // <Confirm onAccept={this.onConfirmDelete.bind(this)} ... />
  onAccept() {
    //need to implement
  }

  // REVIEW: same goes for the naming here. onCancelDelete vs. onDecline. 
  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ClientForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onDeletePress.bind(this)}>
            Delete Client
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this client?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.clientForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { clientUpdate, clientSave })(ClientEdit);
