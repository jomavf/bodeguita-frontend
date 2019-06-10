import React, {Component} from 'react'
import Filter from '../components/Filter'
import axios from 'axios'

class ProductPage extends Component {
    constructor(){
        super()
        this.name = React.createRef()
        this.quantity = React.createRef()
        this.price = React.createRef()
        this.type = React.createRef()
        this.discount = React.createRef()
        this.state = {
            nationality:'Peruana',
            filterString: '',
            title1: 'Registrar un nuevo producto',
            title2: 'Listado de productos',
            products:[],
            types:['Embutidos','Electrodomésticos','Otros'],
            message: "Añadido exitosamente",
            success:false,
            deletedSuccessfully:false
        } 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8000/product').then(response => {
            const products = response.data.data
            this.setState({products})
        })   
    }

    deleteProduct = (id) => {
        let url = `http://localhost:8000/product/${id}`
        axios.delete(url).then((res)=>{
            console.log(res)
            return axios.get("http://localhost:8000/product")
        }).then((response)=>{
            this.setState({products:response.data.data,deletedSuccessfully:true})
        })
        setTimeout(()=>{
            this.setState({deletedSuccessfully:false})
        },1500)
    }

    render(){
        return (
            <div>
                <h1>{this.state.title2}</h1>
                <button onClick={() => this.props.history.push(`/create`)}>Nuevo</button>
                <Filter onTextChange={text => this.setState({filterString:text})}/>
                <ul>
                    {this.state.products
                        .filter(product => product.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
                        .map((product,index) =>{
                        return (
                            <li key={index}>{product.name} 
                                <button onClick={() => this.props.history.push(`/edit/${product.id}`)}>Editar</button>
                                <button onClick={()=> this.deleteProduct(product.id)}>Eliminar</button>
                            </li>
                        )
                    })}
                </ul>
                <span>{this.state.deletedSuccessfully && "Eliminado exitosamente"}</span>
            </div>
        )
    }
}

export default ProductPage