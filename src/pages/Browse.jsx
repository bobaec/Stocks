import React from "react";
import {
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';
class Browse extends React.Component {
	render() {
		return (			
			<div className = "mainContent">
				<div className = "wrapper">
					<center><h4>Browse Stocks</h4></center>
					<InputGroup className="browse_input">
                        <FormControl placeholder="ex)Google" type="text"/>
                        <InputGroup.Append>
                        <Button variant="outline-secondary" type="button">Browse</Button>
                        </InputGroup.Append>
                    </InputGroup>
				</div>
			</div>
		);
	}
} 

export default Browse;
