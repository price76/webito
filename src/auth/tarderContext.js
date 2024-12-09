import { createContext, useContext, useState } from "react";

export const traderContext = createContext({
    getTraderData: () => { },
    setTraderData: () => { },
    isLogin: () => { },
    logOut: () => { },
});

export function TraderProvider({ children }) {

    function getTraderData() {
        return JSON.parse(localStorage.getItem('staff'));
    }

    function setTraderData(staffObj) {
        localStorage.setItem('trader', JSON.stringify(staffObj));
    }
    function isLogin() {
        const trader = getTraderData();
        if (trader.token == null) {
            return false
        }
        else {
            return true
        }
    }

    function logOut() {
        localStorage.clear();
    }

    const [user, setUser] = useState(() => {
        return localStorage.getItem('staff') ? true : false;
      });
    const contectValue = {
        user,

        getTraderData,
        setTraderData,
        isLogin,
        logOut,
    }

    return (
        <traderContext.Provider value={contectValue}>
            {children}
        </traderContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(traderContext);
};