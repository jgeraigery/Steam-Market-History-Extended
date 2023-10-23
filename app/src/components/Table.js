import '../styles/Table.css';
import React from 'react';

function Table({ data }) {

    let head = null;
    let body = null;
    
    if (data === null) {
        return (
            <p>
                No Data Loaded
            </p>
        )
    } 
    else 
    {
        // Build Head
        let fields = []
        for (let i = 0; i < data['fieldCount']; i++) {
            let res = data['fields'][i];
            res = res.replaceAll("_", " ");
            res = res.charAt(0).toUpperCase() + res.slice(1);
            fields.push(res);
        };
        head = fields.map( f =>
            <th>
                {f}
            </th>
        );

        // Build Entries
        console.log(data)
        let entries = [];
        for (let i = 0; i < data['count']; i++) {
            let current_entry = [];

            // Convert entry dictionary into a list
            for (let j = 0; j < data['fieldCount']; j++) {
                current_entry.push(data['item' + i][data['fields'][j]]);
            };

            entries.push(current_entry.map( entry =>
                    <td>
                        { entry }
                    </td>
                )
            )
        };
        body = entries.map( entry => 
            <tr>
                { entry }
            </tr>
        );
    }

    return (
        <table>
            <thead>
                { head }
            </thead>
            <tbody>
                { body }
            </tbody>
        </table>
    );
};

export default Table;