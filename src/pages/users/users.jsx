import React from "react";

class UsersPage extends React.Component {
	render() {
		return (
		    <div className = "mainContent">
				<div className = "wrapper">
					<center><h1>Users</h1></center>
					<div className="users">
						<br/>
						<table className="users_table">
							<thead>
								<th>Name</th>
								<th># favourite stocks</th>
								<th>Last Logged In</th>
							</thead>
							<tr>
								<td>Sana</td>
								<td>2</td>
								<td>Mar 1, 2020</td>
							</tr>
							<tr>
								<td>Naeune</td>
								<td>2</td>
								<td>Mar 1, 2020</td>
							</tr>
							<tr>
								<td>Bobby</td>
								<td>2</td>
								<td>Mar 1, 2020</td>
							</tr>
							<tr>
								<td>JYP</td>
								<td>2</td>
								<td>Mar 1, 2020</td>
							</tr>
							<tr>
								<td>Parasite</td>
								<td>2</td>
								<td>Mar 1, 2020</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
  
export default UsersPage;