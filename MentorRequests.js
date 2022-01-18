import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import axios from 'axios'
import "./MentorRequests.css"

class MentorRequests extends React.Component {

	constructor () {
	    super();
	    this.state = {
	    	pending_requests:[],
	    	accepted_requests:[],
	    	unsuccessful_requests:[]
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

	    // get all the requests
	    axios.get(`http://mentors/api/mentor/${ReactSession.get("mem_id")}/requests/all`).then(response => {
	      // test
	      console.log(response);
	      this.setState({
	          pending_requests:response.data.pending_requests,
	          accepted_requests:response.data.accepted_requests,
	          unsuccessful_requests:response.data.unsuccessful_requests,
	      });
	    });

	    // binding
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

	onClickStdMentConnRequest(event, item_conn_id, item_std_id){
	    // set the id of the request selected to the session variable single_request_selected_id
	    ReactSession.set("single_request_selected_id", item_conn_id);
	    // set the id of the student in request selected to the session variable single_std_selected_id
	    ReactSession.set("single_std_selected_id", item_std_id);
	    // refresh the page
	    window.location.href = "/mentor/requests/single";
	}

	render() {
		// variables to be used in return function
    	let pending_requests = this.state.pending_requests
    	let accepted_requests = this.state.accepted_requests
    	let unsuccessful_requests = this.state.unsuccessful_requests

    	// function to show a list of requests
    	const showRequests = (requests) => {
		    let content = [];
		    console.log(requests)
		    for(let i = 0; i < requests.length; i++){
		      const item = requests[i];
		      content.push(
		      	<div class="media" onClick={(event) => this.onClickStdMentConnRequest(event, item.conn_id, item.std_id)}>
			  		<img src={"/images/course.png"} class="mr-3 mt-3" src={"/images/user_profile.png"} width="30" height="30" alt=""/>
			  		<div class="media-body">
			  			<div class="row bg-transparent p-2 rounded-lg d-flex">
			                <div class="col-3 bg-transparent rounded-lg p-2">
			                    <h4 class="mt-0">{item.std_fname} {item.std_lname}</h4>
			                </div>
			                <div class="col-9 bg-transparent rounded-lg pt-2 ">
			                    <span class="badge badge-primary">{item.conn_status}</span>
			                </div>
			            </div>
			  		</div>
			  		<hr />
			  	</div>
		      );
		    }
		    return content;
		};

		return (
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

			        {/*Heading section*/}
		            <div class="section bg-transparent my-projects-row-div">
		                <div class="row bg-transparent p-2 rounded-lg d-flex">

		                  <div class="col-7 bg-transparent rounded-lg p-2 ">
		                      <h2>Connection Requests</h2>
		                  </div>
		                  <div class="col-5 bg-transparent rounded-lg pt-2 ">
		                      
		                  </div>
		                  
		                </div>
		            </div>
		            {/*Heading section*/}

		            <hr />

		        	{/*Requests*/}
		        	<div class="section">
		        	
			        	{showRequests(pending_requests)}
			        	{showRequests(accepted_requests)}
			        	{showRequests(unsuccessful_requests)}
		        	
		        	</div>
		        	{/*Requests*/}
          		</div>
          		{/* Content */}
			</div>
		);
	}
}

export default MentorRequests;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// {requests.pending_requests.map(pr => (
//     <div class="media">
//  		<img src={"/images/course.png"} class="mr-3 mt-3" src={"/images/user_profile.png"} width="30" height="30" alt=""/>
//  		<div class="media-body">
//  			<div class="row bg-transparent p-2 rounded-lg d-flex">
//                <div class="col-3 bg-transparent rounded-lg p-2">
//                    <h4 class="mt-0">{pr.ment_fname} {pr.ment_lname}</h4>
//  				   <h5>{pr.ment_category}</h5>
//                </div>
//                <div class="col-9 bg-transparent rounded-lg pt-2 ">
//                    <span class="badge badge-primary">{pr.conn_status}</span>
//                </div>
//              </div>
//  		</div>
//  	</div>
//		
// <hr />
// ))}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// <div class="media">
// 	<img src={"/images/course.png"} class="mr-3 mt-3" src={"/images/user_profile.png"} width="30" height="30" alt=""/>
// 	<div class="media-body">
// 		<div class="row bg-transparent p-2 rounded-lg d-flex">
//           <div class="col-3 bg-transparent rounded-lg p-2">
//               <h4 class="mt-0">Mark Bold</h4>
// 			  <h5>Data Science</h5>
//           </div>
//           <div class="col-9 bg-transparent rounded-lg pt-2 ">
//               <span class="badge badge-primary">Pending</span>
//           </div>
//         </div>
// 	</div>
// </div>
//
// <hr />
//
// <div class="media">
// 	<img src={"/images/course.png"} class="mr-3 mt-3" src={"/images/user_profile.png"} width="30" height="30" alt=""/>
// 	<div class="media-body">
// 		<div class="row bg-transparent p-2 rounded-lg d-flex">
//           <div class="col-3 bg-transparent rounded-lg p-2">
//               <h4 class="mt-0">Mark Markus</h4>
// 			  <h5>Data Anaysis</h5>
//           </div>
//           <div class="col-9 bg-transparent rounded-lg pt-2 ">
//               <span class="badge badge-primary">Pending</span>
//           </div>
//         </div>
// 	</div>
// </div>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for(let i = 0; i < requests.length; i++){
//   const item = requests[i];
//   content.push(
//   	<div class="media">
//   		<img src={"/images/course.png"} class="mr-3 mt-3" src={"/images/user_profile.png"} width="30" height="30" alt=""/>
//   		<div class="media-body">
//   			<div class="row bg-transparent p-2 rounded-lg d-flex">
//                 <div class="col-3 bg-transparent rounded-lg p-2">
//                     <h4 class="mt-0">{item.ment_fname} {item.ment_lname}</h4>
//   				   <h5>{item.ment_category}</h5>
//                 </div>
//                 <div class="col-9 bg-transparent rounded-lg pt-2 ">
//                     <span class="badge badge-primary">{item.conn_status}</span>
//                 </div>
//             </div>
//   		</div>
//   		<hr />
//   	</div>
//   );
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////