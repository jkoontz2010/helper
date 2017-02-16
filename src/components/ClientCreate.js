import React, { Component } from 'react';
import { connect } from 'react-redux';

// REVIEW: unusused dependency, clientUpdate. consider using a linter to catch this kind of minor detail for you.
import { clientUpdate, clientCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ClientForm from './ClientForm';

class ClientCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.clientCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <ClientForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.clientForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { clientUpdate, clientCreate })(ClientCreate);
