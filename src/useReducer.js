import React from "react";

const SECURITY_CODE = "1234";

const initialState = {
  error: false,
  loading: false,
  value: "",
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  check: "CHECK",
  write: "WRITE",
  delete: "DELETE",
  reset: "RESET",
};

const reducerObject = (state, payload) => ({
  [actionTypes.check]: {
    ...state,
    loading: true,
    error: false, // limpiar error previo al chequear
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false, // <- IMPORTANTE: debe ser false
    error: false,
    confirmed: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    error: false,
    loading: false,
    value: "",
  },
});

const reducer = (state, action) => {
  const map = reducerObject(state, action.payload);
  return map[action.type] || state;
};

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck  = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset  = () => dispatch({ type: actionTypes.reset });
  
  const onWrite  = ({ target: { value } }) =>
    dispatch({ type: actionTypes.write, payload: value });
  

  React.useEffect(() => {
    if (state.loading) {
      const id = setTimeout(() => {
        const value = state.value.trim(); // normalizar
        if (value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 2000);
      return () => clearTimeout(id); // limpiar timer si cambia loading
    }
  }, [state.loading]); // dependencia correcta

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad</p>
        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input
          type="text"
          placeholder="Código de seguridad"
          value={state.value ?? ""}
          onChange={onWrite}
        />
        <button onClick={onCheck} disabled={state.loading}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿Está seguro que quiere eliminar?</p>
        <button onClick={onDelete}>Sí</button>
        <button onClick={onReset}>Cancelar</button> {/* antes llamaba onDelete */}
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={onReset}>Reiniciar</button>
      </>
    );
  }
}

export { UseReducer };
