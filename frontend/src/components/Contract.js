import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  createContract,
  getContracts,
  updateContract,
  deleteContract
} from '../actions/contractActions';

class Contract extends Component {
  state = {
    mode: 'create',
    _id: '',
    user: { firstName: '', lastName: '' },
    amount: '',
    currency: '',
    date: ''
  };

  showUpdateModal = (o) => {
    return (e) => {
      let tempObj = {
        mode: 'update',
        _id: o._id,
        user: o.user,
        amount: o.amount,
        currency: o.currency,
        date: o.date
      };
      this.setState(tempObj, () => {
        window.$('#current-contract').modal();
      });
    };
  };

  removeContract = (id) => {
    return () => {
      this.props.deleteContract(id);
    };
  };

  componentDidMount() {
    this.props.getContracts();
  }

  onSubmit = (e) => {
    e.preventDefault();

    let payload = {
      user: {
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName
      },
      amount: Number(this.state.amount),
      currency: this.state.currency,
      date: moment(this.state.date).toISOString()
    };

    if (this.state.mode === 'update') {
      payload._id = this.state._id;
      this.props.updateContract(payload);
    } else {
      this.props.createContract(payload);
    }

    window.$('#close').click();
  };

  onChange = (item) => {
    return (e) => {
      let v = e.target.value;
      let payload = { [item]: v };
      if (item === 'firstName') {
        let lastName = this.state.user.lastName;
        payload = {
          user: { firstName: v, lastName }
        }
      }
      if (item === 'lastName') {
        let firstName = this.state.user.firstName;
        payload = {
          user: { firstName, lastName: v }
        }
      }
      this.setState(payload);
    };
  };

  showCreateModal = () => {
    let tempObj = {
      mode: 'create',
      _id: '',
      user: {
        firstName: '',
        lastName: '',
      },
      amount: '',
      currency: '',
      date: ''
    };
    this.setState(tempObj, () => {
      window.$('#current-contract').modal();
    });
  };

  contractModal() {
    return (
      <div
        id="current-contract"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="current-contract"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={this.onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {this.state.mode === 'update'
                    ? 'Update Contract'
                    : 'Create Contract'}
                </h5>

                <button
                  type="button"
                  className="close"
                  id="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label">FirstName: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.user.firstName}
                    onChange={this.onChange('firstName')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">LastName: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.user.lastName}
                    onChange={this.onChange('lastName')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Amount: </label>
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.amount}
                    onChange={this.onChange('amount')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Currency: </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.currency}
                    onChange={this.onChange('currency')}
                  />
                </div>
                <div className="form-group">
                  <label className="col-form-label">Date: </label>
                  <input
                    type="date"
                    className="form-control"
                    value={moment(this.state.date).format('YYYY-MM-DD')}
                    onChange={this.onChange('date')}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-secondary btn-sm">
                  {this.state.mode === 'update' ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  tableRows() {
    let arr = this.props.contracts.contractList;
    if (arr && arr.length) {
      return arr.map((obj, i) => {
        let { _id, user, amount, currency, date } = obj;
        let { firstName, lastName } = user;
        return (
          <tr key={_id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{amount}</td>
            <td>{currency}</td>
            <td>{moment(date).format('YYYY-MM-DD')}</td>
            <td>
              <span onClick={this.showUpdateModal(obj)}>
                <i className="far fa-edit" />
              </span>
            </td>
            <td>
              <span onClick={this.removeContract(_id)}>
                <i className="fas fa-trash-alt" />
              </span>
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h3 className="text-center mt-20">Contracts</h3>
        <div style={{ textAlign: 'right', margin: '10px 0 20px 0' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.showCreateModal}
          >
            Create
          </button>
        </div>
        {this.contractModal()}
        <table className="table table-hover" id="contract-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Date</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{this.tableRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contracts: state.contracts
});

export default connect(
  mapStateToProps,
  {
    createContract,
    getContracts,
    updateContract,
    deleteContract
  }
)(Contract);
