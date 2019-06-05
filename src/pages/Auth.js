import React, {Component} from 'react'
import axios from 'axios'
import AuthContext from '../context/auth-context'

import "./Auth.css"

class AuthPage extends Component {
    constructor(props){
        super(props)
        this.codeEl = React.createRef()
        this.passwordEl = React.createRef()
        this.state = {
            message: "",
            success:false
        }
    }

    static contextType = AuthContext

    submitHandler = (event) => {
        event.preventDefault()
        const code = this.codeEl.current.value
        const password = this.passwordEl.current.value

        if(code.trim().length === 0 || password.trim().length === 0){
             return this.setState({
                 message:"Ingrese datos válidos"
             })
        }
        axios.get('http://localhost:8000/user').then((response)=>{
            let data = response.data.data
            data.forEach(user => {
                if(code === user.code && password === user.password){
                    this.setState({success:true})
                    let token = 'easyHacking'
                    this.context.login(token)
                    this.props.history.push("/home")
                }
            })
            if(!this.state.success){
                this.setState({message:"Datos inválidos"})
            }
        })
    }

    render(){
        return <form className="auth-form" onSubmit={(event) => this.submitHandler(event)}>
            <div className="form-control">
                <label htmlFor="code">Codigo</label>
                <input type="text" id="code" ref={this.codeEl}></input>
            </div>
            <div className="form-control">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" ref={this.passwordEl}></input>
            </div>
            <div className="form-actions">
                <button id="save" type="submit">Ingresar</button>
            </div>
            <span>{this.state.message}</span>
        </form>
    }
}

export default AuthPage