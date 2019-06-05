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
            types:['Embutidos','Electrodomésticos','Otros'],
            product:{},
            nationality: ''
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

    onFormSubmit = (event) => {
        event.preventDefault()
        let name = this.name.current.value
        let quantity = this.quantity.current.value
        let price = this.price.current.value
        let type = this.type.current.value
        let discount = this.discount.current.checked
        let nationality = this.state.nationality
        let product = { name, quantity, price, type, discount, nationality }
        console.log(product)
        const url = (id) => `http://localhost:8000/product/${id}`
        const id = this.props.match.params.id
        axios.patch(url(id), product).then(() => this.props.history.push('/products'))
    }

    render(){
        return (
            <div>
                <h1>Editar producto</h1><hr/>
                <form onSubmit={this.onFormSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input htmlFor="name" name="name" ref={this.name}/><br/>

                    <label htmlFor="quantity">Cantidad</label>
                    <input htmlFor="quantity" name="quantity" ref={this.quantity}/><br/>

                    <label htmlFor="price">Precio</label>
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
                </form>
            </div>
        )
    }
}

export default EditProductPage