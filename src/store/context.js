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
        );

        const actions = {

            exchangeProducts: (selectedProduct, userProductForPermuta) => {
                const updatedUserProductOfferList = state.store.UserProductOfferList.filter(product => product !== selectedProduct);
                const updatedUserProductForPermuta = [...state.store.UserProductForPermuta, selectedProduct];
                actions.updateUserProductLists(updatedUserProductOfferList, updatedUserProductForPermuta);
            },

            updateUserProductLists: (updatedUserProductOfferList, updatedUserProductForPermuta) => {
                setState({
                    store: {
                        ...state.store,
                        UserProductOfferList: updatedUserProductOfferList,
                        UserProductForPermuta: updatedUserProductForPermuta
                    },
                    actions: { ...state.actions }
                });
            }
        };

        const combinedState = {
            ...state,
            actions: {
                ...state.actions,
                ...actions
            }
        };

        return (
            <Context.Provider value={combinedState}>
                <PassedComponent />
            </Context.Provider>
        );
    };

    return StoreWrapper;
}

export default injectContext;
