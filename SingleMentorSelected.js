import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import "./singlementorselected.css"

class SingleMentorSelected extends Component {
  constructor () {
    super();
    this.state = {
      ment_fname:"",
      ment_lname:"",
      ment_email:"",
      ment_phone:"",
      ment_category:"",
      ment_resume_summary:"",
      ment_id:"",
      msg_to_mentor:"",

      ment_recomms:[]
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

    // make request to get mentor profile info
    // immediate code below is a temporary measure, will be removed once the FindMentors page is running aready - hard code a test id of the single_mentor_selected session variable
    // ReactSession.set("single_ment_selected_id", 965);
    axios.get(`http://mentors/api/mentor/${ReactSession.get("single_ment_selected_id")}/profile`).then(response => {
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

    // make request to get the recommended mentors
    // immediate code below is a temporary measure, will be removed once the FindMentors page is running aready - hard code a test id of the single_mentor_selected session variable
    // ReactSession.set("single_ment_selected_id", 965);
    axios.get(`http://mentors/api/student/single/mentor/${ReactSession.get("single_ment_selected_id")}/recommendations`).then(response => {
      // test
      console.log(response);
      this.setState({
          ment_recomms:response.data
      });
      
    });

    // binding
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
    this.onClickConnectToMentor = this.onClickConnectToMentor.bind(this);
    this.onClickMentRecom = this.onClickMentRecom.bind(this);
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

  onClickConnectToMentor(event){
    // make post request to record a connection request to the database
    // immediate code below is a temporary measure, will be removed once the FindMentors page is running aready - hard code a test id of the single_mentor_selected session variable
    // ReactSession.set("single_ment_selected_id", 965);
    axios.post(`http://mentors/api/student/${ReactSession.get("mem_id")}/connect/${ReactSession.get("single_ment_selected_id")}`)
      .then(response => {
        // test
        console.log(response);

        // go to pending connection requests page
        window.location.href = "/student/requests/all";
    });
  }

  onClickMentRecom(event, ment_recom_id){
    // set the id of the mentor selected to the session variable single_ment_selected_id
    ReactSession.set("single_ment_selected_id", ment_recom_id);
    // refresh the page
    window.location.href = "/student/selected/mentor";
  }

  render () {
    // variables to be used in return function
    let ment_recomms = this.state.ment_recomms;

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
                  <Link to="/student/profile" class="text-decoration-none text-dark">
                    <img src={"/images/user_profile2.png"} width="12" height="12" class="d-inline-block align-top mr-2 mt-2" alt=""/>
                    Profile
                  </Link>
              </li>
              <li>
                <Link to="/student/requests/all" class="text-decoration-none text-dark">
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
                  <div class="col-5 bg-transparent rounded-lg pt-1 pl-0 py-2 ">
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
                <div class="row bg-transparent rounded-lg d-flex">

                  <div class="col-3 bg-transparent rounded-lg p-2 ">
                      <h2>Mentor Profile</h2>
                  </div>
                  <div class="col-3 bg-transparent rounded-lg pt-2 ">
                      
                  </div>
                  
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

            {/* connect with mentor */}
            <div class="row bg-transparent p-2 rounded-lg">
              <div class="col-12 bg-transparent rounded-lg p-2 pl-4 text-center">
                {/* might implement this later */}
                {/* msg to mentor */}
                {/*<div class="form-group">
                  <label for="msgTxtArea">Message to the mentor</label>
                  <textarea class="form-control rounded-0" rows="5" name="msg_to_mentor" value={this.state.msg_to_mentor} onChange={this.handleFieldChange} required></textarea>
                </div>*/}
                {/* msg to mentor */}
                <div class="form-group">
                  <button type="button" class="btn btn-primary btn-color-bluish" onClick={(event) => this.onClickConnectToMentor(event)}>Connect</button>
                </div>
              </div>
            </div>
            {/* connect with mentor */}

            <hr />

            {/* Mentor Recommendations */}
            <div class="container text-center">
              <h3>Related Mentors</h3>
              <div class="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
                {ment_recomms.map(ment_recom => (

                  <div class="col-3">
                    <div class="card card-block card-test text-center pt-3" onClick={(event) => this.onClickMentRecom(event, ment_recom.ment_id)}>
                      <img class="card-img-top card-img-size mx-auto d-block" src={"/images/user_profile.png"} alt="Mentor Photo" />
                      <div class="card-body text-center">
                        <h5 class="card-title">{ment_recom.ment_fname} {ment_recom.ment_lname}</h5>
                        <h6 class="card-title">{ment_recom.ment_category}</h6>
                        <h6 class="card-title">Resume Summary</h6>
                        <p class="card-text truncate-resume-summary">{ment_recom.ment_resume_summary}</p>
                      </div>
                      <div class="card-footer text-center black">
                          <span><h5 class="text-light">View</h5></span>
                      </div>
                     </div>
                   </div>

                ))}
              </div>
            </div>
            {/* Mentor Recommendations */}

          </div>  
          {/* Content */} 

      </div>
    );
  }
}

export default SingleMentorSelected;

////////////////////////////////////////
// <div class="card-deck card-dims">
//   <div class="card mr-5 single-card-dims">
//     <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
//     <div class="card-body text-center">
//       <h5 class="card-title">Data Science</h5>
//       <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     </div>
//     <div class="card-footer text-center black">
//         <span><h5 class="text-light">View</h5></span>
//     </div>
//   </div>
//   <div class="card mr-5 single-card-dims">
//     <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
//     <div class="card-body text-center">
//       <h5 class="card-title">Data Science</h5>
//       <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     </div>
//     <div class="card-footer text-center black">
//         <span><h5 class="text-light">View</h5></span>
//     </div>
//   </div>
// </div>
////////////////////////////////////////
// <div class="row flex-row flex-nowrap">
//   <div class="col-3">
//     <div class="card card-block">Card</div>
//   </div>
//   <div class="col-3">
//       <div class="card card-block">Card</div>
//   </div>
//   <div class="col-3">
//       <div class="card card-block">Card</div>
//   </div>
//   <div class="col-3">
//       <div class="card card-block">Card</div>
//   </div>
// </div>
////////////////////////////////////////
// <div class="row flex-row flex-nowrap">
//   {ment_recomms.map(ment_recom => (
//     <div class="card mr-5 single-card-dims" onClick={(event) => this.onClickMentRecom(event, ment_recom.ment_id)}>
//       <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
//       <div class="card-body text-center">
//         <h5 class="card-title">{ment_recom.ment_category}</h5>
//         <p class="card-text">{ment_recom.ment_resume_summary}</p>
//       </div>
//       <div class="card-footer text-center black">
//           <span><h5 class="text-light">View</h5></span>
//       </div>
//     </div>
//   ))}
// </div>
////////////////////////////////////////