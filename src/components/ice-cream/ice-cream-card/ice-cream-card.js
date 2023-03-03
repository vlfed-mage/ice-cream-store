import React from 'react';
import IceCreamImage from '../ice-cream-image';
import FocusLink from '../../structure/focus-link';
import { useNavigate } from 'react-router-dom';

const IceCreamCard = ({ children, to, search, iceCreamId, headingName }) => {
    const navigate = useNavigate();

    const onItemClickHandler = () => {
        navigate(to, { state: { focus: true } });
    };

    const onLinkClickHandler = e => {
        e.stopPropagation();
    };

    return (
        <section className='card' onClick={onItemClickHandler}>
            <div className='card-image-container'>
                <IceCreamImage iceCreamId={iceCreamId} />
            </div>
            <div className='card-info'>
                <h3>
                    <FocusLink onClick={onLinkClickHandler} to={to} search={search}>
                        {headingName}
                    </FocusLink>
                </h3>
                {children}
            </div>
        </section>
    );
};

export default IceCreamCard;
