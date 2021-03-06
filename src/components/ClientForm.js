import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';

// REVIEW: naming. import from '../actions' is a fun way to be lazy, but it doesn't help you locate clientUpdate when you add more
// action files. or any future files.
import { clientUpdate } from '../actions'; 
import { CardSection, Input } from './common';


class ClientForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="client name"
            value={this.props.name}
            onChangeText={value => this.props.clientUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="777-777-7777"
            value={this.props.phone}
            onChangeText={value => this.props.clientUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerLabelStyle}>Session</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.clientUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.clientForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { clientUpdate })(ClientForm);
