import React from 'react';

const ServiceIcon = (props) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v2H4zM4 10h16v2H4zM4 16h16v2H4zM4 20h16v2H4z" />
            <circle cx="12" cy="6" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="18" r="1" />
        </svg>
    );
}

export default ServiceIcon;