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

  React.useEffect(() => {
    console.log("iniciando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({
            ...state,
            loading: false,
            error: true,
            confirmed: false,
          });
        } else {
          setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
          });
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
            setState({
              ...state,
              error: false,
              value: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            // setError(false);
            setState({
              ...state,
              error: false,
              loading: true,
            });
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
            setState({
              ...state,
              deleted: true,
            });
          }}
        >
          si
        </button>

        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
            });
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
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: "",
            });
          }}
        >
          Reiniciar
        </button>
      </React.Fragment>
    );
  }
};
