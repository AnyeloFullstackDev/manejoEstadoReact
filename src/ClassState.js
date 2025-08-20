import React from "react";
import { Loading } from "./loading";

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      loading: true
    };
  }
/*   UNSAFE_componentWillMount() {
      console.log("componentWillMount");
    }

  componentDidMount(){
    console.log("componentDidMount");
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");
  } */

    componentDidUpdate(){
    console.log("componentDidUpdate");
    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        this.setState({ loading: false });
        console.log("Terminando la validacion")
      }, 2000);
    }
    }
  render() {
    
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el codigo de seguridad </p>
        {this.state.error && <p>Error: el codigo es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input type="text" placeholder="Codigo de seguridad" />
        <button onClick={() => this.setState({ loading: !this.state.loading })}>Comprobar</button>
      </div>
    );
  }
}

export { ClassState };
