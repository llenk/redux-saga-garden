import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'GET_PLANTS'});
    }

    deletePlant = (id) => (event) => {
        this.props.dispatch({type: 'DELETE_PLANT', payload: id});
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.plantList.map(pl => (<tr key={pl.id}>
                            <td>
                                {pl.id}
                            </td>
                            <td>
                                {pl.name}
                            </td>
                            <td>
                                <button onClick={this.deletePlant(pl.id)}>
                                    DEEEEEEELETE
                                </button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);
