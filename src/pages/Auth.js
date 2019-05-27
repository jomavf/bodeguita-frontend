import React, {Component} from 'react'

import "./Auth.css"

class AuthPage extends Component {
    constructor(props){
        super(props)
        this.codeEl = React.createRef()
        this.passwordEl = React.createRef()
    }

    submitHandler = (event) => {
        event.preventDefault()
        const code = this.codeEl.current.value
        const password = this.passwordEl.current.value

        if(code.trim().length === 0 || password.trim().length === 0){
            return 
        }

        console.log(code,password)
        // ... request to the backend
    }

    render(){
        return <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="code">Codigo</label>
                <input type="text" id="code" ref={this.codeEl}></input>
            </div>
            <div className="form-control">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" ref={this.passwordEl}></input>
            </div>
            <div className="form-actions">
                <button type="submit">Ingresar</button>
            </div>
        </form>
    }
}

export default AuthPage