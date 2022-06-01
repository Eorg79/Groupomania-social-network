import React from 'react';

const Logout = ( /*{setAuthstate}*/ ) => {
   
    /*const LogoutclickHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        setAuthstate('notlogged');
        //window.location = '/auth';
    }*/
    return (
        <button aria-label='se deconnecter' className='logout'>
                se deconnecter
        </button>
    )
};

export default Logout;