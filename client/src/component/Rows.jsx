import {useMutation} from "@apollo/client";
import {MdDelete} from "react-icons/md";


import {DELETE_CLIENT} from "../mutation/mutaion.js";
import {useEffect} from "react";
import {GET_Clients} from "../queries/clientQueries.js";

function Rows({data, index}) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: data.id},
        update(cache, {data: {deleteClient}}) {
            const {clients} = cache.readQuery({query: GET_Clients});
            cache.writeQuery({
                query: GET_Clients,
                data: {clients: clients.filter(client => client.id !== deleteClient.id)}
            })
        }
    });


    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                    <button className={"btn btn-danger"} onClick={deleteClient}><MdDelete/></button>
                </td>
            </tr>


        </>
    );
}


export default Rows;
