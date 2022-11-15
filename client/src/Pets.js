import Navbar from "./Navbar";
import Footer from "./Footer";
import PetCards from "./PetCards";

function Pets({ users }) {
  const petsDisplay = users.map((user) => (
    <PetCards key={user.id} user={user} />
  ));

  console.log(petsDisplay);

  return (
    <div>
      <Navbar />
      <div className="pet-feed">{petsDisplay}</div>
      <Footer />
    </div>
  );
}

export default Pets;
