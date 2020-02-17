import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile.action';

const Education = ({ education, deleteEducation }) => {
  const all_education = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>{edu.fieldofstudy}</td>
      <td>
        <Moment format='DD/MMM/YYYY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? 'Now' : <Moment format='DD/MMM/YYYY'>{edu.to}</Moment>}
      </td>
      <td className='hide-sm'>{edu.description}</td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Details</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Field of Study</th>
            <th className='hide-sm'>Years</th>
            <th className='hide-sm'>Description</th>
          </tr>
        </thead>
        <tbody>{all_education}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
