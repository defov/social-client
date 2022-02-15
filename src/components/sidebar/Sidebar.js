import React, { useState, useContext, useEffect } from 'react';
import './sidebar.css'
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School
} from '@material-ui/icons';
import axios from '../../app/axios';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('/users/all');
                setFriends(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        if(user) {
            fetchAllUsers();
        }
    }, [user])

    
    const CloseFriend = ({ user }) => (
        <li>
            <Link to={`/profile/${user.username}`} className='sidebarFriend'>
                <img className='sidebarFriendImg' src={`${PF}/${user.profilePicture ? user.profilePicture : '/person/noAvatar.png'}`} alt="" />
                <span className='sidebarFriendName'>{user.username}</span>
            </Link>
        </li>
    )

    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        <RssFeed className='sidebarIcon' />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Chat className='sidebarIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li className='sidebarListItem'>
                        <PlayCircleFilledOutlined className='sidebarIcon' />
                        <span className='sidebarListItemText'>Videos</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Group className='sidebarIcon' />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Bookmark className='sidebarIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                    <li className='sidebarListItem'>
                        <HelpOutline className='sidebarIcon' />
                        <span className='sidebarListItemText'>Questions</span>
                    </li>
                    <li className='sidebarListItem'>
                        <WorkOutline className='sidebarIcon' />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className='sidebarListItem'>
                        <Event className='sidebarIcon' />
                        <span className='sidebarListItemText'>Events</span>
                    </li>
                    <li className='sidebarListItem'>
                        <School className='sidebarIcon' />
                        <span className='sidebarListItemText'>Courses</span>
                    </li>
                </ul>
                <button className='sidebarButton'>Show more</button>
                <hr className='sidebarHr' />
                <h3 className='sidebarTitle'>All users:</h3>
                <ul className='sidebarFriendList'>
                    {friends.map((u) => (
                        <CloseFriend key={u._id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;
