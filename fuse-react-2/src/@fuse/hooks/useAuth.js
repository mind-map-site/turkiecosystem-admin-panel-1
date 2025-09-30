import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token); // true if token exists, false otherwise
    }
  }, []);

  return isAuthenticated;
};

export default useAuth;
