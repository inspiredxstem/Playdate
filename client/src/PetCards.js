import Navbar from "./Navbar";
import Footer from "./Footer";

function PetCards({ user}) {
    return (
      <div>
        {/* <Navbar /> */}
        <div>
          <h1>Pet Cards</h1>
          <h2>{user.username}</h2>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
  
  export default PetCards;