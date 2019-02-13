import React, { Component } from 'react';
import axios from 'axios';

import styles from './App.scss';

const customers = [
    {
        id: 'all',
        label: 'All',
    },
    {
        id: 'unilever',
        label: 'Unilever',
    },
    {
        id: 'apple',
        label: 'Apple',
    },{
        id: 'ford',
        label: 'Ford',
    }
];

const products = [
    {
        id: 'classic',
        label: 'Classic',
        price: 269.99,
    },
    {
        id: 'standout',
        label: 'Standout',
        price: 322.99,
    },
    {
        id: 'premium',
        label: 'Premium',
        price: 394.99,
    },
];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCustomerId: customers[0].id,
            items: products,
            cartList: [],
            total: 0,
        };
        this.onAddItem = this.onAddItem.bind(this);
        this.onChangeCustomer = this.onChangeCustomer.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    onChangeCustomer(e) {
        e.persist();
        this.setState(() => ({
            selectedCustomerId: e.target.value,
        }), this.calculate);
        this.setState({
            cartList: [],
            total: 0
        })
    }

    onAddItem(value) {
        this.setState(prevState => ({
            cartList: [...prevState.cartList, value],
        }), this.calculate);
    }

    calculate() {
        const {
            selectedCustomerId,
            cartList,
        } = this.state;
        axios.post('http://localhost:5000/checkout', {
            customer: selectedCustomerId,
            items: cartList,
        })
            .then(res => this.setState({
                total: res.data.total,
            }))
            .catch(err => console.log(err)); // eslint-disable-line no-console
    }

    countItem(type) {
        const { cartList } = this.state;
        const countTypes = cartList.filter(item => item === type);
        return countTypes.length;
    }

    render() {
        const {
            items,
            total,
        } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <select name="customer" onChange={this.onChangeCustomer}>
                        {customers.map(customer => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.label}
                            </option>
                        ))}
                    </select>
                    {items.map(data => (
                        <div
                            key={data.id}
                            className={styles.productContainer}
                        >
                            <div className={styles.productLabel}>{data.label}</div>
                            <div>
                                Price: {data.price}
                            </div>
                            <button
                                onClick={() => this.onAddItem(data.id)}
                                type="button"
                                className={styles.productButton}
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.cartContainer}>
                    <div>
                        Classic: {this.countItem('classic')}
                    </div>
                    <div>
                        Standout: {this.countItem('standout')}
                    </div>
                    <div>
                        Premium: {this.countItem('premium')}
                    </div>
                    <div className={styles.total}>Total: {total.toFixed(2)}</div>
                </div>
            </div>
        );
    }
}
