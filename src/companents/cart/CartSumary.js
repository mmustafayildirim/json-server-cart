import React, { Component } from 'react'
import { connect } from "react-redux"
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, NavLink, Badge } from 'reactstrap';
import { bindActionCreators } from 'redux';
import * as cartActions from "../../redux/actions/cartActions"
import {Link} from "react-router-dom";
import alertify from "alertifyjs"
class CartSumary extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName +"  "+   "Sepetten Silindi");
    }
    renderEmpty() {
        return (
            <NavItem>
                <NavLink >
                    <img src="https://img.icons8.com/nolan/30/fast-cart.png" />
                 
                </NavLink>
            </NavItem>
        )
    }
    renderSummery() {
        return (
            <UncontrolledButtonDropdown nav inNavbar right>
                <DropdownToggle nav caret>
                    <img src="https://img.icons8.com/nolan/30/fast-cart.png"  />
                   <sup><span className="badge alert-danger badge-pill ml-4">{this.props.cart.length}</span></sup> 

                </DropdownToggle>
                <DropdownMenu >
                    {this.props.cart.map(cartItem =>
                        <DropdownItem key={cartItem.product.id}> 
                        <img src="https://img.icons8.com/office/16/000000/delete--v2.png" onClick={()=>this.removeFromCart(cartItem.product)}/> &nbsp;
                        {cartItem.product.productName} &nbsp;
                        <span className="badge alert-primary badge-pill ml-4">{cartItem.quantity}</span>
                        </DropdownItem>
                    )}
                    <DropdownItem divider />
                    <DropdownItem> <Link to="/cart">Sepete Git</Link> </DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        )
    }
    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummery() : this.renderEmpty()}

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

export default connect(mapStateToProps,mapDispatchToProps)(CartSumary)