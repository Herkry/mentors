import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

import "./mentoregister.css"

class MentorRegister extends Component {
  constructor () {
    super();
    this.state = {
      ment_fname:"",
      ment_lname:"",
      ment_email:"",
      ment_phone:"",
      ment_category:"",
      ment_resume_summary:"",
      ment_pass:""
    }

    // binding methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount () {
      
  }

  handleFieldChange(event){
    this.setState({
          [event.target.name]: event.target.value
    })
  }

  onFormSubmitRegisterStudent(event){
    event.preventDefault();

    // make object to register student
    let mentor = {
        ment_fname: this.state.ment_fname,
        ment_lname: this.state.ment_lname,
        ment_email: this.state.ment_email,
        ment_phone: this.state.ment_phone,
        ment_category: this.state.ment_category,
        ment_resume_summary: this.state.ment_resume_summary,
        ment_pass: this.state.ment_pass
    };

    // create modal with loading spinner
    window.$('#spinner-reg-modal').modal("show").on("hide.bs.modal", function(){ return false });

    // make api call
    axios.post(`http://mentors/api/mentor/register`, mentor).then(response => {
        // test
        console.log(response.data);

        // put important info in the sessions
        ReactSession.set("mem_id", response.data.ment_id);
        ReactSession.set("mem_fname", response.data.ment_fname);
        ReactSession.set("mem_lname", response.data.ment_lname);
        ReactSession.set("mem_type", response.data.mem_type);
        ReactSession.set("logged_in_status", "true");

        console.log(ReactSession.get("mem_id"))

    }).then(()=>{
        // hide modal
        window.$('#spinner-reg-modal').on("hide.bs.modal", function() { });
        window.$("#spinner-reg-modal").hide();
        window.$(".modal-backdrop").remove();

        // go to mentorship requests page(FindMentors component)
        window.location.href = "/requests";
    });
  }


  render () {
    // Not sure whether the code below is necessary as I already set this in the root App component
    ReactSession.setStoreType("localStorage");

    return(
         <div id="content" class="bg-colour">

            {/* Modal with loading spinner*/}
            <div class="modal fade bd-example-modal-sm" tabindex="-1" id="spinner-reg-modal" role="dialog" aria-labelledby="spinner-modal" aria-hidden="true">
              <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div class="modal-content pt-3 pb-3">
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    Loading...
                  </div>
                </div>
              </div>
            </div>
            {/* Modal with loading spinner*/}

            {/*Login section*/}
            <div class="section bg-transparent">
                <div class="row bg-transparent p-2 rounded-lg">

                  <div class="col-8 bg-transparent rounded-lg px-2 py-2 pt-3 ">
                      
                  </div>
                  <div class="col-4 bg-transparent rounded-lg p-3">
                    <div class="row">
                      <div class="col-6 d-flex justify-content-end pr-1">
                        <Link to="/login" class="color-bluish"><img src="/images/login.png" width="30" height="30" class="d-inline-block align-top" alt="" /></Link>
                      </div>
                      <div class="col-6 d-flex justify-content-start pl-1 pt-1">
                        <Link to="/login" class="color-bluish"><b>Login</b></Link>
                      </div>
                    </div>
                  </div>
                  
                </div>  
            </div>
            {/*Login section*/}

            {/*Big section*/}
            <div class="section bg-transparent h-100 mt-2">
                <div class="row bg-transparent p-2 rounded-lg flex-grow-1 overflow-auto h-100">
                  <div class="col-6 bg-transparent rounded-lg pt-3 px-2 py-2 d-flex justify-content-center align-items-center">
                      <figure class="figure">
                        <a class="" data-target="" data-toggle="modal" href="#">
                          <img src={"/images/coat_of_arms.png"} width="240" height="240" class="d-inline-block align-top figure-img img-fluid rounded" alt=""/>
                        </a>
                        <figcaption class="figure-caption">
                          {/*<a class="" href="#"><h1>IMS</h1></a>*/}
                        </figcaption>
                      </figure>
                  </div>
                  <div class="col-6 bg-transparent rounded-lg px-3 py-3 pt-4 justify-content-center align-items-center">
                      <div class="pl-3 color-bluish">
                        <b class="color-bluish">Create a new account</b>
                      </div>
                      <div class="card mt-2 color-light-bluish card-width">
                        <div class="card-body">
                          <div class="form-group">
                            <input type="text" class="form-control" name="ment_fname" value={this.state.ment_fname} onChange={this.handleFieldChange} placeholder="First Name" required />
                          </div>
                          <div class="form-group">
                            <input type="text" class="form-control" name="ment_lname" value={this.state.ment_lname} onChange={this.handleFieldChange} placeholder="Last Name" required />
                          </div>
                           <div class="form-group">
                            <input type="text" class="form-control" name="ment_email" value={this.state.ment_email} onChange={this.handleFieldChange} placeholder="Email" required />
                          </div>
                          <div class="form-group">
                            <input type="text" class="form-control" name="ment_phone" value={this.state.ment_phone} onChange={this.handleFieldChange} placeholder="Phone" required />
                          </div>
                          <div class="form-group">
                            <input type="text" class="form-control" name="ment_category" value={this.state.ment_category} onChange={this.handleFieldChange} placeholder="Industry Category" required />
                          </div>
                          <div class="form-group">
                            <input type="textarea" class="form-control" name="ment_resume_summary" value={this.state.ment_resume_summary} onChange={this.handleFieldChange} placeholder="Resume Summary" required />
                          </div>
                          <div class="form-group">
                            <input type="password" class="form-control" name="ment_pass" value={this.state.ment_pass} onChange={this.handleFieldChange} placeholder="Password" required />
                          </div>
                          <div class="form-group">
                            <button type="button" class="btn btn-primary btn-color-bluish" onClick={(event) => this.onFormSubmitRegisterStudent(event)}>Continue</button>
                          </div>
                        </div>
                      </div>
                  </div>

                </div>  
            </div>
            {/*Big section*/}

         </div> 
    );
  }
}

export default MentorRegister;