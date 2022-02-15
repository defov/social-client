import React, { useContext } from 'react';
import './topbar.css';
import {
    Search,
    Person,
    Chat,
    Notifications
} from '@material-ui/icons'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Topbar = () => {

    const { user } = useContext(AuthContext);
    const PIF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to='/' replace className='logo'>Social App</Link>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <Search className='searchIcon' />
                    <input
                        className='searchInput'
                        placeholder='Search for friends, posts or videos'
                    />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>Timeline</span>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <Link to='/messanger' replace className='topbarIconItem'>
                        <Chat />
                        <span className='topbarIconBadge'>2</span>
                    </Link>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.username}`} replace>
                    <img src={user?.profilePicture || `${PIF}/person/noAvatar.png`} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
