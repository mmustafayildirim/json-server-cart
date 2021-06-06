import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions"
import { connect } from "react-redux"
import { Table } from 'reactstrap';
import alertify from "alertifyjs"
class cartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName +"  "+   "Sepetten Silindi");
    }
    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>     
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(cartItem => (
                            <tr key ={cartItem.product.id}>
                                <th scope="row">{cartItem.product.id}</th>
                                <td>{cartItem.product.productName}</td>
                                <td>{cartItem.product.unitPrice}</td>
                                <td>{cartItem.quantity}</td> 
                                <td> <img role="button" src="https://img.icons8.com/office/16/000000/delete--v2.png"
                                onClick={() => this.removeFromCart(cartItem.product)}/>
                                </td>
                            </tr>))}


                    </tbody>
                </Table>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)

        }
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cartReducer,
    

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(cartDetail)