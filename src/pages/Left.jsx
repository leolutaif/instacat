import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Left.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import pump from "./pumpp.png";

function Left() {
    const [tokenData, setTokenData] = useState({
        tokenName: "",
        twitterLink: "",
        telegramLink: "",
        tokenCA: "",
        link: ""
    });

    const accessKey = 'A1qQaAA9kdfnn4Mmn44bpoieIYHKkdghFKUD1978563llakLLLKdfslphgarcorc3haeogmmMNn243wf';

    useEffect(() => {
        axios.get("https://interca.onrender.com/api/purchaseData", {
            headers: {
                "x-access-key": accessKey // Alteração no header para x-access-key
            }
        })
        .then(response => {
            setTokenData(response.data);
        })
        .catch(error => {
            console.error("Error to find data:", error);
        });
    }, []);

    const handleCopyCA = () => {
        navigator.clipboard.writeText(tokenData.tokenCA)
            .then(() => alert("Copied successfully!"))
            .catch(err => console.error("Error to copy:", err));
    };

    return (
        <div className="Left">
            <div className="tokenNamee">
                {tokenData.tokenName || "TokenName"}
            </div>
            <div className="links twitterLink">
                <a href={tokenData.twitterLink} target="_blank" rel="noopener noreferrer">
                    <FaXTwitter size={50} />
                    X/Twitter
                </a>
            </div>
            <div className="links telegranLink">
                <a href={tokenData.telegramLink} target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane size={50}/>
                    Telegram
                </a>
            </div>
            <div className="links pumpLink">
                <a href={tokenData.link || `https://pump.fun/${tokenData.tokenCA}`} target="_blank" rel="noopener noreferrer">
                    <img className='pumpLinkImg' src={pump} alt='PumpFun'/>
                    PumpFun
                </a>
            </div>
            <div className="links tokenCa" onClick={handleCopyCA}>
                CA: {tokenData.tokenCA || "CA not visible"}
            </div>
        </div>
    );
}

export default Left;
