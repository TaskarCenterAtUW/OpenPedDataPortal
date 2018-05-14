import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const marks = {
    0: '0%',
    100: '100%'
  };

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { profile: 'Select', defaultValue: 50, min: 0, max: 100};
    }

    onCrimeChange = (value) => {
        this.setState({
            crime: value
        });
    }

    onTransportChange = (value) => {
        this.setState({
            transport: value
        });
    }

    onGeenSpacesChange = (value) => {
        this.setState({
            green: value
        });
    }

    percentFormatter(v) {
        return `${v} %`;
    }

    render() {
        let profileOptions = ["Select", "Manual Wheelchair", "Power Wheelchair", "Cane"];
        return (
            <div id="sidebar" className="bg-light" ref='sidebar'>
                <ListGroup>
                    <ListGroupItem className="bg-light">
                        <p id="userprofileins" className="text-info"><b>Select User Profile</b></p>
                        <ButtonToolbar id="userprofile">
                            <DropdownButton title={this.state.profile} id="dropdown-size-medium">
                                {
                                    profileOptions.map(option => {
                                        return (<MenuItem key={option} onSelect={() => this.setState({profile: option})}>{option}</MenuItem>)
                                    })
                                }
                            </DropdownButton>
                        </ButtonToolbar>
                    </ListGroupItem>
                    <ListGroupItem className="bg-light">
                        <p className="text-info"><b>Choose your preferences</b></p>
                        {/*<p className="text-muted"><i>Assign a weight to each factor (between 0 to 1). The weights must add upto 1.</i></p>*/}
                        <div className="d-flex item">
                            <p className="factor">Criminal Incident Reports</p>
                            <SliderWithTooltip 
                                defaultValue = {this.state.defaultValue}
                                onChange={this.onCrimeChange}
                                tipFormatter={this.percentFormatter}
                                min={this.state.min}
                                max={this.state.max}
                                marks={marks}
                            />
                        </div>
                        <div className="d-flex item">
                            <p className="factor">Public transport (bus stops)</p>
                            <SliderWithTooltip 
                                defaultValue = {this.state.defaultValue}
                                onChange={this.onTransportChange}
                                tipFormatter={this.percentFormatter}
                                min={this.state.min}
                                max={this.state.max}
                                marks={marks}
                            />
                        </div>
                        <div className="d-flex item">
                            <p className="factor">Green Spaces</p>
                            <SliderWithTooltip 
                                defaultValue = {this.state.defaultValue}
                                onChange={this.onGreenSpacesChange}
                                tipFormatter={this.percentFormatter}
                                min={this.state.min}
                                max={this.state.max}
                                marks={marks}
                            />
                        </div>
                        {/*<form onSubmit={(evt) => this.handleSubmit(evt)}>
                            <div className="d-flex item">
                                <label className="desc">Criminal Incident Reports</label>
                                <input type="number" step="0.1" max='1' min='0' className="form-control param" id="criminal-incidents" placeholder="0.5" onInput= {(evt) => this.setState({incidents: evt.target.value})}/>
                            </div>
                            <div className="d-flex item">
                                <label className="desc">Public transport (bus stops)</label>
                                <input type="number" step="0.1" max='1' min='0' className="form-control param" id="public-transports" placeholder="0.4" 
                                onInput= {(evt) => this.setState({transport: evt.target.value})}/>/>
                            </div>
                            <div className="d-flex item">
                                <label className="desc">Green Spaces</label>
                                <input type="number" step="0.1" max='1' min='0' className="form-control param" id="green-spaces" placeholder="0.1" 
                                onInput= {(evt) => this.setState({trees: evt.target.value})}/>/>
                            </div>
                            <button id="submit" type="submit" value="Submit" min='0' className="btn btn-info">Submit</button>
                        </form>*/}
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }

    handleSubmit(evt) {
        evt.preventDefault();
        let cache = window.localStorage;
        cache.setItem("incidents", this.state.incidents);
        cache.setItem("transport", this.state.transport);
        cache.setItem("trees", this.state.trees);
    }
}

export default Sidebar;