import React, {Component} from 'react'
import axios from 'axios'

class ProductPage extends Component {
    constructor(){
        super()
        this.state = {
            title1: 'Registrar un nuevo producto',
            title2: 'Listado de productos',
            newProductName:'',
            newProductQuantity:'',
            newProductPrice:'',
            newProductDiscount:'',
            products:[],
            message: "Añadido exitosamente",
            success:false,
        } 
    }

    componentDidMount() {
        axios.get('http://localhost:8000/product').then(response => {
            const products = response.data.data
            this.setState({
                products
            })
        })    
    }
    async formSubmitted(event){
        event.preventDefault()
        let newProduct = {
            name: this.state.newProductName,
            quantity:this.state.newProductQuantity,
            price:this.state.newProductPrice,
            discount:this.state.newProductDiscount
        }
        this.setState({
            newProductName:'',
            newProductQuantity:'',
            newProductPrice:'',
            newProductDiscount:'',
        })
        let response = await axios.post('http://localhost:8000/product',newProduct)
        this.setState({success:true})
        let getResponse = await axios.get('http://localhost:8000/product')
        let newData = getResponse.data.data
        this.setState({
            products: newData
        })
        setInterval(() => {
            this.setState({success:false})
        }, 3000);
    }
    newProductNameChanged(event){
        this.setState({
            newProductName: event.target.value
        })
    }
    newProductQuantityChanged(event){
        this.setState({
            newProductQuantity: event.target.value
        })
    }
    newProductPriceChanged(event){
        this.setState({
            newProductPrice: event.target.value
        })
    }
    newProductDiscountChanged(event){
        this.setState({
            newProductDiscount: event.target.value
        })
    }
    render(){
        return (
            <div>
                <h1>{this.state.title1}</h1>
                <hr></hr>
                <form onSubmit={this.formSubmitted.bind(this)}>

                    <label htmlFor="newProductName">Nombre</label><br/>
                    <input onChange={(event)=>this.newProductNameChanged(event)} htmlFor="newProductName" name="newProductName" value={this.state.newProductName}/><br/>

                    <label htmlFor="newProductQuantity">Cantidad</label><br/>
                    <input onChange={(event)=>this.newProductQuantityChanged(event)} htmlFor="newProductQuantity" name="newProductQuantity" value={this.state.newProductQuantity}/><br/>

                    <label htmlFor="newProductPrice">Precio</label><br/>
                    <input onChange={(event)=>this.newProductPriceChanged(event)} htmlFor="newProductPrice" name="newProductPrice" value={this.state.newProductPrice}/><br/>

                    <label htmlFor="newProductDiscount">Descuento</label><br/>
                    <input onChange={(event)=>this.newProductDiscountChanged(event)} htmlFor="newProductDiscount" name="newProductDiscount" value={this.state.newProductDiscount}/><br/>

                    <button type="submit">Guardar</button>
                    <br></br>
                    <span>{this.state.success ? this.state.message : ''}</span>
                </form>
                <hr></hr>
                <h1>{this.state.title2}</h1>
                <ul>
                    {this.state.products.map((product,index) =>{
                        return <li key={index}>{product.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ProductPage