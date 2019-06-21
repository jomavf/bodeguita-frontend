import React, { Component } from 'react'
import axios from 'axios';

class EditProductPage extends Component {
    constructor(props){
        super(props)

        this.name = React.createRef()
        this.quantity = React.createRef()
        this.price = React.createRef()
        this.type = React.createRef()
        this.discount = React.createRef()

        this.state={
            types:['Electrodomésticos','Golosinas','Otros'],
            product:{},
            nationality: '',
            isInvalidName: false,
            isInvalidQuantity: false,
            isInvalidPrice: false,
            message:''
        }
    }
    isValid = (value) => {
        if (value.trim().length === 0){
            return false
        } else {
            return true
        }
    }
    componentDidMount(){
        const url = (id) => `http://localhost:8000/product/${id}`
        fetch(url(this.props.match.params.id),{
            method: 'GET',
        }).then(response => response.json()).then(data=>{
            let product = data.data
            this.setState({product})
            console.log(data)
            this.name.current.value = product.name
            this.quantity.current.value = product.quantity
            this.price.current.value = product.price
            this.type.current.value = product.type
            this.discount.current.checked = product.discount
            this.setState({
                nationality:product.nationality,
            })
        })
    }

    onChangeRadioButton = (event) => {
        let nationality = event.target.value
        this.setState({nationality})
    }

    onFormSubmit = async (event) => {
        event.preventDefault()
        let name = this.name.current.value
        let quantity = this.quantity.current.value
        let price = this.price.current.value
        let type = this.type.current.value
        let discount = this.discount.current.checked
        let nationality = this.state.nationality

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
        let product = { name, quantity, price, type, discount, nationality }
        console.log(product)
        const url = (id) => `http://localhost:8000/product/${id}`
        const id = this.props.match.params.id
        await axios.patch(url(id), product)
        this.setState({message:"Se actualizó de manera correcta el Producto"})
        setTimeout(()=>{
            this.setState({message:""})
        },2000)
        // this.props.history.push('/products')
    }

    render(){
        return (
            <div>
                <h1>Editar producto</h1><hr/>
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidName ? "Rellenar el campo nombre correctamente" : ""}</span>
                    <input htmlFor="name" name="name" ref={this.name}/><br/>

                    <label htmlFor="quantity">Cantidad</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidQuantity ? "Rellenar el campo cantidad correctamente" : ""}</span>
                    <input htmlFor="quantity" name="quantity" ref={this.quantity}/><br/>

                    <label htmlFor="price">Precio</label>
                    <span style={{"color":"red"}}>{this.state.isInvalidPrice ? "Rellenar el campo precio correctamente" : ""}</span>
                    <input htmlFor="price" name="price" ref={this.price}/><br/>

                    <label htmlFor="type">Tipo</label>
                    <select ref={this.type}>
                        {this.state.types.map((type,index)=><option key={index}>{type}</option>) }
                    </select>
                    <br/>

                    <label htmlFor="discount">Descuento</label>
                    <input type="checkbox" htmlFor="discount" name="discount" ref={this.discount}/><br/>

                    <label htmlFor="nationality">Nacionalidad</label>
                    <input 
                        type="radio" 
                        htmlFor="nationality" 
                        name="nationality" 
                        value="Peruana" 
                        checked={this.state.nationality === 'Peruana'} 
                        onChange={this.onChangeRadioButton}/>Peruana
                    <input 
                        type="radio" 
                        htmlFor="nationality" 
                        name="nationality" 
                        value="Extranjera" 
                        checked={this.state.nationality === 'Extranjera'}
                        onChange={this.onChangeRadioButton}/>Extranjera
                    <br/>

                    <button type="submit">Actualizar y guardar</button>
                    <span>{this.state.message}</span>
                </form>
            </div>
        )
    }
}

export default EditProductPage