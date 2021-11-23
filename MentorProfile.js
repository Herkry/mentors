import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import "./mentorprofile.css"

class MentorProfile extends Component {
  constructor () {
    super();
    this.state = {
      ment_fname:"",
      ment_lname:"",
      ment_email:"",
      ment_phone:"",
      ment_category:"",
      ment_resume_summary:"",
      ment_id:""
    }
  }

  componentDidMount () {
    // check if user is logged, if not, redirect to Login Page
    if(ReactSession.get("logged_in_status") == "true"){
       // do nothing
    }
    else{
      // redirect to login page
      this.props.history.push("/");
    }

    // make request to get user profile info
    axios.get(`http://mentors/api/mentor/${ReactSession.get("mem_id")}/profile`).then(response => {
      // test
      console.log(response);

      let mentProfileInfo = response.data
      mentProfileInfo.map((mentor) => {
        this.setState({
          ment_fname:mentor.ment_fname,
          ment_lname:mentor.ment_lname,
          ment_email: mentor.ment_email,
          ment_phone:mentor.ment_phone,
          ment_category:mentor.ment_category,
          ment_resune_summary:mentor.ment_resume_summary,
          ment_id:mentor.ment_id
       });
      });
    });

    // binding 
    // this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  // handleFieldChange(event){
  //   this.setState({
  //       [event.target.name]: event.target.value
  //   });

  // }

  // onClickEditProfile(event){
  //   // show modal
  //   $("#edit-profile-modal").modal("show");
  // }

  // onFormSubmitEditProfile(event){
  //   event.preventDefault();

  //   // make request to update user profile info
  //   let updatedProfile = {
  //     mem_fname: this.state.mem_fname,
  //     mem_lname: this.state.mem_lname,
  //     ORCID_ID: this.state.ORCID_ID,
  //     mem_dpt: this.state.mem_dpt,
  //     mem_staff_email: this.state.mem_staff_email,
  //     mem_staff_id: this.state.mem_staff_id
  //   };

  //   console.log(updatedProfile);

  //   axios.post(`/api/user/${ReactSession.get("mem_id")}/profile/update`, updatedProfile).then(response => {
  //       // test
  //       console.log(response);
      
  //   }).then(()=>{
  //       // reload page
  //       location.reload();
  //   });
 
  // }

  onClickLogout(event){
    // empty the session variables
    ReactSession.set("mem_id", "");
    ReactSession.set("mem_fname", "");
    ReactSession.set("mem_lname", "");
    ReactSession.set("mem_type", "");
    ReactSession.set("logged_in_status", "false");

    // go to login page
    window.location.href = "/login";

  }

  render () {
    return (
      /* whole thing- wrapper */
      <div id="" class="wrapper bg-grey-white">
          {/*Modals*/}
          {/*Edit Profile Modal*/}
          {/*<div class="modal fade" id="edit-profile-modal" tabindex="-1" role="dialog" aria-labelledby="editProfileModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="addFileModalLabel">Edit Profile</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form onSubmit={(event) => this.onFormSubmitEditProfile(event)} enctype="multipart/form-data">
                    
                    <div class="form-group">
                      <input type="text" class="form-control" name="mem_fname" value={this.state.mem_fname} onChange={this.handleFieldChange} placeholder="First Name" required />
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" name="mem_lname" value={this.state.mem_lname} onChange={this.handleFieldChange} placeholder="Last Name" required />
                    </div>
                     <div class="form-group">
                      <input type="text" class="form-control" name="ORCID_ID" value={this.state.ORCID_ID} onChange={this.handleFieldChange} placeholder="ORCID ID" required />
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" name="mem_dpt" value={this.state.mem_dpt} onChange={this.handleFieldChange} placeholder="Department" required />
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" name="mem_staff_email" value={this.state.mem_staff_email} onChange={this.handleFieldChange} placeholder="Strathmore Email" required />
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" name="mem_staff_id" value={this.state.mem_staff_id} onChange={this.handleFieldChange} placeholder="Staff ID" required />
                    </div>
                    <div class="model-footer text-center">
                      <button type="button" class="btn btn-primary btn-color-bluish" onClick={(event) => this.onFormSubmitEditProfile(event)}>Change</button>

                    </div>< br/>

                  </form>
                </div>
              </div>
            </div>
          </div>*/}
          {/*Edit profile Modal*/}
          {/*Modals*/}

          {/* Sidebar */}
          <nav id="sidebar" class="bg-transparent text-dark">

            {/* Sidebar Header*/}
            <div class="sidebar-header bg-transparent">
              <a class="navbar-brand pl-3 txt-big text-dark bg-transparent" href="#">
                <img src={"/images/coat_of_arms.png"} width="60" height="60" class="d-inline-block align-top mr-3" alt="" />
                      IMS
              </a>
              
            </div>
            {/* Sidebar Header*/}

            {/* List */}
            <div class="pl-4 d-flex pt-4 bg-transparent">
              <h2 class="text-dark">Menu</h2>
            </div>
              
            <ul class="list-unstyled pl-5 bg-transparent">
              <li>
                  <Link to="/mentor/profile" class="text-decoration-none text-dark">
                    <img src={"/images/user_profile2.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Profile
                  </Link>
              </li>
            </ul>

            <div class="pl-4 d-flex pt-4 bg-transparent">
              <h2 class="text-dark">Requests</h2>
            </div>
            <ul class="list-unstyled pl-5 bg-transparent">
              <li>
                  <Link to="/mentor/requests/pending" class="text-decoration-none text-dark">
                    <img src={"/images/pending.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Pending
                  </Link>
              </li>
              <li>
                  <Link to="/mentor/requests/accepted" class="text-decoration-none text-dark">
                    <img src={"/images/accepted.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Accepted
                  </Link>
              </li>
              <li>
                  <Link to="/mentor/requests/unsuccessful" class="text-decoration-none text-dark">
                    <img src={"/images/unsuccessful.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Declined
                  </Link>
              </li>
            </ul>
            {/* List */}

          </nav>
          {/* Sidebar */}

          {/* Line Separator */}
          <div id="line-separator" class="mr-4 line-sep">
          </div>
          {/* Line Separator */}

          {/* Content */}
          <div id="content" class="container-fluid">

            {/*Greetings section*/}
            <div class="section bg-transparent my-projects-row-div">
                <div class="row bg-transparent p-2 rounded-lg">
                  <div class="col-5 bg-transparent rounded-lg pt-1 pl-0 py-2 ">
                      <h2>Hi, {ReactSession.get("mem_fname")} {ReactSession.get("mem_lname")}</h2>
                  </div>
                  <div class="col-2 bg-transparent rounded-lg pt-3 d-flex justify-content-end">
                      
                  </div>
                  <div class="col-2 bg-transparent rounded-lg pt-3 d-flex justify-content-end">
                    <a class="bg-transparent text-danger text-decoration-none txt-logout margin-logout-txt " href="" onClick={(event) => this.onClickLogout(event)}>
                      <img src={"/images/logout.png"} width="30" height="30" class="d-inline-block align-top mr-2" alt="Logout" />
                            Logout
                    </a>
                  </div>
                </div>  
            </div>
            {/*Greetings section*/}

            {/*My Profile section*/}
            <div class="section bg-transparent my-projects-row-div">
                <div class="row bg-transparent p-2 rounded-lg d-flex">

                  <div class="col-3 bg-transparent rounded-lg p-2 ">
                      <h2>My Profile</h2>
                  </div>
                  <div class="col-3 bg-transparent rounded-lg pt-2 ">
                      
                  </div>
                  {/*<div class="col-3 bg-transparent rounded-lg pt-2 d-flex justify-content-end pr-5 ">
                      <img src={"/images/edit.png"} width="30" height="30" class="d-inline-block align-top mr-3" alt="" onClick={(event) => this.onClickEditProfile(event)} />
                  </div>*/}
                  
                </div>  
            </div>
            {/*My Profile section*/}

            {/* profile pic n name */}
            <div class="section bg-transparent">
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-2 bg-transparent rounded-lg p-2 text-center pt-3 img-profile-div">
                  <img src={"/images/user_profile.png"} width="130" height="130" class="d-inline-block align-top mr-3" alt="" />
                </div>
                <div class="col-3 bg-transparent rounded-lg pt-5 img-profile-div">
                    <span class="name-big-letters">
                      <img src={"/images/name.png"} width="30" height="30" class="d-inline-block align-top mr-2 mt-1" alt="" />
                      {this.state.ment_fname} {this.state.ment_lname}
                    </span><br />
                    <span class="email-big-letters">
                      <img src={"/images/email.png"} width="25" height="25" class="d-inline-block align-top ml-1 mr-2 mt-1" alt="" />
                      {this.state.ment_email}
                    </span>
                </div>
                <div class="col-5 bg-transparent rounded-lg pt-2 img-profile-div">
                    
                </div>
              </div>
            </div>
            {/* profile pic n name */}

            <hr />

            {/*personal details*/}
            <div class="section">
              {/*id*/}
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-2 bg-transparent rounded-lg p-2 text-center">
                  <span class="fields-smaller-letters">
                      <img src="/images/id.png" width="30" height="30" class="d-inline-block align-top mr-3 mt-0" alt="" />
                      Mentor ID
                  </span><br />
                </div>
                <div class="col-8 bg-transparent rounded-lg pt-2">
                  <h4>{this.state.ment_id}</h4>
                </div>
              </div>
              {/*id*/}

              <hr />

              {/*phone*/}
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-2 bg-transparent rounded-lg p-2 pl-3 text-center">
                  <span class="fields-smaller-letters">
                      <img src={"/images/phone.png"} width="30" height="30" class="d-inline-block align-top mr-3 mt-0" alt="" />
                      Phone
                  </span><br />
                </div>
                <div class="col-8 bg-transparent rounded-lg pt-2">
                  <h4>{this.state.ment_phone}</h4>
                </div>
              </div>
              {/*phone*/}

              <hr />

              {/*category*/}
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-2 bg-transparent rounded-lg p-2 pl-4 text-center">
                  <span class="fields-smaller-letters">
                      <img src={"/images/category.png"} width="30" height="30" class="d-inline-block align-top mr-3 mt-0" alt="" />
                        Category
                  </span><br />
                </div>
                <div class="col-8 bg-transparent rounded-lg pt-2">
                    <h4>{this.state.ment_category}</h4>
                </div>
              </div>
              {/*category*/}

              <hr />

            {/*resume_summary*/}
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-2 bg-transparent rounded-lg p-2 pl-4 text-center">
                  <span class="fields-smaller-letters">
                      <img src={"/images/course.png"} width="30" height="30" class="d-inline-block align-top mr-3 mt-0" alt="" />
                      Resume Summary
                  </span><br />
                </div>
                <div class="col-8 bg-transparent rounded-lg pt-2">
                  <h4>{this.state.ment_resune_summary}</h4>
                </div>
              </div>
              {/*resume summary*/}

              <hr />
              
            </div>
            {/*personal details end*/}
          </div>
          {/* Content */}
      </div>
    );
  }
}

export default MentorProfile;