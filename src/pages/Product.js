import React, {Component} from 'react'
import Filter from '../components/Filter'
import axios from 'axios'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'

class ProductPage extends Component {
    constructor(){
        super()
        this.name = React.createRef()
        this.quantity = React.createRef()
        this.price = React.createRef()
        this.type = React.createRef()
        this.discount = React.createRef()
        this.toDeleteRef = React.createRef()
        this.state = {
            nationality:'Peruana',
            filterString: '',
            title1: 'Registrar un nuevo producto',
            title2: 'Listado de productos',
            products:[],
            types:['Embutidos','Electrodomésticos','Otros'],
            message: "Añadido exitosamente",
            success:false,
            deletedSuccessfully:false,
            toDelete: [],
            messageDelete: "Eliminado exitosamente",
            isChecked:false,
            modal:false,
        } 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8000/product').then(response => {
            const products = response.data.data
            this.setState({products})
        })   
    }

    deleteProduct = async (id) => {
        let url = `http://localhost:8000/product/${id}`
        await axios.delete(url)
        // let response = await axios.get("http://localhost:8000/product")
        // this.setState({products:response.data.data,deletedSuccessfully:true})
    }

    inputOnChange = (e,id) => {
        if(e.target.checked){
            let toDelete = [...this.state.toDelete]
            toDelete.push(id)
            this.setState({
                toDelete
            })
        } else {
            let toDelete = [...this.state.toDelete]
            let i = toDelete.indexOf(id)
            toDelete.splice(i,1)
            this.setState({
                toDelete
            })
        }
    }

    deleteFromTable = async () => {
        if(this.state.toDelete.length === 0){
            this.setState({
                modal:false,
                deletedSuccessfully:true,
                messageDelete: "Seleccione un producto porfavor"
            })
            // setInterval(()=>{
            //     this.setState({
            //         deletedSuccessfully:false,
            //     })  
            // },2000)
            return
        } else {
            try {
                await Promise.all(this.state.toDelete.map(e => this.deleteProduct(e)))
                let response = await axios.get("http://localhost:8000/product")
                this.setState({products:response.data.data,modal:false})
            } finally {
                this.setState({
                    deletedSuccessfully:true,
                    messageDelete: "Se eliminó de manera correcta el Producto",
                    toDelete: []
                })
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                {!this.state.modal ? (<div>
                    <h1>{this.state.title2}</h1>
                    <button onClick={() => this.props.history.push(`/create`)}>Nuevo</button>
                    <Filter onTextChange={text => this.setState({filterString:text})}/>
                    <ul>
                        {this.state.products
                            .filter(product => product.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
                            .map((product,index) =>{
                            return (
                                    <li key={index}>
                                        <input  type="checkbox" onChange={(e) => this.inputOnChange(e,product.id)}/>
                                    {product.name} 
                                        <button onClick={() => this.props.history.push(`/edit/${product.id}`)}>Editar</button>
                                    </li>
                            )
                        })}                    
                    </ul>
                    <button onClick={ () => this.setState({modal:true}) }>Eliminar</button><br/>
                    <span>{this.state.deletedSuccessfully && this.state.messageDelete}</span>
                </div>) : (<div><Backdrop/><Modal title="Alerta" onConfirm={()=> this.deleteFromTable()} onCancel={() => this.setState({modal:false,messageDelete:"Operación cancelada",deletedSuccessfully:true})}><p>Desea eliminar lo seleccionado?</p></Modal></div>)}
            </React.Fragment>
        )
    }
}

export default ProductPage