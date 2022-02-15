import axios from "../../app/axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ currentUserId, onlineUsers, setCurrentChat }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    
    useEffect(() => {
        const getFriends = async () => {
            try {
                const response = await axios.get(`/users/friends/${currentUserId}`);
                setFriends(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        getFriends();
    }, [currentUserId])

    useEffect(() => {
        console.log(onlineFriends)
        setOnlineFriends(
            friends.filter(f => onlineUsers.includes(f._id))
        )
    }, [friends, onlineUsers])

    const handleClick = async (user) => {
        try {
            const response = await axios.get(`/conversations/find/${currentUserId}/${user._id}`)
            setCurrentChat(response.data);
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className="chatOnline">
            {onlineFriends.map(onlineFriend => (
            <div className="chatOnlineFriend" onClick={() => handleClick(onlineFriend)}>
                <div className="chatOnlineImgContainer">
                    <img 
                        className="chatOnlineImg" 
                        src={`${PF}/${ onlineFriend?.profilePicture ? onlineFriend.profilePicture : 'person/noAvatar.png' }`} 
                        alt=""
                    />
                    <div className="chatOnlineBadge" />
                </div>
                <span className="chatOnlineName">{onlineFriend?.username}</span>
            </div>
            ))}
        </div>
    );
};

export default ChatOnline;
