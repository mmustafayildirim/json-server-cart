import React, { Component } from 'react'
import { connect } from "react-redux"
import { Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux'
import * as productActions from "../../redux/actions/productActions"
import * as cartActions from "../../redux/actions/cartActions"
import alertify from "alertifyjs"
class ProductList extends Component {
    componentDidMount() {
        this.props.actions.getProducts();
    };
    addToCart = (product) => {
        this.props.actions.addToCart({ quantity: 1, product })
        alertify.success(product.productName + "Sepete Eklendi");
    }
    render() {
        return (
            <div>
                <span className="badge alert-primary badge-pill ml-4 px-5 py-2 my-2">Products</span>
                <span className="badge alert-warning badge-pill ml-4 px-5 py-2 my-2">{this.props.currentCategory.categoryName}</span>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity Per Unit</th>    
                            <th>Units In Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => (
                            <tr>
                                <th scope="row">{product.id}</th>
                                <td>{product.productName}</td>
                                <td>{product.quantityPerUnit}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.unitsInStock}</td>
                                <td><Button onClick={() => this.addToCart(product)}
                                    color="primary">Ekle</Button></td>
                            </tr>))}


                    </tbody>
                </Table>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentCategory: state.changeCategoryReducer,
        products: state.productListReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getProducts: bindActionCreators(productActions.getProducts, dispatch),
            addToCart: bindActionCreators(cartActions.addToCart, dispatch)

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)