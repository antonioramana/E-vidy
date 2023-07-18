import Footer from "../Layouts/Footer";
import NavBar from "../Layouts/NavBar";

function Page404() {
  return (
    <div className="">
      <NavBar />    
      <div className="container mt-5  text-center text-bg-danger rounded-3 rounded m-4 p-4">
          <div className="display-3 ">Page non trouvé </div>
          <div className="text-muted display-5">... 404 not found ...</div>
      </div>
      <Footer />
    </div>
  );
}

export default Page404;
