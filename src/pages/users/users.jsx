import React from "react";
import {
	Col,
	Container,
	Card,
	CardDeck,
	ListGroup,
	Row
} from 'react-bootstrap';
import stock_img from '../img/image.png'

class UsersPage extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h1>Users</h1></center>
					<Container className="users">
						<Row style={{marginTop: "10px"}}>
							<CardDeck>
								<Col>
								<Card>
									<Card.Img variant="top" src={stock_img} />
									<Card.Body>
										<Card.Title>{this.props.user.displayName}</Card.Title>
									</Card.Body>
								</Card>
								</Col>
								<Col>
								<Card>
									<Card.Img variant="top" src={stock_img} />
									<Card.Body>
										<Card.Title>{this.props.user.displayName}</Card.Title>
									</Card.Body>
								</Card>
								</Col>
								<Col>
								<Card>
									<Card.Img variant="top" src={stock_img} />
									<Card.Body>
										<Card.Title>{this.props.user.displayName}</Card.Title>
									</Card.Body>
								</Card>
								</Col>
							</CardDeck>
						</Row>

					</Container>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;