import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ()=>{

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }else{
      navigate("/login");
    }
  },[navigate]);

  const handleLogout = ()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }

  if(!user){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">
          Welcome {user.name}
        </h2>
        <p className="text-gray-600">
          {user.email}
        </p>
         <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
