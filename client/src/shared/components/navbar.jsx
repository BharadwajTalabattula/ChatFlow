
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <>
      <div >
        <nav className="navbar bg-white border " >
          <div className="container-fluid px-4">
            <Link to="/" className="navbar-brand  d-flex align-items-center">
              <span className="fs-4">Chat Flow</span>
            </Link>
            {/* <div className='ellipsis px-2 rounded-3'  ><i class="fa-solid fs-3 fa-ellipsis"></i></div> */}
          </div>
        </nav>
      </div>
    </>
    )
}