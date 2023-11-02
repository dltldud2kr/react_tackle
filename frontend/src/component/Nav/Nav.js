import { Link, useLocation } from 'react-router-dom';
import React, {useState, useContext, useEffect, useRef} from 'react';
import './Nav.css';
// import LottieAnimation from '../Lottie/Lottie';
import AuthContext from '../AuthContext/AuthContext';
import Hamburger from '../Hambuger/Hamburger';  // 햄버거 메뉴 추가


function Boardlist() {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인 
    return ( 
    <div className='boardlist'>
    <div className='search'>
    <input type='text' placeholder='검색어를 입력하세요' />
        </div>
    <div className="nav">
        {/* 각 Link 컴포넌트에 대해 현재 위치와 매칭되면 borderBottom 스타일 적용 */}
                <Link 
                    className="NavMenu" 
                    to="/Hotboard"
                    style={{ borderBottom: location.pathname === "/Hotboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                >
                    <b>HOT 게시판</b>
                </Link>
                <Link 
                    className="NavMenu" 
                    to="/VSboard"
                    style={{ borderBottom: location.pathname === "/VSboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                >
                    <b>찬반 게시판</b>
                </Link>
                <Link 
                    className="NavMenu" 
                    to="/participationboard"
                    style={{ borderBottom: location.pathname === "/participationboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                 >
                     <b>참여 게시판</b>
                 </Link>   
    </div>
</div>
)}

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState(0); // key state 추가
    const node = useRef(); // ref 생성
    
    const { isLoggedIn, nickname, profileImage } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setKey(prevKey => prevKey + 1); // 메뉴가 토글될 때마다 key 값 증가
    } 

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click 
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인
    return (
        <div>
        <div className="nav_bar">
            {/* <LottieAnimation /> Lottie 사용 X*/}
            <Link className="MainIcon" to="/">
                <img src="/img/Logo.png" alt="메인 아이콘" className='Logo' />
                <img src="/img/Main.png" alt="메인 아이콘" className='Main_text' />
            </Link>
                {/* 햄버거 메뉴 추가 */}        
                <div ref={node} className="hamburger_menu" style={{ right: isOpen ? '0%' : '8%', top: isOpen ? '0%' : '23%',
                                                             width: isOpen ? '200px' : '', height: isOpen ? '100vh' : ''}}
                                                            key={key}>
                    <Hamburger isOpen={isOpen} toggle={toggleMenu} />
                    { isOpen && (
                        <ul>
                            {isLoggedIn ? (
                                 <>
                                    <li className = "profile">
                                    <img src={profileImage} alt="프로필 사진" /> {/* 프로필 이미지 추가 */}
                                    <span>{nickname}</span> {/* 닉네임 추가 */}
                                    </li>
                                    <li><Link to="/logout" onClick={() => setIsOpen(false)}>로그아웃</Link></li>

                                
                            </>
                        ) : (
                        <li><Link to="/login" onClick={() => setIsOpen(false)}>로그인</Link></li>
                        )}
                            <li><Link to="/mypage" onClick={() => setIsOpen(false)}>마이페이지</Link></li>
                            <li><Link to="/support" onClick={() => setIsOpen(false)}>고객센터</Link></li>
                            <li><Link to="/category" onClick={() => setIsOpen(false)}>카테고리</Link></li>
                            {isLoggedIn ? <li className='nav_user'>로그인 상태입니다.</li> : <li className='nav_user'>로그아웃 상태입니다.</li>}

                    </ul>     
                    )}
                </div>
        </div>



    </div>
    );
}

export {Boardlist};
export default Nav;