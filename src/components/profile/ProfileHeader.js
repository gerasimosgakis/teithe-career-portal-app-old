import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";
import banner from "../../banner.jpg";
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile-header">
        <div className="profile-header__banner">
          <img src={banner} alt="" className="profile-header__banner-pic" />
        </div>
        <div className="profile-header__logo">
          <img
            className="rounded-circle profile-header__logo-pic"
            src={profile[0].avatar}
            alt="logo image"
          />
        </div>
        <div className="contain">
          <div className="profile-header__heading">
            <h2>{profile[0].name}</h2>
            <p className="lead-text">
              {profile[0].status}{" "}
              {isEmpty(profile[0].company) ? null : (
                <span>at {profile[0].company}</span>
              )}
            </p>
            {isEmpty(profile[0].location) ? null : (
              <p className="help-text">{profile[0].location}</p>
            )}
            <p>
              {isEmpty(profile[0].website) ? null : (
                <a
                  className="pr2"
                  href={profile[0].website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
              )}
              {isEmpty(profile[0].twitter) ? null : (
                <a
                  className="pr2"
                  href={profile[0].twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
              )}
              {isEmpty(profile[0].facebook) ? null : (
                <a
                  className="pr2"
                  href={profile[0].facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
              )}
              {isEmpty(profile[0].linkedin) ? null : (
                <a
                  className="pr2"
                  href={profile[0].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              )}
              {isEmpty(profile[0].instagram) ? null : (
                <a
                  className="pr2"
                  href={profile[0].instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              )}
              {isEmpty(profile[0].youtube) ? null : (
                <a
                  className="pr2"
                  href={profile[0].youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              )}
            </p>
          </div>
          <hr />
        </div>
      </div>
      // <div className="row">
      //   <div className="col-md-12">
      //     <div className="card card-body bg-info text-white mb-3">
      //       <div className="row">
      //         <div className="col-4 col-md-3 m-auto">
      //           <img
      //             className="rounded-circle"
      //             src={profile[0].avatar}
      //             alt=""
      //           />
      //         </div>
      //       </div>
      //       <div className="text-center" style={{ marginTop: "100px" }}>
      //         <h1 className="display-4 text-center">{profile[0].handle}</h1>
      //         <p className="lead text-center">
      //           {profile[0].status}{" "}
      //           {isEmpty(profile[0].company) ? null : (
      //             <span>at {profile[0].company}</span>
      //           )}
      //         </p>
      //         {isEmpty(profile[0].location) ? null : (
      //           <p>{profile[0].location}</p>
      //         )}
      // <p>
      //   {isEmpty(profile[0].website) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].website}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fas fa-globe fa-2x" />
      //     </a>
      //   )}
      //   {isEmpty(profile[0].twitter) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].twitter}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fab fa-twitter fa-2x" />
      //     </a>
      //   )}
      //   {isEmpty(profile[0].facebook) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].facebook}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fab fa-facebook fa-2x" />
      //     </a>
      //   )}
      //   {isEmpty(profile[0].linkedin) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].linkedin}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fab fa-linkedin fa-2x" />
      //     </a>
      //   )}
      //   {isEmpty(profile[0].instagram) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].instagram}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fab fa-instagram fa-2x" />
      //     </a>
      //   )}
      //   {isEmpty(profile[0].youtube) ? null : (
      //     <a
      //       className="text-white p-2"
      //       href={profile[0].youtube}
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       <i className="fab fa-youtube fa-2x" />
      //     </a>
      //   )}
      // </p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default ProfileHeader;
