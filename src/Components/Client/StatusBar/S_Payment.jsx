import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

function S_Payment() {
  return (
    <div>
        <div className="d-flex">
            <h4 style={{ color: "blue" }}>Account</h4>
            <div className="mx-2 d-flex align-items-center">
                <FontAwesomeIcon
                    style={{
                        color: "blue",
                        backgroundColor: "blue",
                        borderRadius: "50%",
                    }}
                    icon={faCircle}
                />
                <div
                    style={{
                        height: "3px",
                        width: "150px",
                        background: "blue",
                    }}
                ></div>
            </div>
            <h4 style={{ color: "blue" }}>Address</h4>
            <div className="mx-2 d-flex align-items-center">
                <FontAwesomeIcon
                    style={{
                        color: "blue",
                        borderRadius: "50%",
                        backgroundColor: "blue"
                    }}
                    icon={faCircle}
                />
                <div
                    style={{
                        height: "3px",
                        width: "150px",
                        backgroundColor: "blue",
                    }}
                ></div> 
                <FontAwesomeIcon
                    style={{ color: "blue" }}
                    icon={faCircle}
                />
            </div>
            <h4 style={{ color: "blue" }}>Payment</h4>
        </div>
    </div>
  )
}

export default S_Payment