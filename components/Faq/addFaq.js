import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_FAQ } from '../actions/faq';
import { AC_ADD_FAQ } from '../actions/faq';

class addFaqs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      answerError: false,
      answerCountError: false,
      question: '',
      questionError: false,
      questionCountError: false,
      status: '',
      statusError: false,
    }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  validation() {
    var questionauth;
    var answerauth;
    var statusauth;
    const question = this.state.question;
    const answer = this.state.answer;
    const status = this.state.status
    if (question) {
      if (question.length < 5) {
        questionauth = false
        this.setState({ questionError: false, questionCountError: true })
      }
      else {
        questionauth = true
        this.setState({ questionError: false, questionCountError: false })
      }
    }
    else {
      questionauth = false
      this.setState({ questionError: true, questionCountError: false })
    }

    if (answer) {
      if (answer.length < 5) {
        answerauth = false
        this.setState({ answerError: false, answerCountError: true })
      }
      else {
        answerauth = true
        this.setState({ answerError: false, answerCountError: false })
      }
    }
    else {
      answerauth = false
      this.setState({ answerError: true, answerCountError: false })
    }

    if (status) {
      statusauth = true
      this.setState({ statusError: false })
    }
    else {
      statusauth = false
      this.setState({ statusError: true })
    }
    if (questionauth && answerauth && statusauth) {
      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
      const formData = {
        question: question,
        answer: answer,
        status: tempVal
      }
      this.props.AC_ADD_FAQ(formData);
      console.log('========Add Faq========', formData)
    }
  }
  handleInputChange(event) {
    const questionid = event.target.id;
    const questionvalue = event.target.value;
    const answerid = event.target.id;
    const answervalue = event.target.value;
    const statusid = event.target.id;
    const statusvalue = event.target.value;

    if (questionid == "question") {
      this.setState({ question: questionvalue })
      if (questionvalue) {
        if (questionvalue.length < 5) {
          this.setState({ questionError: false, questionCountError: true })
        }
        else {
          this.setState({ questionError: false, questionCountError: false })
        }
      }
      else {
        this.setState({ questionError: true, questionCountError: false })
      }
    }

    if (answerid == "answer") {
      this.setState({ answer: answervalue })
      if (answervalue) {
        if (answervalue.length < 5) {
          this.setState({ answerError: false, answerCountError: true })
        }
        else {
          this.setState({ answerError: false, answerCountError: false })
        }
      }
      else {
        this.setState({ answerError: true, answerCountError: false })
      }
    }

    if (statusid == "status") {
      this.setState({ status: statusvalue })
      if (statusvalue) {
        this.setState({ statusError: false })
      }
      else {
        this.setState({ statusError: true })
      }
    }
  }


  render() {
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add FAQ</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample" autoComplete='off'>
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Question</h5>
                  <input type="text" placeholder="Question" id="question" value={this.state.title} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.questionError ? <label class="mt-2" style={{ color: 'red' }}>Question is required</label> : ""}
                  {this.state.questionCountError ? <label class="mt-2" style={{ color: 'red' }}>Question should be atleast 5 characters</label> : ""}

                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Answer</h4>
                  <input type="text" placeholder="Answer" id="answer" value={this.state.answer} onChange={this.handleInputChange} class="form-control" ></input>
                  {this.state.answerError ? <label class="mt-2" style={{ color: 'red' }}>Answer is required</label> : ""}
                  {this.state.answerCountError ? <label class="mt-2" style={{ color: 'red' }}>Answer should be atleast 5 characters</label> : ""}

                </div>
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>STATUS</h4>
                  <select class="form-control" id="status" onChange={this.handleInputChange} >
                    <option selected>Select status</option>
                    <option value="Active" >Active</option>
                    <option value="Inactive" >Inactive</option>
                  </select>
                  {this.state.statusError ? <label class="mt-2" style={{ color: 'red' }}>Status is required</label> : ""}
                </div>
                <button type="button" class="btn btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Submit</button>
                <button type="button" class="btn btn-gradient-primary me-2" style={{ backgroundColor: 'blue', color: 'white', borderRadius: '2rem' }} onClick={this.validation}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('map state', state);
  return {
    faqsReducer: state.FAQ_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_FAQ, AC_ADD_FAQ }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(addFaqs);
