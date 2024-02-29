import Rows from "./Rows.jsx";
import {gql, useQuery} from "@apollo/client";
import {GET_Clients} from "../queries/clientQueries.js";

function Clients() {
    const {loading, error, data} = useQuery(GET_Clients);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;


    return (
        <table className="table table-striped">
            <thead>
            <br/>
            <tr>
                <th>index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.clients.map((client, index) => (
                <Rows data={client} key={index} index={index}/>
            ))}
            </tbody>
        </table>
    );
}

export default Clients;
