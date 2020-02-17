import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, from, to, description }
}) => {
  return (
    <div>
      <h3 class='text-dark'>{school}</h3>
      <p>
        <Moment format='DD/MMM/YYYY'>{from}</Moment> -{' '}
        {!to ? 'Now' : <Moment format='DD/MMM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default ProfileEducation;
