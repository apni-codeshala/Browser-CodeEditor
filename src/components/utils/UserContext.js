import { createContext, useState } from "react";

const UserContext = createContext({
    user: {
        email: "",
        id: 0
    },
    setUser: () => {}
});

export function MyProvider({children}) {
    
    const [user, setUser] = useState({
      email: "",
      id: 0
    });
  
    return (
      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>
    );
  }

export default UserContext;