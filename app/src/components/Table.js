import '../styles/Table.css';
import React from 'react';

function Table({ data }) {

    console.log('Table Render');

    let head = null;
    let body = null;

    if (data === null) {
        return (
            <p className='null-table'>
                No Data Loaded
            </p>
        )
    }
    else {
        // Build Head
        let fields = []
        for (let i = 0; i < data['fieldCount']; i++) {
            let res = data['fields'][i];
            res = res.replaceAll("_", " ");
            res = res.charAt(0).toUpperCase() + res.slice(1);
            if (res === 'Gain or loss') {
                res = 'Type';
            }
            fields.push(res);
        };
        let hpos = 0;
        head = fields.map(f =>
            <th key={'tablehead' + hpos++}>
                <button className='head-entry'>
                    {f}
                </button>
            </th>
        );

        // Build Entries
        console.log(data)
        let entries = [];
        for (let i = 0; i < data['count']; i++) {
            let current_entry = [];

            // Convert entry dictionary into a list
            for (let j = 0; j < data['fieldCount']; j++) {
                if (data['fields'][j] === 'third_party_img') {
                    current_entry.push(<img src={data['transaction_list'][i][data['fields'][j]]}></img>)
                } else {
                    current_entry.push(data['transaction_list'][i][data['fields'][j]]);
                }
            };
            let bdpos = 0;
            entries.push(current_entry.map(entry =>
                <td key={data['transaction_list'][i]['id'] + '' + bdpos++} className='body-entry'>
                    {entry}
                </td>
            )
            )
        };
        let bpos = 0;
        body = entries.map(entry =>
            <tr key={'row' + data['transaction_list'][bpos++]['id']}>
                {entry}
            </tr>
        );
    }

    return (
        <table className='table'>
            <thead className='table-header'>
                <tr key='headrow' className='table-header'>
                    {head}
                </tr>
            </thead>
            <tbody className='table-body'>
                {body}
            </tbody>
        </table>
    );
};

export default Table;