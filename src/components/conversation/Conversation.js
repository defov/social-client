import React, { useEffect, useState } from 'react';
import axios from '../../app/axios';
import './conversation.css';

const Conversation = ({ conversation, currentUser }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id)

        const getUser = async () => {
            try {
                const response = await axios.get(`/users?userId=${friendId}`);
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [])

    return (
        <div className='conversation'>
            <img 
                className='conversationImg'
                src={`${PF}/${ user?.profilePicture ? user.profilePicture : 'person/noAvatar.png'}`}
                alt=""
            />
            <span className='conversationName'>
                {user?.username}
            </span>
        </div>
    );
};

export default Conversation;
