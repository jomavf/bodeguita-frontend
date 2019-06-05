import React, { Component } from 'react'
import './index.css'

class Filter extends Component {
    constructor(props){
        super(props)
        this.filterString = React.createRef()
    }

    render(){
        return (
            <div><input placeholder="Buscar" type="text" onKeyUp={(event)=>this.props.onTextChange(event.target.value)}/></div>
        )
    }
}

export default Filter