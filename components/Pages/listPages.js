import React from "react";
import { AC_LIST_PAGE,AC_DELETE_PAGE } from "../actions/pages";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from "sweetalert";
 
class listPages extends React.Component  {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete(event) {
        var pageId = event.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, the file will deleted permanently!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.deletePage(pageId);
                }
            });
    }
    deletePage(pageId){
        var formData = {
            id: pageId
        }
        this.props.AC_LIST_PAGE();
        this.props.AC_DELETE_PAGE(formData);
        this.props.AC_LIST_PAGE();
    }
    componentDidMount() {
        this.props.AC_LIST_PAGE();
    }
    render() {
        var TotalPage=0;
        var Active=0;
        var Inactive=0;
        var pageList=this.props.PageReducer.PageList;
    if(pageList){
      Active=0;
      TotalPage=pageList.length;
      Inactive=0;
    }
        var Page = this.props.PageReducer.pageList;
        console.log("=-=-=-table=", Page)
        var resultArray = [];
        if (Page) {
            for (var i = 0; i < Page.length; i++) {
                var tempVal="";
                if (Page[i].status)
                {
                    tempVal= "Active";
                    Active++;
                }else{
                    tempVal="Inactive"
                    Inactive++;
                }
                resultArray.push(<tr key={i} >
                    <th scope="row">{i + 1}</th>
                    <td>{Page[i].title}</td>
                    <td>{Page[i].description}</td>
                    <td>{tempVal}</td>
                    <td>
                        <button type="button" id={Page[i]._id} onClick={this.delete} class="btn btn-danger">delete</button>
                        <button type="button" id={Page[i]._id} onClick={this.delete} class="btn">Edit</button>
                    </td>
                </tr>)
            }
        }
        return (
            <>
                <div class="main-panel" >
                    <div class="content-wrapper" style={{ background: 'white' }} >
                        <div class="page-header">
                            <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-white me-2">
                                    <i class="mdi mdi-home"></i>
                                </span> List Page
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active" aria-current="page">
                                        <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div class="row">
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-danger card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Total FAQ <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{TotalPage}</h2>
                                        <h6 class="card-text">Increased by 60%</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-info card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Active FAQ <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Active}</h2>
                                        <h6 class="card-text">Decreased by 10%</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 stretch-card grid-margin">
                                <div class="card bg-gradient-success card-img-holder text-white">
                                    <div class="card-body">
                                        <img src="assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
                                        <h4 class="font-weight-normal mb-3">Inactive FAQ <i class="mdi mdi-diamond mdi-24px float-right"></i>
                                        </h4>
                                        <h2 class="mb-5">{Inactive}</h2>
                                        <h6 class="card-text">Increased by 5%</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col"> Questions</th>
                                    <th scope="col">Answers</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultArray}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
function mapStateToProps(state) {
        return {
            PageReducer: state.PAGE_Reducer
        }
    }
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({ AC_LIST_PAGE, AC_DELETE_PAGE }, dispatch)
    }
export default connect(mapStateToProps, mapDispatchToProps)(listPages);