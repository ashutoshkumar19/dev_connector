import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile.action';
import { updateAvatar, editName } from '../../actions/auth.action';
import Spinner from '../layout/Spinner.component';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions.component';
import Experience from './Experience.component';
import Education from './Education.component';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  updateAvatar,
  editName,
  auth: { user },
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({ avatar: '', newName: '' });

  const [displayAvatarEditForm, toggleAvatarEditForm] = useState(false);

  const [displayNameEditForm, toggleNameEditForm] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { avatar, newName } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeAvatar = e => {
    e.preventDefault();
    updateAvatar(avatar);
    setFormData({ avatar: '' });
    toggleAvatarEditForm(!displayAvatarEditForm);
  };

  const changeName = e => {
    e.preventDefault();
    editName(newName);
    setFormData({ newName: '' });
    toggleNameEditForm(!displayNameEditForm);
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <div>
        <div className='user-container'>
          <div className='user-avatar-container'>
            <img className='user-avatar' src={user.avatar} alt={user && user.name} />

            <button
              className='btn btn-dark edit-avatar-btn'
              onClick={() => toggleAvatarEditForm(!displayAvatarEditForm)}
            >
              Edit
            </button>
          </div>
          <div>
            <p className='lead'>{user && user.name}</p>
          </div>
          <button
            className='btn btn-primary edit-name-btn'
            onClick={() => toggleNameEditForm(!displayNameEditForm)}
          >
            Edit
          </button>
          {displayNameEditForm && (
            <form className='name-edit-form' onSubmit={e => changeName(e)}>
              <input
                type='text'
                name='newName'
                placeholder='Enter name'
                value={newName}
                onChange={e => onChange(e)}
              />
              <button className='btn btn-success name-edit-save' type='submit'>
                Save
              </button>
            </form>
          )}
        </div>
        {displayAvatarEditForm && (
          <form className='avatar-edit-form' onSubmit={e => changeAvatar(e)}>
            <input
              type='text'
              name='avatar'
              placeholder='Enter avatar url'
              value={avatar}
              onChange={e => onChange(e)}
            />
            <button className='btn btn-success' type='submit'>
              Save
            </button>
          </form>
        )}
      </div>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  updateAvatar,
  editName
})(Dashboard);
