import React, { Component } from 'react'
import axios from 'axios'

class CreateProductPage extends Component {
    constructor(){
        super()
        this.name = React.createRef()
        this.quantity = React.createRef()
        this.price = React.createRef()
        this.type = React.createRef()
        this.discount = React.createRef()
        this.state = {
            nationality:'Peruana',
            title1: 'Registrar un nuevo producto',
            types:['Electrodomésticos','Golosinas','Otros'],
            message: "Se guardó de manera correcta el Producto",
            success:false,

            isInvalidName: false,
            isInvalidQuantity: false,
            isInvalidPrice: false,
        } 
    }
    isValid = (value) => {
        if (value.trim().length === 0){
            return false
        } else {
            return true
        }
    }

    formSubmitted = async (event) => {
        event.preventDefault()

        const name = this.name.current.value
        let quantity = this.quantity.current.value
        let price = this.price.current.value
        const type = this.type.current.value
        const discount = this.discount.current.checked
        const nationality = this.state.nationality

        if (this.isValid(name)){
            await this.setState({isInvalidName: false})
        } else {
            await this.setState({isInvalidName: true})
        }
        if (this.isValid(quantity)){
            await this.setState({isInvalidQuantity: false})
        } else {
            await this.setState({isInvalidQuantity: true})
        }
        if (this.isValid(price)){
            await this.setState({isInvalidPrice: false})
        } else {
            await this.setState({isInvalidPrice: true})
        }

        if(this.state.isInvalidName === true || this.state.isInvalidPrice === true || this.state.isInvalidQuantity === true){
            console.log("Alguno no es valido")
            return
        }
        
        let product = {
            name,
            quantity:parseFloat(quantity),
            price:parseFloat(price),
            type,
            discount,
            nationality
        }

        await axios.post('http://localhost:8000/product',product)
        this.setState({success:true})
        let getResponse = await axios.get('http://localhost:8000/product')
        let data = getResponse.data.data
        this.setState({
            products: data
        })
        setInterval(() => {
            this.setState({success:false})
        }, 3000);
    }
    changeRadioButton = (event) => {
        let nationality = event.target.value
        this.setState({nationality})
    }
    render() {
        return (<div>
                <h1>{this.state.title1}</h1>
                <hr></hr>
                <form onSubmit={this.formSubmitted}>

                    <label htmlFor="name">Nombre</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidName ? "Nombre es requerido" : ""}</span>
                    <input htmlFor="name" name="name" ref={this.name}/><br/>

                    <label htmlFor="quantity">Cantidad</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidQuantity ? "Cantidad es requerido" : ""}</span>
                    <input htmlFor="quantity" name="quantity" ref={this.quantity}/><br/>

                    <label htmlFor="price">Precio</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidPrice ? "Precio es requerido" : ""}</span>
                    <input htmlFor="price" name="price" ref={this.price}/><br/>

                    <label htmlFor="type">Tipo</label>
                    <select htmlFor="type" ref={this.type}>
                        {this.state.types.map((type,index) => <option key={index} value={type} name="newProductType">{type}</option>)}
                    </select>
                    <br/>

                    <label htmlFor="discount">Descuento</label>
                    <input type="checkbox" htmlFor="discount" name="discount" ref={this.discount}/><br/>

                    <label htmlFor="nationality">Nacionalidad</label>
                    <input 
                        type="radio" 
                        htmlFor="nationality" 
                        name="nationality" 
                        value='Peruana' 
                        checked={this.state.nationality ==='Peruana'} 
                        onChange={this.changeRadioButton}/>Peruana
                    <input 
                        type="radio" 
                        htmlFor="nationality" 
                        name="nationality" 
                        value="Extranjera" 
                        checked={this.state.nationality ==='Extranjera'} 
                        onChange={this.changeRadioButton}/>Extranjera
                    <br/>

                    <button type="submit">Guardar</button><br/>

                    <span>{this.state.success ? this.state.message : ''}</span>

                </form>
        </div>)
    }
}

export default CreateProductPage