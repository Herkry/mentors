import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import "./MentorSingleRequest.css"

class MentorSingleRequest extends Component {
  constructor () {
    super();
    this.state = {
      std_fname:"",
      std_lname:"",
      std_email:"",
      std_phone:"",
      std_id:"",

      conn_id:"",
      conn_status:"",
      conn_session_rating: "",
      ment_id: ""
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

    // make request to get student profile info
    // immediate code below is a temporary measure, will be removed once the MentorRequests page
    // has the functionality of selecting a student request, passing the id of the student selected
    // in a session, and then redirecting to this page - hard code a test id of the single_std_selected
    // session variable
    ReactSession.set("single_std_selected_id", 1);
    axios.get(`http://mentors/api/student/${ReactSession.get("single_std_selected_id")}/profile`).then(response => {
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
          ment_resume_summary:mentor.ment_resume_summary,
          ment_id:mentor.ment_id
       });
      });
    });

    // make request to get std-mentor connection request info
    // immediate code below is a temporary measure, will be removed once the StudentRequests page 
    // has the functionality of selecting a mentor request, passing the id of the request selected 
    // in a session, and then redirecting to this page - hard code a 
    // test id of the single_request_selected session variable
    ReactSession.set("single_request_selected_id", 1);
    axios.get(`http://mentors/api/student/connection/${ReactSession.get("single_request_selected_id")}`).then(response => {
      // test
      console.log(response);

      let stdMentConnection = response.data
      stdMentConnection.map((conn) => {
        this.setState({
          conn_id:conn.conn_id,
          conn_status:conn.conn_status,
          conn_session_rating: conn.conn_session_rating,
          ment_id: conn.ment_id,
          std_id: conn.std_id
       });
      });
    });

    // binding
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  handleFieldChange(event){
    this.setState({
        [event.target.name]: event.target.value
    });

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

            {/*Heading section*/}
            <div class="section bg-transparent my-projects-row-div">
                <div class="row bg-transparent p-2 rounded-lg d-flex">

                  <div class="col-3 bg-transparent rounded-lg p-2 ">
                      <h2>Mentor Profile</h2>
                  </div>
                  <div class="col-3 bg-transparent rounded-lg pt-2 ">
                      <span class="badge badge-primary">{this.state.conn_status == "Pending" ? "Pending" : this.state.conn_status == "Accepted" ? "Accepted" : "Unsuccessful"}</span>
                  </div>
                  
                </div>  
            </div>
            {/*Heading section*/}

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

              {/*resume summary*/}
              <div class="row bg-transparent p-2 rounded-lg">
                <div class="col-12 bg-transparent rounded-lg p-2 pl-4 text-center">
                  <div class="form-group">
                    <label for="textarea1">Mentor Profile</label>
                    <textarea class="form-control rounded-0" id="textarea1" rows="10" value={this.state.ment_resume_summary}></textarea>
                  </div>
                </div>
              </div>
              {/*resume summary*/}

            </div>
            {/*personal details end*/}

            <hr />

            {/*Might implement this later*/}
            {/* msg to mentor */}
            {/*<div class="row bg-transparent p-2 rounded-lg">
              <div class="col-12 bg-transparent rounded-lg p-2 pl-4 text-center">
                <div class="form-group">
                  <label for="msgTxtArea">Message to the mentor</label>
                  <textarea class="form-control rounded-0" rows="5" name="msg_to_mentor" value={this.state.msg_to_mentor} onChange={this.handleFieldChange} required></textarea>
                </div>
                <div class="form-group">
                  <button type="button" class="btn btn-primary btn-color-bluish" onClick={(event) => this.onClickConnectToMentor(event)}>Connect</button>
                </div>
              </div>
            </div>*/}
            {/* msg to mentor */}
            {/*Might implement this later*/}

          </div>  
          {/* Content */} 

      </div>
    );
  }
}

export default MentorSingleRequest;