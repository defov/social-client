import React, { useEffect, useState } from 'react';
import axios from '../../app/axios';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './profile.css';
import { useParams } from 'react-router';

const Profile = () => {
    const [user, setUser] = useState({});
    const { username } = useParams();
    const PIF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username])

    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className='profileCover'>
                            <img 
                                className="profileCoverImg" 
                                src={`${PIF}/${user.coverPicture ? user.coverPicture : '/person/noCover.png'}`} 
                                alt="" 
                            />
                            <img 
                                className="profileUserImg" 
                                src={`${PIF}/${user.profilePicture ? user.profilePicture : '/person/noAvatar.png'}`} 
                                alt="" 
                            />
                        </div>
                        <div className='profileInfo'>
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <p className='profileInfoDesc'>{user.desc}</p>
                        </div>
                    </div>
                    <div className='profileRightBottom'>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>   
    );
};

export default Profile;
