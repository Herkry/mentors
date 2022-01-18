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

          {/* Sidebar */}
          <nav id="sidebar" class="bg-transparent text-dark mr-3">

            {/* Sidebar Header*/}
            <div class="sidebar-header bg-transparent">
              <a class="navbar-brand pl-3 txt-big text-dark bg-transparent text-center justify-content-center mr-3 pl-4" href="#">
                <img src={"/images/strath_logo_2.png"} width="115" height="100" class="d-inline-block align-top" alt="" />
                <h1 class="mt-2">IMS</h1>
              </a>
            </div>
            {/* Sidebar Header*/}

            {/*</ hr>*/}

            {/* List */}
            <div class="pl-4 d-flex pt-2 bg-transparent">
              <h2 class="text-dark">Menu</h2>
            </div>
              
            <ul class="list-unstyled pl-5 bg-transparent">
              <li>
                  <Link to="/mentor/profile" class="text-decoration-none text-dark">
                    <img src={"/images/user_profile2.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Profile
                  </Link>
              </li>
              <li>
                <Link to="/mentor/requests/all" class="text-decoration-none text-dark">
                      <img src={"/images/accepted.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                      Requests
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
                  <div class="col-5 bg-transparent rounded-lg pt-1 pl-2 py-2 ">
                      <h2>Hi, {ReactSession.get("mem_fname")} {ReactSession.get("mem_lname")}</h2>
                  </div>
                  <div class="col-4 bg-transparent rounded-lg pt-3 d-flex justify-content-end">
                      
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