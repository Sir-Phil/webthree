import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ imgUrl, style, active, name, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${active && active === name && 'bg-[#2c2f32]'}
    flex justify-center items-center ${!disabled && 'cursor-pointer'} ${style}`}
        onClick={handleClick}>
        {!active ? (
            <img src={imgUrl} alt="found_logo"
                className="w-1/2 h-1/2" />
        ) : (
            <img src={imgUrl} alt="found_logo"
                className={`w-1/2 h-1/2 ${active !== name && 'grayscale'}`} />
        )}
    </div>
)

const SideBar = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState('dashboard');


    return (
        <div className="flex-1 flex flex-col justify-between items-center flex-col sticky top-5 h-[93vh]">
            <Link to="/">
                <Icon style="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
            </Link>

            <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[78px] py-4 mt-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            active={active}
                            handleClick={() => {
                                if (!link.disabled) {
                                    setActive(link.name);
                                    navigate(link.link);
                                }
                            }}
                        />
                    ))}
                </div>
                <Icon style="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
            </div>
        </div>
    )
}

export default SideBar