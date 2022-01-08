import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AC_LIST_PAGE } from '../actions/pages';
import { AC_ADD_PAGE } from '../actions/pages';
//editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class AddPages extends React.Component {
  constructor(props) {
    super(props);
    const html = '<p></p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState: '',
      // description: '',
      descriptionError: false,
      descriptionCountError: false,
      title: '',
      titleError: false,
      titleCountError: false,
      status: '',
      statusError: false,
    }
  }
    this.validation = this.validation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
        editorState,descriptionError:false
    });
};

  validation() {
    var titleauth;
    var descriptionauth;
    var statusauth;
    const title = this.state.title;
    const description = this.state.description;
    const status = this.state.status
    if (title) {
      if (title.length < 5) {
        titleauth = false
        this.setState({ titleError: false, titleCountError: true })
      }
      else {
        titleauth = true
        this.setState({ titleError: false, titleCountError: false })
      }
    }
    else {
      titleauth = false
      this.setState({ titleError: true, titleCountError: false })
    }

    if (description) {
      if (description.length < 5) {
        descriptionauth = false
        this.setState({ descriptionError: false, descriptionCountError: true })
      }
      else {
        descriptionauth = true
        this.setState({ descriptionError: false, descriptionCountError: false })
      }
    }
    else {
      descriptionauth = false
      this.setState({ descriptionError: true, descriptionCountError: false })
    }

    if (status) {
      statusauth = true
      this.setState({ statusError: false })
    }
    else {
      statusauth = false
      this.setState({ statusError: true })
    }
    if (titleauth && descriptionauth && statusauth) {
      var tempVal;
      if (status == 'Active') {
        tempVal = true
      } else {
        tempVal = false
      }
      const formData = {
        title: title,
        description: description,
        status: tempVal
      }
      this.props.AC_ADD_PAGE(formData);
      console.log('========Add page========', formData)
    }
  }
  handleInputChange(event) {
    const titleid = event.target.id;
    const titlevalue = event.target.value;
    const descriptionid = event.target.id;
    const descriptionvalue = event.target.value;
    const statusid = event.target.id;
    const statusvalue = event.target.value;

    if (titleid == "title") {
      this.setState({ title: titlevalue })
      if (titlevalue) {
        if (titlevalue.length < 5) {
          this.setState({ titleError: false, titleCountError: true })
        }
        else {
          this.setState({ titleError: false, titleCountError: false })
        }
      }
      else {
        this.setState({ titleError: true, titleCountError: false })
      }
    }

    if (descriptionid == "description") {
      this.setState({ description: descriptionvalue })
      if (descriptionvalue) {
        if (descriptionvalue.length < 5) {
          this.setState({ descriptionError: false, descriptionCountError: true })
        }
        else {
          this.setState({ descriptionError: false, descriptionCountError: false })
        }
      }
      else {
        this.setState({ descriptionError: true, descriptionCountError: false })
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
    const { editorState } = this.state;
    return (
      <div class="container-fluid pages" style={{ width: '600px', marginRight: '611px' }}>
        <h3 class="page-title"><span class="page-title-icon bg-gradient-primary text-white me-2" style={{ marginLeft: '37px', marginTop: '47px' }}><i class="mdi mdi-comment-plus-outline"></i></span>Add Page</h3>
        <div class="col-12 grid-margin stretch-card">
          <div class="card" >
            <div class="card-body">
              <form class="forms-sample" autoComplete='off'>
                <div class="form-group">
                  <h5 style={{ fontSize: '0.875rem' }}>Title</h5>
                  <input type="text" placeholder="title" id="title" value={this.state.title} onChange={this.handleInputChange} style={{ borderColor: this.state.color0 }} class="form-control" ></input>
                  {this.state.titleError ? <label class="mt-2" style={{ color: 'red' }}>title is required</label> : ""}
                  {this.state.titleCountError ? <label class="mt-2" style={{ color: 'red' }}>title should be atleast 5 characters</label> : ""}
                </div>
                <div class="form-group">
                                        <label for="exampleInputEmail3">Description</label>
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                  {/* {this.state.descriptionError ? <label class="mt-2" style={{ color: 'red' }}>Description is required</label> : ""} */}
                  {this.state.descriptionCountError ? <label class="mt-2" style={{ color: 'red' }}>Description should be atleast 5 characters</label> : ""}
                                    </div>
                  {/* <h4 style={{ fontSize: '0.875rem' }}>Description</h4>
                  <input type="text" placeholder="description" id="description" value={this.state.description} onChange={this.handleInputChange} style={{ borderColor: this.state.color1 }} class="form-control" ></input> */}
                 
             
                <div class="form-group">
                  <h4 style={{ fontSize: '0.875rem' }}>Status</h4>
                  <select class="form-control" id="status" style={{ outline: this.state.color2 }} onChange={this.handleInputChange} >
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
    pageReducer: state.PAGE_Reducer
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AC_LIST_PAGE, AC_ADD_PAGE }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPages);