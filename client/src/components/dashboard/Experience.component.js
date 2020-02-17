import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile.action';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='DD/MMM/YYYY'>{exp.from}</Moment> -{' '}
        {exp.to === null ? 'Now' : <Moment format='DD/MMM/YYYY'>{exp.to}</Moment>}
      </td>
      <td className='hide-sm'>{exp.location}</td>
      <td className='hide-sm'>{exp.description}</td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteExperience(exp._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experiece Details</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th className='hide-sm'>Location</th>
            <th className='hide-sm'>Description</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
