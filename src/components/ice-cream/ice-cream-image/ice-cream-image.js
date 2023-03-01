import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ iceCreamId }) =>
    iceCreamId != null && ( // != for checking both null and undefined
        <img src={require(`../../../images/ice-cream-images/ice-cream-${iceCreamId}.svg`)} alt='' />
    );

IceCreamImage.propTypes = {
    iceCreamId: PropTypes.number.isRequired,
};

export default IceCreamImage;
