import React from "react";

const SECURITY_CODE = "1234";

export const UseState = ({ name }) => {
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: "",
  });
  console.log(state);

  React.useEffect(() => {
    console.log("iniciando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({
            ...state,
            loading: false,
            error: true,
          });
        }else{
          setState({
            ...state,
            loading: false,
            error: false,
          });
        }

       
      }, 2000);
    }
  }, [state.loading]);
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
          }) ;
        }}
      >
        Comprobar
      </button>
    </div>
  );
};
