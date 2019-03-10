import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { regionService, showModal } from '../../../services';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Container, Row, Col } from 'react-grid-system';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const { SearchBar } = Search;

class Regions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            regionList: [],
            errorMsg: null,
            modal: false,
            isOpen: false,
            columns: [{
                dataField: 'id',
                text: 'Id',
                sort: true,
            }, {
                dataField: 'name',
                text: 'Region',
                sort: true,
                formatter: this.regionDetailFormatter
            }, {
                dataField: 'title',
                text: 'Title',
                sort: true
            }, {
                dataField: 'createdDate',
                text: 'Created Date',
                sort: true
            }]
        };
    }

    regionDetailFormatter = (cell, row) => {
        const regionLink = `#/admin/region/${row.uid}`;
        return (
            <p><a href={regionLink}>{cell}</a></p>
        );
    }

    loadRegionsList() {
        regionService.loadRegionList().then(data => {
            if (data.errorMsg) {
                showModal.showErrorMsg(data.errorMsg);
            } else {
                data.forEach(element => {
                    element.createdDate = new Date(element.createdDate).toLocaleDateString();
                });
                !this.isCancelled && this.setState({
                    regionList: data,
                    errorMsg: null,
                })
            }
        })
            .catch(err => {
                this.setState({ errorMsg: err.message });
            });

    }

    componentDidMount() {
        this.loadRegionsList();
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render() {
        return (
            <div className="animated fadeIn" >
                <ToolkitProvider
                    keyField="id"
                    data={this.state.regionList}
                    columns={this.state.columns}
                    search>
                    {
                        props => (
                            <div>
                                <Container fluid >
                                    <br />
                                    <Card>
                                        <CardHeader>
                                            <Row>
                                                <Col md={4}>
                                                    <i className="fa fa-align-justify"></i> Region <small className="text-muted">List</small>
                                                </Col>
                                                <br />
                                                <Col md={4} offset={{ md: 4 }}>
                                                    <SearchBar {...props.searchProps} />
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <CardBody>
                                            <BootstrapTable keyField="id"
                                                {...props.baseProps}
                                                striped hover condensed
                                                bordered={false}
                                                pagination={paginationFactory()}
                                                noDataIndication={this.state.errorMsg}
                                            />
                                        </CardBody>
                                    </Card>
                                </Container>
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div >
        )
    }
}

export default Regions;