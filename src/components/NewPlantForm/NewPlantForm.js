import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

const emptyPlant = {
    name: '',
    kingdom: '',
    clade: '',
    order: '',
    family: '',
    subfamily: '',
    genus: '',
}

class NewPlantForm extends Component {
    state = {
        newPlant: emptyPlant,
    }

    handleChange = event => {
        console.log('event happened')
        this.setState({
            newPlant: {
                ...this.state.newPlant,
                [event.target.name]: event.target.value,
            }
        });
    }

    addNewPlant = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant })
        this.setState({
            newPlant: emptyPlant,
        });
    }

    render() {
        return (
            <div>
                <h3>This is the form</h3>
                <pre>{JSON.stringify(this.state)}</pre>
                <form onSubmit={this.addNewPlant}>
                    <input type='text' value={this.state.newPlant.name} name="name" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.kingdom} name="kingdom" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.clade} name="clade" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.order} name="order" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.family} name="family" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.subfamily} name="subfamily" onChange={this.handleChange} />
                    <input type='text' value={this.state.newPlant.genus} name="genus" onChange={this.handleChange} />

                    <input type='submit' value='Add New Plant' />
                </form>
            </div>
        );
    }
}


export default connect(mapStateToProps)(NewPlantForm);
