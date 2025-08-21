import React from "react";

const SECURITY_CODE = "1234";

export const UseState = ({ name }) => {
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: "",
    deleted: false,
    confirmed: false,
  });

  console.log(state.deleted);

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: true,
      confirmed: false,
    });
  }

  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  } 

  const onCheck = () => {
    setState({
      ...state,
      error: false,
      loading: true,
    });
  }

  const onWrite = (newValue) => {
    setState({
      ...state,
      error: false,
      value: newValue,
    });
  }

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  React.useEffect(() => {
    console.log("iniciando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }
      }, 2000);
    }
  }, [state.loading]);

  if (state.deleted === false && state.confirmed === false) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el codigo de seguridad </p>
        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(e) => {
            onWrite(e.target.value)
          }}
        />
        <button
          onClick={() => {
            onCheck()
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed === true && state.deleted === false) {
    return (
      <React.Fragment>
        <p>Esta seguro que quiere eliminar?</p>
        <button
          onClick={() => {
            onDelete()
          }}
        >
          si
        </button>

        <button
          onClick={() => {
            onReset()
          }}
        >
          cancelar
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito</p>
        <button
          onClick={() => {
            onReset()
          }}
        >
          Reiniciar
        </button>
      </React.Fragment>
    );
  }
};
