import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner">
                <div className="circle"></div>
            </div>
            <div className="gap-patch">
                <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
                <div className="circle"></div>
            </div>
        </div>
    )
};

export default Loader;