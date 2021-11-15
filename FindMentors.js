import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import axios from 'axios'
import "./findmentors.css"

class FindMentors extends React.Component {

	constructor () {
	    super();
	    this.state = {
	    	mentors:[]
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

	    // axios API calls below

	    // make request to get the categorized mentors
	    axios.get(`http://mentors/api/student/mentors/categories`).then(response => {
	      // test
	      console.log(response);
	      this.setState({
	          mentors:response.data
	      });
	    });

	    this.onClickLogout = this.onClickLogout.bind(this);
	    this.onClickMentRecom = this.onClickMentRecom.bind(this);
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

  	onClickMentRecom(event, ment_recom_id){
	    // set the id of the mentor selected to the session variable single_ment_selected_id
	    ReactSession.set("single_ment_selected_id", ment_recom_id);
	    // refresh the page
	    window.location.href = "/student/selected/mentor";
	}

	render() {
		// variables to be used in return function
    	let mentors = this.state.mentors;
    	
		return (
			/* whole thing wrapper */
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
	                      <h2>Find a Mentor</h2>
	                  </div>
	                  <div class="col-9 bg-transparent rounded-lg pt-2 ">
	                      
	                  </div>
	                  
	                </div>  
	            </div>
	            {/*Heading section*/}

	            <hr />

	        	{/*Mentor Categories*/}
	        	<div class="container-fluid">
	        		<h3>Data Science</h3>
	        		{/* Data Science */}
	              	<div class="card-deck card-dims">
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Data Science</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Data Science</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					</div>
					{/* Data Science*/}

					< hr/>

					<h3>Web</h3>
					{/* Web */}
	              	<div class="card-deck card-dims">
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Web</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Web</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					</div>
					{/* Web */}

					< hr/>
					<h3>Devops</h3>
					{/* Devops */}
	              	<div class="card-deck card-dims">
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Devops</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					  <div class="card mr-5 single-card-dims">
					    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
					    <div class="card-body text-center">
					      <h5 class="card-title">Devops</h5>
					      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					    </div>
					    <div class="card-footer text-center black">
					        <span><h5 class="text-light">View</h5></span>
					    </div>
					  </div>
					</div>
					{/* Devops */}

	            </div>

	          </div>  
              {/* Content */}

		    </div>
		    /*div whole thing*/

		);
	}
}

export default FindMentors;
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
//////////////////////////////////////////////////
// <div class="row flex-row flex-nowrap">
// 	{mentors.ds_mentors.map(mentor => (
// 	  <div class="card mr-5 single-card-dims" onClick={(event) => this.onClickMentRecom(event, mentor.ment_id)}>
// 	    <img class="card-img-top card-img-size" src={"/images/user_profile.png"} alt="Mentor Photo" />
// 	    <div class="card-body text-center">
//		  <h5 class="card-title">{mentor.ment_fname} {mentor.ment_lname}</h5>
// 	      <h5 class="card-title">{mentor.ment_category}</h5>
// 	      <p class="card-text">{mentor.ment_resume_summary}</p>
// 	    </div>
// 	    <div class="card-footer text-center black">
// 	        <span><h5 class="text-light">View</h5></span>
// 	    </div>
// 	  </div>

// 	))}
// </div>
//////////////////////////////////////////////////
