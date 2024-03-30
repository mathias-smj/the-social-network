import React from 'react';
import SignUpPage from '../Auth/SignUpPage.jsx';

const DefaultContent = () => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <img src={'src/utils/images.png'} alt="Logo X" />
      </div>
      <div>
        <SignUpPage />
      </div>
    </div>
  );
};

export default DefaultContent;
