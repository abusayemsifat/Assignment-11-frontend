import React from 'react';

const Donate = () => {
    return (
        <div>
            <form action="" className='flex justify-center items-center min-h-screen gap-4'>
                <input type="text" placeholder="Type here" className="input" />
                <button className='btn btn-primary' type='submit'>Donate</button>
            </form>
        </div>
    );
};

export default Donate;