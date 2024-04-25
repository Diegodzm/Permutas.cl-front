import React, { useState, useEffect } from "react";
import { getState } from "./store.js";

export const Context = React.createContext(null);

function injectContext(PassedComponent){
    const StoreWrapper = props => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) => setState({
                    store: Object.assign(state.store, updatedStore),
                    actions: { ...state.actions }
                })
            })
        )

        return <Context.Provider value={state}>
            <PassedComponent />
        </Context.Provider>
    }

    return StoreWrapper
}

export default injectContext
//HOC Higher order components