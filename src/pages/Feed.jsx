import React, { useState, useEffect } from 'react';
import logo from "../CATSUPREMO.jpg";
import "./Feed.css";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from 'axios';
import f1 from "./gatos/1.webp";
import f2 from "./gatos/2.webp";
import f3 from "./gatos/3.webp";
import f4 from "./gatos/4.webp";
import f5 from "./gatos/5.webp";
import f6 from "./gatos/6.webp";
import f7 from "./gatos/7.webp";

function Feed() {
    const [likedPosts, setLikedPosts] = useState({});
    const [tokenData, setTokenData] = useState({ tokenName: "" });
    const [selectedStory, setSelectedStory] = useState(null); // Estado para controlar o story selecionado

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

    const postsData = [
        { id: 1, tokenName: `${tokenData.tokenName}`, ticker: `@${tokenData.tokenName}`, image: logo },
        { id: 2, tokenName: "Whiskers", ticker: "@whiskerspurrfect", image: f1 },
        { id: 3, tokenName: "Luna", ticker: "@lunakittyvibes", image: f2 },
        { id: 4, tokenName: "Smokey", ticker: "@smokeythepurr", image: f3 },
        { id: 5, tokenName: "Shadow", ticker: "@shadowwhiskers", image: f4 },
        { id: 6, tokenName: "Tigger", ticker: "@tigertailadventures", image: f5 },
        { id: 7, tokenName: "Peanut", ticker: "@peanutthefeline", image: f6 },
        { id: 8, tokenName: "Muffin", ticker: "@muffinpaws", image: f7 },       
    ];

    const toggleLike = (postId) => {
        setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: !prevLikedPosts[postId],
        }));
    };

    const handleDoubleClick = (postId) => {
        toggleLike(postId);
    };

    return (
        <div className="Feed">
            <div className="Stories">
                {postsData.map((post) => (
                    <div key={post.id} className='icon-stories' onClick={() => setSelectedStory(post)}>
                        <img src={post.image} alt={post.tokenName} />
                        <div>{post.tokenName}</div>
                    </div>
                ))}
            </div>
            
            <div className="posts">
                {postsData.map((post) => (
                    <div key={post.id} className="Post" onDoubleClick={() => handleDoubleClick(post.id)}>
                        <div className="profile-mini">
                            <img src={post.image} alt={post.tokenName} />
                            <div className="env-names">
                                <div className='tokenName'>{post.tokenName} <div className="time"> • Now</div></div>
                                <div className='ticker'>{post.ticker}</div>
                            </div>
                        </div>
                        <div className="picture">
                            <img src={post.image} alt={post.tokenName} />
                        </div>
                        <div className="like">
                            <div onClick={() => toggleLike(post.id)} style={{ cursor: 'pointer' }}>
                                {likedPosts[post.id] ? <FaHeart color='#ff0000' size={30} /> : <FaRegHeart color='#fff' size={30} />}
                            </div>
                            <div><FaRegComment color='#fff' size={30} /></div>
                            <div><FiSend color='#fff' size={30} /></div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedStory && (
                <div className="story-viewer" onClick={() => setSelectedStory(null)}>
                    <img src={selectedStory.image} alt={selectedStory.tokenName} />
                    <div className="story-name">{selectedStory.tokenName}</div>
                </div>
            )}
        </div>
    );
}

export default Feed;
