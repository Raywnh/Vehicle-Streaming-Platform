import React from 'react';
import "./profile.css";

// A functional component that renders a profile card with name and designation
const Sidebar = (prop)  => {
    return (
        <div className="ProfileCard" style={{
            backgroundColor: "#29282E"
        }}>
            {/* Name and Designation */}
            <div className="CardDescription">
                {prop.name}
                <div style={{
                    fontSize: "12px",
                }}> 
                    Developer
                </div>
            </div>
            {/* Profile Image */}
            <div className="CardProfile">
                Test
            </div>
        </div>
    );
};
export default Sidebar;
