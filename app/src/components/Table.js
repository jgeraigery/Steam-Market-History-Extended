import '../styles/Table.css';
import React from 'react';

function Table({ data }) {

    let head = null;
    let body = null;

    // Currently in loops for scalability while building.
    // This is messy and can be converted to a cleaner hardcoded approach when info is finalized
    if (data === null) {
        return (
            <p className='null-table'>
                No Data Loaded
            </p>
        )
    }
    else {
        // Build Head
        let fields = [
            '#',
            'Game',
            'Item',
            'Third Party',
            'Type',
            'Listed Date',
            'Action Date',
            'Price'
        ]
        head = [];
        for (let i = 0; i < fields.length; i++) {
            head.push(
                <th key={'tablehead' + i}>
                    <button className='head-entry'>
                        {fields[i]}
                    </button>
                </th>
            )
        }

        // Build Entries
        let entries = [];
        for (let i = 0; i < data['count']; i++) {
            let current_entry = [];
            let trading_card = false;

            // Convert entry dictionary into a list
            for (let j = 0; j < data['fieldCount']; j++) {
                if (data['fields'][j] ==='game') {
                    if (data['transaction_list'][i]['game'].includes('Trading Card')) {
                        trading_card = true;
                        current_entry.push(data['transaction_list'][i]['game'].replace('Trading Card', '').replace('Foil', ''));
                    } else {
                        current_entry.push(data['transaction_list'][i]['game']);
                    }
                } else if (data['fields'][j] === 'name') {
                    let extra = '';
                    if (trading_card && !(data['transaction_list'][i][data['fields'][j]].includes('Trading Card'))) {
                        extra = ' (Trading Card)';
                    }
                    let item_entry = 
                        <div className='combined-entry'>
                            <img className='item-img' src={data['transaction_list'][i]['item_img']}></img>
                            <label className='item-name'>{data['transaction_list'][i][data['fields'][j]] + extra}</label>
                        </div>;
                    current_entry.push(item_entry);
                    j++;
                } else if (data['fields'][j] === 'gain_or_loss' && data['transaction_list'][i]['third_party_name'] === 'Listing canceled') {
                    current_entry.push('Cancellation');
                } else if (data['fields'][j] === 'third_party_name') {
                    let third_party_entry = '';
                    if (data['transaction_list'][i][data['fields'][j]] !== 'Listing created' && data['transaction_list'][i][data['fields'][j]] !== 'Listing canceled') {
                        third_party_entry = 
                            <div className='combined-entry'>
                                <img className='third-party-img' src={data['transaction_list'][i]['third_party_img']}></img>
                                <label className='third-party-name'>{data['transaction_list'][i][data['fields'][j]]}</label>
                            </div>;
                    }
                    current_entry.push(third_party_entry);
                    j++;
                } else if (data['fields'][j] === 'listed_date' && data['transaction_list'][i][data['fields'][j]] === '') {
                        current_entry.push(data['transaction_list'][i][data['fields'][j + 1]]);
                        current_entry.push('');
                        j++;
                } else {
                    current_entry.push(data['transaction_list'][i][data['fields'][j]]);
                }
            };
            let bdpos = 0;
            entries.push(current_entry.map(entry =>
                <td key={data['transaction_list'][i]['id'] + '' + bdpos++}>
                    {entry}
                </td>
            )
            )
        };
        let bpos = 0;
        body = entries.map(entry =>
            <tr className='table-row' key={'row' + data['transaction_list'][bpos++]['id']}>
                {entry}
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <tr key='headrow'>
                    {head}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    );
};

export default Table;