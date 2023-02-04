import { Link } from "react-router-dom";

export const ExploreTopBooks = () =>{
    return(
        <div className='p-5 mb-4 bg-darr header'>
            <div className="container-fluid py-5 text-white 
                d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Find you next adventure</h1>
                    <p className='col-md-8 fs-4'>Where woudl you like to go next?</p>
                    <Link type='button' className="btn main-color btn-lg text-white" to='/search'>Exoplore top books</Link>
                </div>
            </div>
        </div>
    );
}