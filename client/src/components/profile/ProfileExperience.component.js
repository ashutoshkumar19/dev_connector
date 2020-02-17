import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, current, from, to, description }
}) => {
  return (
    <div>
      <h3 class='text-dark'>{company}</h3>
      <p>
        <Moment format='DD/MMM/YYYY'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='DD/MMM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {location && (
        <p>
          <strong>Location: </strong>
          {location}
        </p>
      )}
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default ProfileExperience;
