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
	    	ds_mentors:[],
	    	hr_mentors:[],
	    	adv_mentors:[],
	    	art_mentors:[],
	    	wd_mentors:[],
	    	me_mentors:[],
	    	sls_mentors:[],
	    	hf_mentors:[],
	    	ce_mentors:[],
	    	jv_mentors:[],
	    	ba_mentors:[],
	    	sap_mentors:[],
	    	at_mentors:[],
	    	ee_mentors:[],
	    	om_mentors:[],
	    	py_mentors:[],
	    	dvps_mentors:[],
	    	nse_mentors:[],
	    	pmo_mentors:[],
	    	db_mentors:[],
	    	hadp_mentors:[],
	    	dnet_mentors:[],
	    	blc_mentors:[],
	    	ts_mentors:[],
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

	    // axios API calls below

	    // make request to get the categorized mentors
	    axios.get(`http://mentors/api/student/mentors/categories`).then(response => {
	      // test
	      console.log("response for mentor categories --");
	      console.log(response);
	      this.setState({
	       		ds_mentors: response.data.ds,
	    		hr_mentors: response.data.hr,
		    	adv_mentors: response.data.adv,
		    	art_mentors: response.data.art,
		    	wd_mentors: response.data.wd,
		    	me_mentors: response.data.me,
		    	sls_mentors: response.data.sls,
		    	hf_mentors: response.data.hf,
		    	ce_mentors: response.data.ce,
		    	jv_mentors: response.data.jv,
		    	ba_mentors: response.data.ba,
		    	sap_mentors: response.data.sap,
		    	at_mentors: response.data.at,
		    	ee_mentors: response.data.ee,
		    	om_mentors: response.data.om,
		    	py_mentors: response.data.py,
		    	dvps_mentors: response.data.dvps,
		    	nse_mentors: response.data.ns,
		    	pmo_mentors: response.data.pmo,
		    	db_mentors: response.data.db,
		    	hadp_mentors: response.data.hadp,
		    	dnet_mentors: response.data.dnet,
		    	blc_mentors: response.data.blc,
		    	ts_mentors: response.data.ts,
	      });
	    });

	    // make request to get the recommended mentors
	    axios.get(`http://mentors/api/student/${ReactSession.get("mem_id")}/mentors/recommendations`).then(response => {
	      // test
	      console.log("response for mentor recomms");
	      console.log(response);
	      this.setState({
	          ment_recomms:response.data
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
	    let hr_mentors = this.state.hr_mentors;
    	let ds_mentors = this.state.ds_mentors;
	    let adv_mentors = this.state.adv_mentors;
	    let art_mentors = this.state.art_mentors;
	    let wd_mentors = this.state.wd_mentors;
	    let me_mentors = this.state.me_mentors;
	    let sls_mentors = this.state.sls_mentors;
	    let hf_mentors = this.state.hf_mentors;
	    let ce_mentors = this.state.ce_mentors;
	    let jv_mentors = this.state.jv_mentors;
	    let ba_mentors = this.state.ba_mentors;
	    let sap_mentors = this.state.sap_mentors;
	    let at_mentors = this.state.at_mentors;
	    let ee_mentors = this.state.ee_mentors;
	    let om_mentors = this.state.om_mentors;
	    let py_mentors = this.state.py_mentors;
	    let dvps_mentors = this.state.dvps_mentors;
	    let nse_mentors = this.state.nse_mentors;
	    let pmo_mentors = this.state.pmo_mentors;
	    let db_mentors = this.state.db_mentors;
	    let hadp_mentors = this.state.hadp_mentors;
	    let dnet_mentors = this.state.dnet_mentors;
	    let blc_mentors = this.state.blc_mentors;
	    let ts_mentors = this.state.ts_mentors;
	    let ment_recomms = this.state.ment_recomms;

	    // test
	    console.log("ment_recomms below");
	    console.log(ment_recomms);

	    // test
	    console.log("art below");
	    console.log(art_mentors);
    	
		return (
			/* whole thing wrapper */
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

	            {/*Heading section*/}
	            <div class="section bg-transparent">
	                <div class="row bg-transparent rounded-lg d-flex">

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
	        	<div class="section text-center">

	        		{/* Personal Recommendations */}
	        		<h3>Personal Recommendations</h3>
	        		<div class="container">
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
		            {/* Personal Recommendations */}

					< hr/>
					
					{/* Art */}
					<h3>Arts</h3>
					<div class="container">
						<div class="scrolling-wrapper row flex-row flex-nowrap">
						 
							{art_mentors.map(mentor => (
			                   <div class="col-3">
				                  <div class="card card-block card-test text-center pt-3" onClick={(event) => this.onClickMentRecom(event, mentor.ment_id)}>
				                    <img class="card-img-top card-img-size mx-auto d-block" src={"/images/user_profile.png"} alt="Mentor Photo" />
				                    <div class="card-body text-center">
				                      <h5 class="card-title">{mentor.ment_fname} {mentor.ment_lname}</h5>
				                      <h6 class="card-title">{mentor.ment_category}</h6>
				                      <h6 class="card-title">Resume Summary</h6>
				                      <p class="card-text truncate-resume-summary">{mentor.ment_resume_summary}</p>
				                    </div>
				                    <div class="card-footer text-center black">
				                        <span><h5 class="text-light">View</h5></span>
				                    </div>
				                   </div>
			                   </div>	
				            ))}

						</div>
					</div>
					{/* Art */}

					< hr/>

					{/* DS */}
					<h3>Data Science</h3>
					<div class="container">
						<div class="scrolling-wrapper row flex-row flex-nowrap">
						 
							{ds_mentors.map(mentor => (
			                   <div class="col-3">
				                  <div class="card card-block card-test text-center pt-3" onClick={(event) => this.onClickMentRecom(event, mentor.ment_id)}>
				                    <img class="card-img-top card-img-size mx-auto d-block" src={"/images/user_profile.png"} alt="Mentor Photo" />
				                    <div class="card-body text-center">
				                      <h5 class="card-title">{mentor.ment_fname} {mentor.ment_lname}</h5>
				                      <h6 class="card-title">{mentor.ment_category}</h6>
				                      <h6 class="card-title">Resume Summary</h6>
				                      <p class="card-text truncate-resume-summary">{mentor.ment_resume_summary}</p>
				                    </div>
				                    <div class="card-footer text-center black">
				                        <span><h5 class="text-light">View</h5></span>
				                    </div>
				                   </div>
			                   </div>	
				            ))}

						</div>
					</div>
					{/* DS */}

					< hr/>

					{/* Advocates */}
					<h3>Advocates</h3>
					<div class="container">
						<div class="scrolling-wrapper row flex-row flex-nowrap">
						 
							{adv_mentors.map(mentor => (
			                   <div class="col-3">
				                  <div class="card card-block card-test text-center pt-3" onClick={(event) => this.onClickMentRecom(event, mentor.ment_id)}>
				                    <img class="card-img-top card-img-size mx-auto d-block" src={"/images/user_profile.png"} alt="Mentor Photo" />
				                    <div class="card-body text-center">
				                      <h5 class="card-title">{mentor.ment_fname} {mentor.ment_lname}</h5>
				                      <h6 class="card-title">{mentor.ment_category}</h6>
				                      <h6 class="card-title">Resume Summary</h6>
				                      <p class="card-text truncate-resume-summary">{mentor.ment_resume_summary}</p>
				                    </div>
				                    <div class="card-footer text-center black">
				                        <span><h5 class="text-light">View</h5></span>
				                    </div>
				                   </div>
			                   </div>	
				            ))}

						</div>
					</div>
					{/* Advocates */}

	            </div>
	            {/*Mentor Categories*/}

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
// 		  <h5 class="card-title">{mentor.ment_fname} {mentor.ment_lname}</h5>
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
